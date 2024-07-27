- To start an instance: `docker compose up` 

        Use `-d` flag to run in background

        On windows, make sure that docker desktop is running
- To enter the instance: `docker exec -it backend-db-1 bash`

- To access the db once in: `mysql -uroot -p`

- To remove existing db structure: `docker volume rm backend_db` or `docker compose down -v`