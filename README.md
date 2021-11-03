# Mars web project group-16
This is the client-side start project for the Analysis and Development project.

Create your client-side project in this repo.

## Important public urls  
* Web project: https://project-ii.ti.howest.be/mars-16/
* Sonar reports: https://sonar.ti.howest.be/dashboard?id=2021.project-ii%3Amars-client-16

## Please complete the following instructions before committing the **final version** on the project
Please **add** any **instructions** required to: 
* make your application work if applicable 
* be able to test the application (credentials, populated db, ...)
* view the wireframes.

Also clarify
* If there are known **bugs**.
* If you haven't managed to finish certain required functionality.

## Instructions for testing locally
* Run the mars-server with gradle run (in another intelij instance)
* Open the mars-client in phpstorm/webstorm
  * Navigate to the index.html
  * Click on a browser icon at the top right of your IDE to host the mars-client.
  
## Instruction for testing the web client locally with a deployed mars-server
* Open the mars-client in phpstorm
  * Copy the following settings to **config.json** (make sure to replace the XX)
```json
      {
        "host": "https://project-ii.ti.howest.be",
        "folder": "",
        "group": "mars-XX"
      }
```
  * Navigate to the index.html
  * Click on a browser icon at the top right of your IDE to host the mars-client.
  * Make sure to undo the settings once you are done testing the remote server!

## Instructions for local quality checks
You can run the validators for html, CSS and JS rules locally. 

Make sure **npm** is installed.

There is no need to push to the server to check if you are compliant with our rules. 

In the interest of sparing the server, please result to local testing as often as possible. 

If everyone pushes to test, the remote will not last. 

Open a terminal in your IDE
  - Make sure you are in the root folder of the client project.
  - Execute `npm install` this step is only needed once.
  - Execute `npm run validate-local` for linux/max users.
  - Execute `npm run validate-local-win` for windows users. 
  - If there are errors, the program execution will halt and show the first error
  - If there are no errors, a report file will be generated in the `.scannerworks/` directory. You will find the link to the sonar report in this file 

Hint:

If you want to skip ci remotely, include `[ci skip]` in your commit message. 

This is convenient for when you want to quickly add a certain commit, but do not wish to trigger the whole CI sequence. 

## Default files

### CSS 
The `reset.css` has already been supplied, but it's up to you and your team to add other styles. 

We'll handle efficient delivery for products in production in later semesters. 

### JavaScript
A demonstration for connecting with the API has already been set up. 

We urge you to separate your JS files as **atomically as possible**. 

Add folders as you please.  