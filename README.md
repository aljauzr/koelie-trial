<h1 align="center">Koelie Web Service</h1>

Lorem ipsum dolor sit amet.

> Base URL of this service is: http://localhost:8080/

Services available:

- Authentications
  <pre>POST /register</pre>
  <pre>POST /login</pre>
  <pre>POST /logout</pre>

- Users
  <pre>GET  /users</pre>
  <pre>GET  /users/{user_id}</pre>

- Kuli
  <pre>GET  /kuli</pre>
  <pre>GET  /kuli/{kuli_id}</pre>

- User Suka
  <pre>GET  /users/{user_id}/disukai</pre>
  <pre>POST /users/{user_id}/disukai</pre>
  <pre>DEL  /users/{user_id}/disukai/{kuli_id}</pre>

## Dependencies

* [Express](https://www.npmjs.com/package/express)
* [JWT](https://www.npmjs.com/package/@hapi/jwt)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [CORS](https://www.npmjs.com/package/cors)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
