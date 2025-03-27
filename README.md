Rick and Morty Characters App

A simple web application that uses Apollo Client to fetch and display a list of characters from the Rick and Morty series using the Rick and Morty GraphQL API. The app allows users to view character details, filter by status and species, sort by name and origin, and paginate through the results. Additionally, there is a language switcher in the footer to toggle between English and German.

-Features-
*Character List: Displays the following information about each character:
    Name
    Status (Alive, Dead, Unknown)
    Species
    Gender
    Origin
*Filtering: Filter characters by Status and Species.
*Sorting: Sort characters by Name and Origin.
*Pagination: Paginate through the list of characters. (Bonus: Infinite scrolling can be enabled.)
*Language Switcher: Toggle between English and German languages for the page fields.
*Error Handling: Gracefully handle loading and error states.

-Installation-
Prerequisites
*Node.js (version 14.x or higher)
*npm (Node package manager)

-Steps to Set Up Locally-
1.Clone the repository:
git clone https://github.com/EraQerimi/Rick-Morty-app.git
cd Rick-Morty-app

2.Install dependencies:
npm install

3.Start the development server:
npm start
This will start the app at http://localhost:3000 in your browser.

4.Apollo Client Setup: This project uses Apollo Client to interact with the GraphQL API. The configuration for Apollo Client is already set up in the project.

-Usage-
Once the app is running, the list of characters will be fetched from the Rick and Morty GraphQL API.
You can filter characters by Status (Alive, Dead, Unknown) and Species.
Sort characters by Name or Origin.
Scroll to load more characters or use the pagination (based on your setup).
Use the Language Switcher in the footer to toggle between English and German.

-Language Support-
The app supports both English and German. The page field names (e.g., Status, Species, Gender) will change based on the selected language.

Technologies Used
React: Frontend library for building the UI.
Apollo Client: Used for querying the GraphQL API.
GraphQL: Data fetching layer for the Rick and Morty API.
CSS/Styled Components: For styling the app.

-Bonus-
The app includes infinite scrolling as an additional feature for loading more characters dynamically as the user scrolls down the page.

-Acknowledgements-
Rick and Morty API
Apollo Client
React Documentation
