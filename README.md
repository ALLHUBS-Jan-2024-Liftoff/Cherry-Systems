# ThirdPlace

<div align="center">
<img width=491px src="https://github.com/user-attachments/assets/76c96bb6-ae3f-4846-9b4d-d48ba12c9184"/>
</div>

<br/>

ThirdPlace is an app dedicated to solving the <a href="https://en.wikipedia.org/wiki/Loneliness_epidemic">loneliness epidemic</a>. By offering a space for users to locate, share, and review third places, people can connect with their local communities in <a href="https://en.wikipedia.org/wiki/Third_place">third places</a> outside their homes and offices.

### Tech Stack
- React
- JavaScript
- Java
- Spring / Spring Boot
- MySQL
- Bootstrap
- Google Maps API

## Features
- External API Usage: Google Maps API provides address validation to prevent false address creation. The app also populates a Google Map displayed on listings to help interested users locate a space.
- Search and filter locations with custom parameters to find a third place near you.
- Autocomplete behavior on search fields for better user experience.

## How to Use

#### Clone the repository
            https://github.com/ALLHUBS-Jan-2024-Liftoff/Cherry-Systems.git
#### In your terminal install npm dependencies
            npm install

### Google Maps API Key Setup
A Google Maps API key is required. 

#### On Google Cloud Console:
1. Acquire a key on your <a href="https://console.cloud.google.com/">Google Cloud platform</a>
2. Under Credentials, set your application restriction to "Websites" and add a website restriction of `http://localhost:5173/*`
3. Set API restriction to "Don't restrict key" and save your settings
4. Enable the following API libraries under APIs & Services:
   - Maps JavaScript API
   - Places API	
   - Address Validation API
#### In your local repo:
1. In `ThirdPlace-UI` (the front end code's directory), create a file with the name `.env`. Make sure you don't place this in the src directory.
2. Inside `.env`, paste this: `VITE_GOOGLE_MAPS_API_KEY=value`
3. Replace `value` with your API key from Google Maps API.
4. Open your `.gitignore` file. Insert a line for `.env`

## Register and Login a User

#### 1. From the home page, click on the Sign Up Button to get to the Registration form and create a new user
![ThirdPlace_Home_Index_Page 01](https://github.com/user-attachments/assets/ad29b9e2-b841-4624-adbf-b96b32d12ba2)

| 2. Register a new user  | 3. After a new user is created, you will be directed to the Login page to login |
| ------------- | ------------- |
| <img src="https://github.com/user-attachments/assets/3edbced9-1e06-42ed-9055-41e0234e95bc"/> | <img src="https://github.com/user-attachments/assets/db637311-00f0-43ad-99af-2640ba8861ea"/> |

#### 4. After login, you will be directed back to the Home page where you have access to the Submit Location and Profile pages along with Logout button
![ThirdPlace_Home_Index_Logged In_Page 01](https://github.com/user-attachments/assets/b319fa5c-8f90-477d-b5d4-372c575b6723)

## User Profile

- See your Cherry Score on your Profile Info Card, when you engage with locations you receive points that accumulate here. Receive 10 points for submitting a new Location, 5 points for reviewing an existing location, and 1 point for giving a existing submission a thumbs up or down.

| Without Points  | With Points |
| ------------- | ------------- |
| <img src="https://github.com/user-attachments/assets/216433c3-a586-4d9b-98c1-4a5d8347208c"/> | <img src="https://github.com/user-attachments/assets/ff3edaea-e1d5-4c80-a647-1085e9c3a0c2"/> |

 ### How to initialize SQL Database
 1. Create the database:  
- Open MySQL and initialize the database with the following commands: 

 CREATE DATABASE IF NOT EXISTS ThirdPlace_db;
 USE ThirdPlace_db;

 2. Configure Application Properties:
- Navigate to ThirdPlace-Backend/src/main/resources/application.properties

 3. Initialize the Schema and Seed Data:
- Locate line 15, which reads spring.sql.init.mode=never.
- Change it to spring.sql.init.mode=always to automatically initialize the schema and seed data when the backend application starts.

 4. Revert Initialization Setting:
 - After first initialization, change (spring.sql.init.mode=always) back to (spring.sql.init.mode=never). 
 - You will only need to do this upon the initial setup, or when you want a fresh reset of your database. 

 5. Execute Triggers
 - Navigate to ThirdPlace-Backend/src/main/resources/triggers.sql
 - Copy-and-paste the entire file into a new SQL tab in MySQL and execute it. This is necessary for back-end calculations of ratings and cherry points.
