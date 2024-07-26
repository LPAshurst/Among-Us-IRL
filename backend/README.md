To start an instance: `docker compose -f docker-compose-mysql-only.yml up --build`

To enter the instance: `docker exec -it backend-db-1 bash`

To access the db once in: `mysql -uroot -p`