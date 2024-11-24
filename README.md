

https://trello.com/b/lsjkAzKa/samsa-project

https://www.figma.com/design/YEgomIC1WXIpO62SPamh3Q/Untitled?node-id=2-36&node-type=symbol&t=uR17kugr1bc7xrJo-0


# Project Name

## Getting Started

### Install Dependencies
Run the following command to install all required dependencies, including development dependencies like nodemon:

```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:

```makefile
PORT=5000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-secret-key
```

### Run the Development Server
Use the following command to start the server in development mode (uses nodemon for live reloading):

```bash
npm run dev
```

The server will start and be accessible at [http://localhost:5000](http://localhost:5000).

### Start the Server in Production Mode
If you'd like to run the application without live reloading, you can start the server using:

```bash
npm start
```

### Access the Frontend
Open [http://localhost:5000](http://localhost:5000) in your browser to access the application.

## File Structure

```
project-root/
│
├── src/
│   ├── app.js                   # Main entry point of the application
│   ├── routes/                  # API routes
│   │   ├── auth-routes.js       # User authentication routes
│   │   ├── reservation-routes.js# Reservation-related routes
│   │   └── index-routes.js      # Root routes
│   ├── controllers/             # Business logic for routes
│   │   ├── auth-controller.js   # Logic for user authentication
│   │   ├── reservation-controller.js # Logic for reservation handling
│   ├── models/                  # Database interaction logic
│   │   ├── user-model.js        # User model for DB operations
│   │   ├── reservation-model.js # Reservation model for DB operations
│   ├── utils/                   # Utility functions
│   │   ├── db.js                # Database connection logic
│   │   ├── error-handler.js     # Custom error handling logic
│   └── public/                  # Static frontend files
│       ├── index.html           # Main HTML file
│       ├── Reservation.html     # Reservation page
│       └── styles.css           # CSS file
├── package.json                 # Project metadata and dependencies
├── .env                         # Environment variables
└── README.md                    # Project documentation
```
## Testing the Project
## API Endpoints

### Authentication

#### Register User:
**POST** `/auth/register`

**Request Body:**
```json
{
  "full_name": "John Doe",
  "date_of_birth": "1990-01-01",
  "contact_number": "1234567890",
  "address": "123 Main St",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User:
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Reservations

#### Create Reservation:
**POST** `/reservation`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "adults": 2,
  "children": 1,
  "reservation_date": "2024-12-25",
  "reservation_time": "18:30",
  "special_request": "Window seat, please."
}
```

### Frontend
- Open `index.html` in a browser.
- Use the reservation form for manual testing.


## Troubleshooting

- **Database Connection Issues**: Ensure `.env` has the correct database credentials.
- **Missing Dependencies**: Run `npm install` to install all required packages.
