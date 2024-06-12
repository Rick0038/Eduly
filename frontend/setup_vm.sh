sudo apt update

sudo apt install nginx

sudo cat ./nginx.conf >> /etc/nginx/sites-enabled/default

sudo service nginx restart
