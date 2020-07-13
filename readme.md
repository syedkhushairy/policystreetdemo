# Policy Street Demo

A simple user registration and update of his profile

## Installation

```bash
npm install
```

## config

change any values that you want in config/default.json

```
{
  "jwtSecret": "policysecret",
  "dev": {
    "HOST": "localhost",
    "USER": "root",
    "PASSWORD": "",
    "DB": "policystreet"
  }
}
```

## Init Database & Table

Create database:

```
npm run init-database
```

Create table:

```
npm run init-table
```

## Executing the program

```
npm run dev
```

or

```
nodemon server.js
```

or

```
node server.js
```

## Routes

```
##register
post: localhost:3500/api/v1/users
Headers
{
    Content-Type:application/json
}
Body : raw
{
    "login": "testing3",
    "password": "123456",
    "user_type": "admin"
}

##login
post: localhost:3500/api/v1/auth
Body : raw
{
    "login": "testing4",
    "password": "123456"
}

##get Profile
get: localhost:3500/api/v1/profile/
Headers
{
    Content-Type:application/json
    x-auth-token:'token that receive while logging in'
}

##create profile
post: localhost:3500/api/v1/profile/
Headers
{
    Content-Type:application/json
    x-auth-token:'token that receive while logging in'
}
Body : raw
{
    "first_name": "testing4",
    "last_name": "testing4",
    "email": "testing4@test.com"
}

##update profile
put: localhost:3500/api/v1/profile/
Headers
{
    Content-Type:application/json
    x-auth-token:'token that receive while logging in'
}
Body : raw
{
    "id":24,
    "first_name": "testing4",
    "last_name": "testing4",
    "email": "testing4@test.com"
}
```

Postman: https://www.getpostman.com/collections/adfba22664a581adfd15

### Sequelize commands

Generally,

```
$ npx sequelize db:migrate        # Run pending migrations.
$ npx sequelize db:migrate:undo   # Revert the last migration run.
$ npx sequelize help              # Display this help text.
$ npx sequelize init              # Initializes the project.
$ npx sequelize migration:create  # Generates a new migration file.
$ npx sequelize version           # Prints the version number.
```

*Don't use `npx` if installed globally (`npm i -g sequelize`).*

RTFM: https://sequelize.org/master/index.html

## Thoughts

could improve more and try to implement sequelize if got the time and use swagger for easy readable api.

## Future

- [ ] Swagger
- [ ] Sequelize
- [ ] More code readability
- [ ] Might change express-validator to yup
