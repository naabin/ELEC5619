# ELEC5619

Welcome to EasyShare – an interactive online platform designed to facilitate easy appliance rentals within your community. Feel free to sign up as an appliance renter, lender … or both! This document provides a guide on the different features offered by EasyShare and provides helpful information on how to navigate our platform. 


We hope you enjoy,
Group 25 of ELEC5619 (Nabin, Layell, Aiman and Jessica) 

## Guide to Running EasyShare 

### Program Requirements
* IntlliJ IDEA Ultimate 
* MySQL Community Server 

### General Installation 
* Download IntelliJ IDEA Ultimate (select a version suitable for your local machine)
* Download MYSQL Community Server (select a version suitable for your local machine) 
* Download project:
  * Option 1: Open zip file submitted through Canvas and run on IntelliJ
  * Option 2: Clone GitHub Project on IntelliJ: https://github.com/naabin/ELEC5619.git, or 
      ```bash
      git clone https://github.com/naabin/ELEC5619.git
      
### Run the Front End 
* Install @angular/cli globally
    ```bash
      sudo npm install -g @angular/cli
* Change to front end directory
    ```bash
      cd src/main/resources/frontend
* Run project
    ```bash
      ng serve
This runs on http://localhost:4200/ 

### Run the Back End 
* Under File -> Project Structure, ensure the SDK is Version 15 or under
* In Application Properties (src/main/resources/application.properties) amend the username and password (in lines 11-12) to correspond with the username and password of the SQL server set up you your local machine 
* Run the project with Spring Boot

This runs on http://localhost:8080/ 

## Libraries 

### Front End APIs
* Leaflet API
  * Integrated with the Angular framework to generate a ‘map’ component. This map shows the user’s location and all available appliances for rental in their proximity. 
  * Leaflet also enables the distance between a user and an appliance to be calculated, as well as the travel time
  
### Back End APIs
* Stripe API 
  * Used to create a payment gateway which securely validates customer credit card details ensuring sufficient funds are available for payment
  * All payments appear on EasyShare’s internal dashboard, providing an easy way to track revenue
* Sendgrid API
  * Validation of email addresses inputted by end users when using the sign up functionalise of the application
  
## Functionalities 

### Sign up and User Authentication

The main feed is the landing page for EasyShare. Regardless of whether a user is signed in or not, they are able to view nearby rental appliances. 

To sign up, the user will be prompted to enter various details including email, phone number, username and password. If any personal identifiers have already been stored in the database (e.g. email, username), the user will be prompted that they may already have an account. If any required fields are not completed, the user will not be able to sign up. 

Email verification: Once signing up, a user will receive an email confirming their EasyShare registration for security purposes, achieved through the Sendgrid API. 

### Log In 

If a user is not signed in, they are only able to access the main page, sign in and sign up functions. 

To log in, the user will be prompted to enter an email and password. If this is an identical match to a user account in our database, they will have access to the complete EasyShare website. 

### Main Feed

The main feed (also the home page) features a navigation bar at the top. If the user is signed in, this will provide navigational links to a user’s ‘My Profile’ (where they can view and edit personal details), ‘Create a Listing’ (where a user can create a rental appliance listing), ‘Messages’ to view recent communications with other EasyShare users and an option to log out. 

The main feed begins with a search tool with the option for application of advanced filters to further minimise their search. This will be discussed below. 

Further down the page, nearby available rental appliances are listed. Each appliance displays a preview of their information including a brief description, pictures and their rental price structure. Clicking ‘view’ will direct the user to another page to receive more information about the appliance and begin a transaction.  

### Applying Advanced Search Filters 

The advanced search tool can be accessed through the home page. Here, the user can select to only view results that meet their own preferences and conditions. This includes searching for a specific appliance category, length of rent, maximum price, maximum location from user and minimum lender rating. After this has been inputted, a backend algorithm will filter the relevant databases and output the results that best fit these criteria on the search results page. 

### Search Results 

After applying advanced search filters, the user is directed to a page that outputs the relevant search results. On this page, directly below the navigation bar, the advanced search filters the user previously inputted can be reviewed. There is an option to create a new search if these details are incorrect or the user wishes to search differently. 

Below this, the search results are displayed. Each listing includes a preview of the appliance including a brief description and pictures. There is also a map which visualises and calculates the distance between the user and the rental appliance, using the Leaflet API.

### Renting an Appliance 

When a rental appliance is selected, whether from the home page or search results, the user will be directed to another page which has the complete advertisement and details of the listing. This includes images, item description and details (such as brand and model number) and lender information. 

The user will be able to select how long they would like to rent the appliance for. Using a front end price calculation algorithm, the total price of the rental will be calculated and displayed to the user. The user will be directed to continue to payment, which is facilitated by the Stripe API. 

### Create a Listing 

This tool can be accessed through the navigation bar. The user will be directed to create their own appliance rental listing in two stages. In the first stage, they will input details about their appliance including brand, model number, condition and year of purchase. They will also be directed to design the advertisement through choosing a title for their listing, including an advertisement description about the appliance and setting the rental price. In the second stage, the user can upload up to 3 images that will be used to advertise their appliance rental. 

### My Profile

The My Profile page, accessible from the navigation bar, is split into two sections. On the left hand side, the user is able to add, or edit their personal and payment details. On the right hand side, they will be able to view all their rental appliances.    



