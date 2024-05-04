# Server Instance

You can connect via SSH:
```bash
chmod 400 <path-to-private-key>
ssh -i <path-to-private-key> svc-tutor-prod@20.82.160.2
```

# Database Instance

```
hostname=tutor-app.mysql.database.azure.com
username=tutordb
password=<password>
```
To connect with MySQL workbench client, follow the steps below.
1. Click the + symbol in the MySQL Connections tab to add a new connection.
2. Enter a name for the connection in the Connection name field.
3. Select Standard (TCP/IP) as the Connection Type.
4. Enter tutor-app.mysql.database.azure.com in hostname field.
5. Enter tutordb as username and then enter your Password.
6. Click Test Connection to test the connection.
7. If the connection is successful, click OK to save the connection.
