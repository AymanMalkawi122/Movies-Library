# Movies-Library - V1.0

**Author Name**: Ayman Malkawi

## WRRC
![Alt text](https://davisgitonga.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.aa762b2d.png&w=3840&q=75)

## Overview
server-side for a movie app
## Getting Started
after you clone this repo go to your terminal of choice and Install the required packages(run these commands):
1. sudo apt update
2. sudo apt install nodejs npm



then go inside the cloned directory and run:
1. npm init -y
2. npm install express cors
3. npm install dotenv
4. npm install axios


Then go inside VS code editor and run this command in the terminal:


npm server.js
## Project Features
implementation of the GET request for 
1. home page
2. favorite page 
3. trending page 
4. search page(must provide name movie in the query) 
5. upcoming page 
6. discover page 

The get requests are forwarded from the server to "themovieDB" API
with error handling for 500 and 404 status codes.

![Alt text](./assets/images/Screenshot%202023-03-21%20170838.png)