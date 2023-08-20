# HyperionDev Web Development Capstone Project - My Travel Diaries

## Description

This final capstone project is to design and create a full-stack web application of our choice as long as it is built using Express, React, and MongoDB (the MERN stack) that creates, reads, updates, and deletes (CRUD) information from MongoDB. As my final project I have created a travel blog website where users can pin a marker or enter a location and a pop up will appear where they can enter a travel diary entry. The entries will then display on the map as markers or on a list where they can see/edit or delete their own entries.

The project has been tested with a snapshot test and unit tests for the front and back-end.

The sources files can be found on github here: https://github.com/catbusofthecanals/my-travel-diary.

## Requirements

1. It is built using Express, React, and MongoDB (the MERN stack).
2. It creates, reads, updates, and deletes (CRUD) information from MongoDB.
3. It has a custom server built using Express.
4. It authenticates users using JWT.
5. The front-end is built using React. You can use a React framework (e.g. Create React App or Next.js) of your choice.
6. The application allows for normal end-user access and admin access. An administrator should be able to monitor and make changes to users’ behaviour.

## Installation

To run this project:

1. Download this directory, "my-travel-diary", to your local machine
2. Navigate to this directory from the command line interface. E.g. cd c:/my-travel-diary
3. To start the backend server application, navigate to middleware-app, install any dependencies by typing "npm install" and start by typing "npm start"
4. Now open a new terminal shell and navigate to the "/front-end" directory
5. Again nstall any dependencies by typing "npm install" and then type 'npm start' to start the front-end application
6. Open [http://localhost:3000](http://localhost:3000) to view in your browser

### MongoDB and Mapbox Tokens

For this web application you will need to also create dotenv files containing a Mongo DB URL and a Mapbox access token.

To create a MongoDB URL:

Create a mongodb account at https://www.mongodb.com/ and then create a free shared cluster. Select Connect -> Connect your application and then the connection string into the application. Then create a .env file in the middleware-app directory with DB_URL= "paste the mongodb connection string"

To setup Mapbox and Get Access Token:

Create an account with mapbox and login. Copy default public token and paste it into a .env file in the front-end root folder with REACT_APP_MAPBOX_ACCESS_TOKEN = "paste the default token"

Tutorials on react-mapbox-gl can be found below:
https://visgl.github.io/react-map-gl/docs/get-started/get-started

## Usage Instructions

### Placing a marker

To place a pin on the map, double click on the location you would like to write your entry about.

To move the map to your location, click and drag to move the current viewstate. You can also zoom in and out to pinpoint your location.

Once you've double clicked a pop up will appear asking you to input a title and a diary entry. Fill in these and click the Add a Diary button to submit your diary entry.

Once submitted, a pin should appear on the map where you entered your entry.

### Viewing an entry

To view a diary entry, click on any marker on the map and a pop up will appear. The pop up will display the title, diary entry and the username of the user that submitted it.

To close, click the x button in the top right of the pop up or click elsewhere on the map

Red markers indicate ones that you submitted yourself whereas blue markers indicate an entry was written by another user

### Adding an entry via entering a location

Open the sidebar, by selecting the burger menu icon in the top left and select "Add a Travel Diary".

Here there is an input which autofills suggested locations based off the users input location. To choose the relevant location, select the entry which matches the location you want to enter a diary about.

There is also a map on this page which only displays your own markers. To add a location via the map, see instructions above.

Once a location has been selected either via the input field or the map, a pop up will appear inviting user's to enter the details in the Title and Diary fields beneath the map. To submit a new entry, complete these fields and press the "Add a Travel Diary" button.

If a location has not been selected before entering a submission, an alert will pop up telling you to select a location first.

### To view your own entries

Open the sidebar, by selecting the burger menu icon in the top left and select "My Travel Diaries.

Here you will see all of your diary entries listed as blog posts, with a title, diary entry, the co-ordinates and buttons to edit/delete an entry.

If you want to edit an entry, select the edit button for that entry and fields will appear asking you to re-submit a title and diary entry. Once completed, select update and a pop up will confirm that the diary has been updated.

To delete an entry, press delete. Once pressed, a pop up will confirm that the entry has been deleted.

## Tests

To test this project, I have used a unit test and a snapshot test to test the front-end application and a unit test to test the backend.

### Running the Tests

To test the front-end, navigate to the front-end directory and type 'npm test'. The tests will run and you'll see the results once they have completed. This will run the snapshot test and unit test in App.test.js.

To test the back-end server, navigate to the middleware-app directory and type 'npm test'. This will run app.test.js which tests the response of the GET request for /api/pins.

## Security

This app has been secured using Helmet. Helmet is express "middleware" that secures your Express apps by configuring several HTTP headers for security.

JWT middleware authentication also ensures that users can only access the site if they have a valid token and can only edit/delete their own posts unless they are a valid admin user.

Dotenv files have also been used for access keys for Mapbox API and MongoDB. To install on your own machine from git hub, instructions have been given so users can create their own keys, ensuring security.

# Software requirements

## System Architecture

My Travel Diary will be a full stack MERN application built with React.js that allows users register, login and either enter their favourite locations or pin their favourite places in the map and write a blog entry for about the place for themselves and other users to see to help plan their own trips.

The back end for this app will be provided with Node.js, Express middleware will be used to handle requests and routes and mongoose scehmas will interact with MongoDb databases containing the information of users and their travel blogs. For the front-end I will be using CRA and hosting both the backend and front-end on Render as I am more familar with both.

To find the information on a particular place a user enters, including coordinates, I will be using the Geo DB Cities API and for the mapping functionalities, I will be using Mapbox as this is free compared to Google Maps API.

In terms of styling, I will be using React Bootstrap as I am very familiar with it now and as there is limited time to build the full stack app, libraries like react-bootstrap make styling faster and easier.

I will use JSON Web Tokens (JWT) for authentication and the users will be able to log in using Facebook, Google or their own username and password. This means they can log in securely securely and their personal information and travel data are protected. Users will be able to see all travel pins and their blog data but only admin users will be able to edit or delete other's entries. Regular users will only be able to add/edit/delete their own location and blogs.

## System Requirements Section

### How this app will work

To use this application, users will first have to sign up for an account. When they first navigate to the main page they will be greeted with a log in screen which will either let them log in or click on "Sign up" which will lead to a sign up page that lets them enter their username and password, or register with Facebook/Google. The user's details will be saved to a user MongoDB database which will then be authenticated with a JWT token when they log in.

Once they sucessfully log in with their token credentials, they will be taken to the home page which will display a map with user's pins. If a user clicks on a pin it will display a pop up with the name of the location, the name of the user who submitted it and a preview of a blog post with a read more button. If you click on the "Read more" button it will link to a page that contains the whole blog.

In the side bar there will be a navigation menu which will lead to components to add a travel location and blog, or a page to view your blogs where users edit or update blogs or delete their pins.

If a user clicks on "Add a Diary", they will be taken to a page where they can either enter their location, which will create a pin on the below map or drop the pin themselves. Under the map will be an input box where users can input their travel blog which will populate the pin pop up on the main map on the home page.

On the "View My Diaries" page, users will only be able to see their travel blogs where there will be options to edit and delete their blogs. Users can only modify their own blogs but there will be one admin that has the credentials to edit and delete all blogs posts.

Users will be able to log out by clicking the "Log Out" button in the header. This will re-direct them to the log in page and clear their token/details.

### Who will use the app

Anyone who enjoys writing about their travels or sharing experiences of places will enjoy using this travel diary app. Users can be assured that their data is secure and as the app saves all their articles in the database, they don't need to worry about losing their diaries.

### Similar websites

There are several large blogging platforms such as Wordpress which people use for their travel blogs but the map/location pin feature is something unique to my travel blog application. My site willhave a clean and simple interface to make it easy and accessible for any user to log in and get started without a learning curve. The pin on the map also makes the travel blog seem more personal as it places their story in context and allows users to see other users stories in a new way.

### Functional Requirements

- Users should be able to sign up as a new user with Facebook, Google or their username and password
- Users should be log in and log back out
- Users should be able to view existing blogs from all users by selecting a pin on the map
- Users should be able to add a new pin to the map and a travel blog post alongside it
- Users should be able to view only their travel blogs
- Users should be able to update/edit an existing travel blog
- Users should be able to delete a blog
- Admin users should be able to edit or delete any blog post

### Non-functional Requirements

- Usability: The app should have a simple and intuitive interface which is accessible to all users. The map interface, buttons and user input sections will all be consitent and familiar to users. Users will be alerted before they submit a blog post or if they delete a blog post. Navigation will be consitent with traditional layout and there will be a Help page for users who need it.

- Reliability: The app will use MongoDB for the database which will store all articles and users. As a NoSQL database, MongoDB has a number of servers storing back ups to manage risk.

- Performance: This front end for the app will be built using CRA (Create React App). As a popular starter kit, it improves performance of the website by using a "virtual DOM", instead of rewriting the DOM every time a change is made to the HTML of the page. Also with MongoDB as the database, it allows data that's frequently accessed together to be stored in the same place which makes accessing it much faster alongisde easy to scale up with the multiple servers.

### User Stories

- User 1 wants to sign up to My Travel Diary so they enter the url and click on "Sign Up" button. They are then taken to a page that gives them the option of registering with their username and password, with Facebook or with Google. Once they have made their selection, the system saves their login details in the MongoDB database. They are then taken back to the log in page where they successfully log in

- User 2 tries logging in without creating an account first. They types in a username and password and then clicks the "Login" button, or they click the "Login with Facebook" or "Login with Google" button. As the system does not recognise their login details, they are shown a message letting them know they are not recognised and that they should either double check their login details or click the Sign Up button. When they are successfully logged in, they are redirected to the home page where they can see the map with all users pins and a welcome message in the top right corner.

- User 3 wants to add a new blog. They click on "Add a diary" in the side bar and are directed to to a new page. They are welcomed to either enter their location, which will create a pin on the below map or drop the pin themselves. They choose to enter the location and a pin appears on the map. Under the map there is an input box where they input their title and travel blog. Once they input their blog they click the "Save" button, the user's username, title and the blog are saved to the Mongo database and the user sees a popup message to say "Diary saved". They will then be redirected to the main page and see their pin on the map that has a pop up when clicked displaying their name, title and blog post.

- User 4 wants to update one of their blogs so they navigate to the side bar and click on "View My Diaries". There they will be able to see their entered locations with the corrosponding travel blog. Each blog also has an "Edit" button and a "Delete" button. The user clicks the "Edit" button for the blog they wish to edit and another input field appears for them to re-write an entry. Once they have made the changes they want, they can click "Save" button to save changes. When they click "Save", the MongoDB entry is updated with the new blog content.

- User 5 wants to delete a blog so they navigate to the side bar and click on "View My Diaries" where they see their entered locations with the corrosponding travel blog. They click on the "Delete" button for that blog article and are shown a popup message that asks if they are sure they want to delete it. They click "Yes", they are shown another popup message to say the blog was successfully deleted. The blog is then removed from the Mongo database and the map pin marker removed.

### Wireframes

I have created wireframes to represent the User Interface of the project using Draw.io.
