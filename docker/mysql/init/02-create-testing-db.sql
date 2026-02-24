CREATE DATABASE IF NOT EXISTS testing_db_employees;
GRANT ALL PRIVILEGES ON testing_db_employees.* TO 'laravel'@'%';
FLUSH PRIVILEGES;