#!/usr/bin/env bash
set -euo pipefail

BASIC_AUTH_USER="test"
BASIC_AUTH_PASS="0000"
ENV_FILE=".env"

err() {
  echo "Error: $*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || err "'$1' command is required."
}

require_env() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    err "$name is required in $ENV_FILE."
  fi
}

shell_quote() {
  local value="$1"
  printf "'%s'" "${value//\'/\'\\\'\'}"
}

validate_remote_test_path() {
  local path="$1"

  [[ "$path" = /* ]] || err "REMOTE_TEST_PATH must be an absolute path."
  [[ "$path" != *".."* ]] || err "REMOTE_TEST_PATH must not contain '..'."
  [[ "$path" =~ ^[A-Za-z0-9._/@%+=:,-]+$ ]] || err "REMOTE_TEST_PATH contains unsupported characters."
  [[ "$path" != "/" ]] || err "REMOTE_TEST_PATH points to the filesystem root."
  [[ ! "$path" =~ ^/home/[^/]+/?$ ]] || err "REMOTE_TEST_PATH is too broad."
  [[ "$path" != */public_html ]] || err "REMOTE_TEST_PATH must not be public_html root."
  [[ "$path" != */public_html/ ]] || err "REMOTE_TEST_PATH must not be public_html root."
  [[ "$path" =~ /public_html/[^/]+ ]] || err "REMOTE_TEST_PATH must be a subdirectory under public_html."
}

cd "$(dirname "$0")/.."

[[ -f "$ENV_FILE" ]] || err "$ENV_FILE was not found. Copy .env.example to .env and fill it in."

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

require_env XSERVER_HOST
require_env XSERVER_USER
require_env XSERVER_PORT
require_env SSH_KEY_PATH
require_env LOCAL_BUILD_DIR
require_env REMOTE_TEST_PATH
require_env TEST_URL

validate_remote_test_path "$REMOTE_TEST_PATH"

[[ -d "$LOCAL_BUILD_DIR" ]] || err "LOCAL_BUILD_DIR '$LOCAL_BUILD_DIR' does not exist or is not a directory."
[[ -f "$SSH_KEY_PATH" ]] || err "SSH_KEY_PATH '$SSH_KEY_PATH' does not exist."
[[ "$XSERVER_PORT" =~ ^[0-9]+$ ]] || err "XSERVER_PORT must be a number."
[[ "$TEST_URL" =~ ^https?:// ]] || err "TEST_URL must start with http:// or https://."

require_command ssh
require_command rsync
require_command openssl

REMOTE="${XSERVER_USER}@${XSERVER_HOST}"
SSH_CMD=(ssh -p "$XSERVER_PORT" -i "$SSH_KEY_PATH" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new)
RSYNC_SSH="ssh -p $(shell_quote "$XSERVER_PORT") -i $(shell_quote "$SSH_KEY_PATH") -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

HTPASSWD_FILE="$TMP_DIR/.htpasswd"
HTACCESS_FILE="$TMP_DIR/.htaccess"

HASH="$(openssl passwd -apr1 "$BASIC_AUTH_PASS")"
printf '%s:%s\n' "$BASIC_AUTH_USER" "$HASH" > "$HTPASSWD_FILE"

cat > "$HTACCESS_FILE" <<EOF
AuthType Basic
AuthName "Test Site"
AuthUserFile ${REMOTE_TEST_PATH}/.htpasswd
Require valid-user
EOF

if [[ -f "${LOCAL_BUILD_DIR%/}/.htaccess" ]]; then
  {
    echo
    echo "# Project .htaccess"
    cat "${LOCAL_BUILD_DIR%/}/.htaccess"
  } >> "$HTACCESS_FILE"
fi

echo "Creating remote test directory..."
REMOTE_PATH_QUOTED="$(shell_quote "$REMOTE_TEST_PATH")"
"${SSH_CMD[@]}" "$REMOTE" "mkdir -p $REMOTE_PATH_QUOTED"

echo "Installing Basic authentication files..."
rsync -az \
  -e "$RSYNC_SSH" \
  "$HTACCESS_FILE" "$HTPASSWD_FILE" \
  "${REMOTE}:${REMOTE_TEST_PATH%/}/"

echo "Uploading files to Xserver test directory..."
rsync -az --delete \
  --exclude ".env" \
  --exclude ".git/" \
  --exclude ".htaccess" \
  --exclude ".htpasswd" \
  --exclude "node_modules/" \
  --exclude ".DS_Store" \
  -e "$RSYNC_SSH" \
  "${LOCAL_BUILD_DIR%/}/" \
  "${REMOTE}:${REMOTE_TEST_PATH%/}/"

echo "Installing Basic authentication files..."
rsync -az \
  -e "$RSYNC_SSH" \
  "$HTACCESS_FILE" "$HTPASSWD_FILE" \
  "${REMOTE}:${REMOTE_TEST_PATH%/}/"

echo
echo "Deploy completed."
echo "URL: ${TEST_URL}"
echo "Basic Auth ID: ${BASIC_AUTH_USER}"
echo "Basic Auth PASS: ${BASIC_AUTH_PASS}"
