This repo houses the front end for Dave Holmes' Shopify application app "The Shoppies". Please refer to the project's back end code and installation instructions at https://github.com/daveholmes88/shopify-back-end

The Shoppies:

An application that fetches movie titles through the OMDb API and allows users to nominate those movies for "The Shoppies" 

Each user must login with a valid username and password. Each user is only allowed to nominate up to five movies. A full list of the nominated movies can be found showing all users the movies that are currently winning. 

You can see the website at 

Frontend Prerequisites:
React
React Router
React Bootstrap
Custom JWT authentication system integrates with JWT auth on the Rails API side.

Frontend Installation Overview:
Once the Rails server is running, launch the frontend components on http://localhost:3001:
cd ..
cd shopify-front-end
npm install && npm start
Note: when prompted, reply y when asked: Would you like to run the app on another port instead? (Y/n)
