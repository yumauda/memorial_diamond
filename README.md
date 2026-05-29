# 【DartSass】タンクGulp環境（スマホファースト）

## 環境
- Gulpが使える環境が前提（4系）
- Nodeはバージョン14以降

## 使い方
- ダウンロードしたフォルダを開く
- ターミナルを開き、 npm i とコマンドを入力
- node_modulesとpackage-lock.jsonが生成されるのを確認する
- 開発時は `npm run dev` を実行

## 仕様
- sassの記述はsrcフォルダの中で行う
- 画像は `src/images/common/` などに格納する（自動で圧縮されます）
- 圧縮された画像は第一階層の `images/`（`js/` や `scripts/` と同階層）に出力されます
- すでに出力済みで更新されていない画像は、再圧縮しません（差分だけ処理します）
- jsに関する記述は第一階層のjsフォルダの中で行ってください。特に圧縮等は行っていません。

## 備考
- スマホファーストが前提の仕様です。
- rem記述を前提としています。
- ルートフォントをvwで設定していることからPCサイズのレイアウトをタブレットで表示させることが出来ます（remで書いた場合のみ）。

## Xserver テストアップ

静的HTML / PHPサイトをXserverのテスト環境へアップロードする場合は、以下を使用します。

1. `.env.example` をコピーして `.env` を作成する
2. `.env` にXserverの接続情報、アップロード元、テストアップ先を設定する
3. 必要に応じて `npm run build` で `dist` を生成する
4. `npm run deploy:test` を実行する

`.env` の `LOCAL_BUILD_DIR` にはアップロードするローカルディレクトリを指定します。このプロジェクトのViteビルド結果をアップロードする場合は `dist` を指定してください。

```env
LOCAL_BUILD_DIR=dist
REMOTE_TEST_PATH=/home/xxxxx/example.com/public_html/project-name
TEST_URL=https://example.com/project-name/
```

`REMOTE_TEST_PATH` は必ず `public_html` 配下のサブディレクトリにしてください。`public_html` 直下など本番相当のパスはスクリプト側で停止します。

アップロード後、テストURLにはBasic認証が設定されます。

```txt
ID: test
PASS: 0000
```
# tankenvironment
# tank_viteEnvironment
# hako_scan
# tank_viteEnvironment
# memorial_diamond
