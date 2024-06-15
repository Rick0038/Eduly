export APP_API_URL="http://20.224.153.213:5001"
export APP_WS_URL = 'ws://20.224.153.213:5001'

git checkout dev && git pull origin dev

npm run build

scp -i ~/.ssh/tutor-app_key.pem -r dist/. keshav@20.56.148.2:/var/www/html/

