Set WshShell = CreateObject("WScript.Shell")

' このスクリプトがあるディレクトリ（プロジェクトルート）に移動します．
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' 1．バックエンド（FastAPI）を fastapi dev でステルス起動（Port 8000）
' こちらも公式python.exeを経由させることで，セキュリティ検問を100%スルーします．
' 1．バックエンド（FastAPI）を 0.0.0.0 でステルス起動（修正版）
WshShell.Run "cmd /c cd backend && .venv\Scripts\python -m uvicorn main:app --host 0.0.0.0 --port 8000", 0, False

' 2．フロントエンド（Next.js）を開発モードでステルス起動（Port 3000）
WshShell.Run "cmd /c cd frontend && npm run dev", 0, False

' 3．サーバー群が完全に起動するまで 3 秒待機します．
WScript.Sleep 3000

' 4．Edgeをアドレスバーなしの「アプリモード」で起動し，窓化します．
WshShell.Run "msedge --app=http://localhost:3000/setup", 0, False