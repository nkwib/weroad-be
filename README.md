## Start mysql container
data: 
port: 3306
username: 'weroad_user',
password: 'weroad',
database: 'weroad',
```bash
docker run -d \
  --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=weroad \
  -e MYSQL_USER=weroad_user \
  -e MYSQL_PASSWORD=weroad \
  -p 3306:3306 \
  mysql:latest
```


## Connect to mysql db
```bash
docker exec -it mysql-container bash
mysql -u weroad_user -p
```