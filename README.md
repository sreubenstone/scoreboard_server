# Getting Started with the Scoreboard

1. Clone repo
2. Create postgress database
3. Create .env file:

eg...

```
PGCONNECTSTRING='postgres://localhost/scoreboard'
ORIGIN= http://localhost:3000
PORT=4000
```

4.  run ```npm i```
5.  run ```knex migrate:latest```
6. ```npm run server``` to start server