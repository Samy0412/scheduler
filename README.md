# Interview Scheduler(client side)

React tested application that allows users to book and cancel interviews. 

You can view and use the app directly here: https://interview-scheduler-sg.netlify.app

if you want to use it on your local computer, additionally to this repository, you also also need to fork and clone the server-side for this application to work : 
<a href="https://github.com/Samy0412/scheduler-api">scheduler-api</a>

## Setup

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. create the `.env.development` file and insert in it:
```
PORT=8000
CHOKIDAR_USEPOLLING=false
```
4. Create the `.env` file and insert in it:
```
SKIP_PREFLIGHT_CHECK=true
```
5. Start the web server using the `npm start` command. 
6. Go to http://localhost:8000/ in your browser.

## Final product

Main page of the app: 

!["Appointments"](https://github.com/Samy0412/scheduler/blob/master/public/images/Appointments.png?raw=true)

This is the form to create a new appointment:

!["Form"](https://github.com/Samy0412/scheduler/blob/master/public/images/Form.png?raw=true)

The user is asked to confirm his choice:

!["Confirm"](https://github.com/Samy0412/scheduler/blob/master/public/images/Confirm.png?raw=true)

Friendly error message can be displayed:

!["Error"](https://github.com/Samy0412/scheduler/blob/master/public/images/Error.png?raw=true)
