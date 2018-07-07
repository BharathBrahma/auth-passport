# Authentication using Node JS, JWT and Passport

The API uses Mongoose DB for storing the user information, uses Passport JWT strategy for securing the routes

### Version
1.0.0

## Usage

```bash
npm install
```

```bash
npm start
```

##Endpoints
```bash
POST /users/register
```

```bash
POST /users/authenticate   // Gives back a token
```

```bash
GET /users/profile         // Needs json web token to authorize
```
