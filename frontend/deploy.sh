# note : Run install azure cli & run az login before running this scrpit
# Make sure you have configured the web app in azure portal

export APP_API_URL="http://20.224.153.213:8080" # replace this
export RESOURCE_GROUP_NAME="tutor-app"
export WEB_APP_NAME="tutor-app4"

npm run build

cd dist

zip -r ../dist.zip .

cd ..

echo "Deploying ..." 

az webapp deploy --resource-group $RESOURCE_GROUP_NAME --name $WEB_APP_NAME --src-path "dist.zip"
