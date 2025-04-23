@echo off
echo Iniciando backend...
start cmd /k "cd backend && npm run dev"

timeout /t 2 >nul

echo Iniciando frontend...
start cmd /k "cd frontend && npm run dev"
