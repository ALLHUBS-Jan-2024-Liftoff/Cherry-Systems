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
 - After first initiliazation, change (spring.sql.init.mode=always) back to (spring.sql.init.mode=never). 
 - You will only need to do this upon the initial setup, or when you want a fresh reset of your database. 

 5. Execute Triggers
 - Navigate to ThirdPlace-Backend/src/main/resources/triggers.sql
 - Copy-and-paste the entire file into a new SQL tab in MySQL and execute it. This is necessary for back-end calculations of ratings and cherry points.