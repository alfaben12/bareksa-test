# bareksa-test

run docker-compose:
- docker-compose -f docker-compose.yml up

Run redis
- docker container exec -it redis /bin/sh
- redis-cli -h localhost

Run postgres
- docker container exec -it postgres /bin/sh
- psql -U postgres
