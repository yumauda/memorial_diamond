# Xserver Test Deploy Template

静的HTML / PHPサイトをXserverのテスト環境へアップロードするための共通テンプレートです。

## できること

- `npm run deploy:test` でXserverへアップロード
- Xserver上にテスト用ディレクトリを自動作成
- `rsync --delete` でローカル成果物を同期
- `.htaccess` / `.htpasswd` を自動設置
- Basic認証 `test / 0000` を自動付与
- `public_html` 直下など危険なアップロード先を停止

## 導入するファイル

移植先プロジェクトへ以下をコピーします。

```txt
scripts/deploy-test.sh
scripts/copy-static-assets.js
.env.example
.cursor/rules/xserver-deploy.mdc
```

`package.json` の `scripts` へ追加します。

```json
{
  "deploy:test": "bash scripts/deploy-test.sh"
}
```

`.gitignore` に追加します。

```gitignore
.env
```

## .env

`.env.example` をコピーして `.env` を作成します。

```env
XSERVER_HOST=svxxxx.xserver.jp
XSERVER_USER=xxxxx
XSERVER_PORT=10022
SSH_KEY_PATH=~/.ssh/id_rsa

LOCAL_BUILD_DIR=dist
REMOTE_TEST_PATH=/home/xxxxx/example.com/public_html/project-name
TEST_URL=https://example.com/project-name/
```

`REMOTE_TEST_PATH` は必ず `public_html` 配下のサブディレクトリにしてください。`public_html` 直下にはアップロードできない設計です。

## Viteでサブディレクトリ配信する場合

`/project-name/` のようなサブディレクトリへアップする場合、`vite.config.js` に以下を入れます。

```js
export default defineConfig({
  base: './',
});
```

静的に参照している `js/` や `images/common/` をそのまま `dist` に含めたい場合は、`build` にコピー処理を追加します。

```json
{
  "build": "vite build && node scripts/copy-static-assets.js"
}
```

## 使い方

```bash
npm run build
npm run deploy:test
```

完了後に以下が表示されます。

```txt
URL: https://example.com/project-name/
Basic Auth ID: test
Basic Auth PASS: 0000
```

## Cursorでの依頼例

```txt
テストアップして
```

Cursorルールが入っていれば、既存構成を確認し、必要に応じてビルドしてから `npm run deploy:test` を実行します。
