To change the database credentials:

In the db.env file which is in this directory:

F:\IGS\filings-app\filings-backend\app\src\db.env

Change the value of the variables with your database credentials.

For example:

If your database username is 'postgres', 
password is '12345',
host is 'localhost',
database name is 'fdb'.

Then your db.env file should look like this:

DB_USER = postgres
DB_PASS = 12345
DB_HOST = localhost
DB_NAME = fdb
