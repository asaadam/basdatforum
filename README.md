# Forum Basdat


This is Repository for basdat forum,
  - it has forntend and backend folder 
  - each folder has their own dependency
  - By default , the frontend will hosted at 3000 and backend at 5000.

# Technology,Dependecy And Database

All of this project is using Node , and Javascript.
##### Dependency
Front end:
  - for front end , this project using react-create-app v2.0 , for more information what's dependency installed please visit this [link](https://github.com/facebook/create-react-app)
  

Backend:

| Plugin | README |
| ------ | ------ |
| Volleyball | https://www.npmjs.com/package/volleyball |
| Cors | https://www.npmjs.com/package/cors |
| BodyParser | https://www.npmjs.com/package/simple-bodyparser |
| Express | https://www.npmjs.com/package/express |
| Monk | https://www.npmjs.com/package/monk |

##### Database
For database this project using no sql database ,Mongo DB . And deployed at Mlab.
Mlab is a server that provide a free MongoDB server .

  
### Installation


Install the dependencies and devDependencies and start the server.
you can also using yarn for installing dependencies and start server.

```sh
$ cd backend
$ npm install 
$ npm start dev
```

For production Frontend

```sh
$ cd frontend
$ npm install
$ npm start
```


> On this project , everything is gonna be simple
>Any Contribution for make this better , are really welcome.

### Todos

## Authentication
* [x] Create Server
* [x] Add auth router
* [x] Create user with POST /auth/signup
	* [x] validate required fields
	* [x] Check if username is unique
	* [x] hash password with bcrypt
	* [x] insert into db
* [x] Create Landing Page
	* [x] Link to Sign Up Page
* [x] Create Sign Up Page
	* [x] Form with: username and password
	* [x] When form is submitted
		* [x] Validate username
			* [x] Display errors
		* [x] Validate password
			* [x] Display errors
		* [x] POST request to server
			* [x] Display errors
			* [x] If succesful sign up
				* [x] Redirect to login page
* [ ] Login user with POST /auth/login
	* [ ] validate the user
	* [ ] check if username in db
		* [ ] compare password with hashed password in db
		* [ ] Create and sign a JWT
      * [ ] Respond with JWT
* [x] Create Login Page
	* [ ] Form with: username and password
	* [ ] When form is submitted
		* [ ] Validate username
			*  [] Display errors
		* [ ] Validate password
			* [ ] Display errors
		* [ ] POST request to server /auth/login
			* [ ] Display errors
			* [ ] If succesful login
				* [ ] Store the token in localStorage
				* [ ] Redirect to the "dashboard"
* [ ] If a logged in user visits the signup or login page, redirect them to the dashboard
* [ ] If a non logged in user visits the dashboard, redirect to the login page
* [ ] After sign up, immediately login
* [ ] Show username on dashboard
* [ ] On homepage, show go to dashboard button instead of signup/login button
* [ ] If logged in:
	* [ ] Show logout button in header
	* [ ] Show user icon and username in header

### Authorization:
* [ ] Visitors can only see the homepage
	* [ ] checkTokenSetUser middleware
		* [ ] get token from Authorization header
			* [ ] if defined ---
				* [ ] Verify the token with the token secret
				* [ ] Set req.user to be the decoded verified payload
			* [ ] else - move along
	* [ ] isLoggedIn middleware
		* [ ] if req.user is set - move along
		* [ ] else - send an unauthorized error message
	* [ ] redirect to login form
* [ ] Create Thread form on client
	* [ ] Title
	* [ ] Description
* [ ] POST /api/v1/forum
	* [ ] Must be logged in
	* [ ] Logged in Users Can Create Thread
		* [ ] Title
		* [ ] Description -- markdown
		* [ ] Set user_id on server with logged in users id
* [ ] GET /api/v1/forum
	* [ ] Must be logged in
	* [ ] Logged in Users Can request all their thread 
		* [ ] Get all notes in DB with logged in users user_id
* [ ] List all notes on client
	* [ ] Render description with Markdown


### Todo will updated if needed 


