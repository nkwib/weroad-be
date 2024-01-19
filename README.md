
# Setup
### Prerequisites
- node
- npm
- docker with the db container running (see below)

### Install dependencies
run the following command to install the dependencies
```bash
npm install
```
copy the .env.example file and rename it to .env
```bash
cp .env.example .env
```
# Start the server
```bash
npm run start:dev
```


# How to start mysql container
if already exist
```bash
docker start mysql-container
```
else create it
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
----
# Testing db startup
if already exist
```bash
docker start weroad-test-container
```
else create it
```bash
docker run -d \
  --name weroad-test-container \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=weroad \
  -e MYSQL_USER=weroad_user \
  -e MYSQL_PASSWORD=weroad \
  -p 3300:3306 \
  mysql:latest
```
----


## Connect to mysql db
```bash
docker exec -it mysql-container bash
mysql -u weroad_user -p
```
## upload the seed.sql (once the db is synced after the first run)
```bash
cat ./seed.sql | docker exec -i mysql-container mysql -uweroad_user -pweroad weroad
```

## TEST
#### pre-requisite
- launch the test db
```bash
npm run test:e2e
```
These are just a small set of tests, ideally we should have a test for each query and mutation, especially to test some edge cases. The setup was mainly to show how to handle the test environment using a different db and a different port. 
During the tests would be important to avoid flaky tests and have a clean db before each test.
Ideally we should run them in parallel.