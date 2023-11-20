<p align="center">
  <img src="img/logo.jpg" alt="Logo" height="180" />
</p>

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
