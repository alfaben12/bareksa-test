# bareksa-test

run docker-compose:
- docker-compose -f docker-compose.yml up

Access redis
- docker container exec -it redis /bin/sh
- redis-cli -h localhost

Access postgres
- docker container exec -it database /bin/sh

Run unit test:
- npm run test

Run app Production mode:
- docker-compose -f docker-compose.yml up
- npm run migrate:dev
- open new terminal
- npm run build
- npm run start:prod

Run app Development mode:
- docker-compose -f docker-compose.yml up
- npm run migrate:dev
- npx prisma db seed (if needed. ref on prisma/README.md)
- open new terminal
- npm run start:dev
