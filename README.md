# bareksa-test

run docker-compose:
- docker-compose -f docker-compose.yml up

Access redis
- docker container exec -it redis /bin/sh
- redis-cli -h localhost

Access postgres
- docker container exec -it database /bin/sh

Run app Production mode:
- docker-compose -f docker-compose.yml up
- npm run build
- npm run start:prod
