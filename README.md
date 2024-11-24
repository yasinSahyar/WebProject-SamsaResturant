# Samsa Restaurant Project - README.md

## Introduction

This project is aimed at creating a modern web application for Samsa Restaurant that features reusable HTML components like login, registration, password reset, and reservation forms. This approach enhances code maintainability and consistency across multiple pages. Backend functionalities are built to handle user registration, login, password reset, and more, with a focus on modularity and efficiency.

## Features

- **User Authentication**: Users can register, login, and reset passwords through modal forms.
- **Reservation System**: Customers can book tables using the reservation modal form.
- **Reusable HTML Components**: HTML components like headers and modals are reused across multiple pages to avoid redundancy and ensure consistency.
- **Backend Integration**: The backend is connected to handle user data securely, including hashing passwords and managing session data.
- **Postman API Testing**: The project was tested using Postman to ensure that endpoints for registration, login, and password reset are functional.

## Project Structure

- **HTML Files**: Individual HTML files like `index.html`, `menu.html`, `login.html`, `reservation.html` , contain placeholders for shared components (e.g., modals, header).
- **JavaScript Files**: JavaScript files like `login.js`, `register.js`, `forgot-password.js`, and `reservation.js` are used to add dynamic behavior to forms, handle form submissions, and make API requests.
- **Backend**: Node.js, Express.js are used for handling backend logic. The backend manages user authentication, password hashing, and database integration using MySQL.

## Dependencies and Installations

To run this project locally, make sure to install the following dependencies:

1. **Node.js**: Make sure Node.js is installed. You can check this by running `node -v`.
2. **Express**: Install Express to create the server.
   ```bash
   npm install express
   ```
3. **Bcrypt**: Used for hashing passwords to ensure security.
   ```bash
   npm install bcrypt
   ```
4. **Nodemon**: Used for automatically restarting the server during development.
   ```bash
   npm install -g nodemon
   ```
5. **UUID**: Used for generating unique tokens for password reset functionality.
   ```bash
   npm install uuid
   ```
6. **MySQL**: Install MySQL driver to connect the backend to the MySQL database.
   ```bash
   npm install mysql
   ```
7. **CORS**: To handle cross-origin requests.
   ```bash
   npm install cors
   ```

## Running the Project

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WebProject-SamsaRestaurant
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the server**
   Use nodemon to start the server with automatic reload during development.
   ```bash
   npm run dev
   ```
   Alternatively, you can use Node.js directly:
   ```bash
   node src/app.js
   ```
4. **Open in Browser**
   Navigate to `http://localhost:5000` in your web browser to view the application.

## API Testing Using Postman

- **User Registration** (`POST /auth/register`): Submit user details to register a new account.
- **User Login** (`POST /auth/login`): Authenticate existing users.
- **Forgot Password** (`POST /auth/forgot-password`): Send a reset password link to the user's email.


## Key Functionalities

- **Frontend**: Modal forms for login, registration, password reset, and reservation are used to streamline user interactions. They are dynamically loaded into different HTML pages.
- **Backend**: Handles user data securely using hashed passwords, MySQL database integration, and JSON-based APIs for frontend interactions.





