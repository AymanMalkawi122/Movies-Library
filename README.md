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
5. npm install supervisor
6. npm install pg


Then go inside VS code editor and run this command in the terminal:


node server.js  **OR**  supervisor server.js (for quick server reload whenever the code is modified)
## Project Features
### implementation of the GET request for 
1. home page
2. favorite page 
3. trending page **(API request)**
4. search page **(API request)** (must provide the name of your movie in the server query)
![Alt text](./assets/images/how%20to%20use/search.png)
5. upcoming page **(API request)**
6. discover page **(API request)**

**The get requests are forwarded from the server to the "themovieDB" API**

7. getMoives route **(Database request)**
8. getMovie/:id route **(Database request)**

You must specifiy the id of the tuple you want to be selected in the URL parameterrs

![Alt text](./assets/images/how%20to%20use/getID.png)

### implementation of the POST request for
1. addMovie route **(Database request)** 

You must provide query values except "id" in the server request body as JSON format and query atributes should have the same name in the schema.sql file

![Alt text](./assets/images/how%20to%20use/add.png)

2. DELETE/:id route **(Database request)**

You must specifiy the id of the tuple you want to be dedlted in the URL parameterrs

![Alt text](./assets/images/how%20to%20use/delete.png)

3. UPDATE/:id route **(Database request)**

You must specifiy the id of the tuple you want to be updated in the URL parameterrs, and type your comment in the body of the request

![Alt text](./assets/images/how%20to%20use/update.png)

**New moive data entrys are stored in a local relational database using postgress DBMS, all entries follow a schema defined in the schema.sql file.**
## Error handeling 
This solution provides error handeling for all requests (codes 500 and 404)
## API request response cycle
![Alt text](./assets/images/RRC/Screenshot%202023-03-21%20170838.png)

## Database request response cycle
![Alt text](./assets/images/RRC/Screenshot%202023-03-23%20142746.png)
