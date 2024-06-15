export APP_API_URL="http://20.224.153.213:5001"
export APP_WS_URL="ws://20.224.153.213:5001"
HOST_NAME=keshav@20.56.148.2

# git checkout dev && git pull origin dev

npm run build

ssh ${HOST_NAME} -i ~/.ssh/tutor-app_key.pem  "rm -r /var/www/html/* && echo \"Exsiting deployment deleted successfully!\""

echo $"\nDeploying..."

scp -i ~/.ssh/tutor-app_key.pem -r dist/. ${HOST_NAME}:/var/www/html/ && echo $"\nDeployed successfully!"

