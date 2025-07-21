# Как запустить проект?

<span style="color: red;">!!! ВНИМЕНИЕ Скорее всего проект не будет рабтотать из-за того, что файлы .env не попадают в гит</span>


Порты 3000 для сервера, 5000 для клинета. На других не пробовал

## DEV сборка

после npm i зайти в .env файл в пакете frontend и поменять url 

URL_LOCAL = http://(ВАШ ХОСТ В ipconfig IPV4):3000

URL_LOCAL_WS = ws://(ВАШ ХОСТ В ipconfig IPV4):3000

пример:

URL_LOCAL = http://192.168.1.125:3000

URL_LOCAL_WS = ws://192.168.1.125:3000

чтобы запустить

npm run dev:back - дев бэкенда
npm run dev:front - дев фронта

## PROD сборка

Dockerfile.back - ничего не менять

Dockerfile.front - ничего не менять

nginx.conf - поменять адреса у прокси. На примере с .env в DEV сборке


## NGROK сборка

пробросить 5000 порт

ngrok http 5000

Dockerfile.back - поменять ENV PROTOCOL=https

Dockerfile.front - поменять ENV PROTOCOL=https

ENV HOST=(ВАШ ХОСТ В ipconfig IPV4):5000

