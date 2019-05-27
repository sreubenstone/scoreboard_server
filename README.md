# Getting Started with the Scoreboard

a) Clone repo
b) create postgress database
c) create .env file:

eg...

```
PGCONNECTSTRING='postgres://localhost/scoreboard'
ORIGIN= http://localhost:3000
PORT=4000
```

d) run ```npm i```
e) run ```knex migrate:latest```
f) ```npm run server``` to start server