# Homestead-Horizon

Live Demo:https://kaleidoscopic-choux-c57581.netlify.app/home
<br/>
Backend Link:https://horizon-2pqa.onrender.com/
<br/>
Video Presentation:https://drive.google.com/file/d/1oB_Bx0RL9pizmuggxMy-1CaS0DWKgHv6/view?usp=sharing

Sure! Below is the documentation for the backend of the provided code:

# Horizon Hotel Backend Documentation

This documentation provides an overview of the backend implementation for the "Horizon Hotel" project. The backend is built using Flask, a Python web framework, and connects to a MongoDB database for data storage.

## Table of Contents

### Prerequisites

Before running the backend, ensure that you have the following software installed:

- Python 3
- MongoDB

### Installation

1. Clone the GitHub repository containing the project code:

```bash
git clone https://github.com/your-username/horizon-hotel.git
cd horizon-hotel
```

2. Install the required Python packages using pip:

```bash
pip install -r requirements.txt
```

3. Set up MongoDB and replace the `MONGO_URI` and `DB_NAME` variables in the `app.py` file with your MongoDB connection URI and desired database name.

4. Obtain an API key from OpenAI to use the chatbot functionality. Set your API key as an environment variable with the name `API_KEY`.

```bash
export API_KEY=your_openai_api_key
```

5. Run the Flask app:

```bash
python app.py
```

The backend server will now be running at `http://127.0.0.1:5000/`.

## Endpoints

### User Routes

- **POST /signup/host**: Create a new host account.

  Request Body:
  ```json
  {
    "email": "host@example.com",
    "password": "your_password"
  }
  ```

- **POST /signup/guest**: Create a new guest account.

  Request Body:
  ```json
  {
    "email": "guest@example.com",
    "password": "your_password"
  }
  ```

- **POST /login/host**: Host login.

  Request Body:
  ```json
  {
    "email": "host@example.com",
    "password": "your_password"
  }
  ```

- **POST /login/guest**: Guest login.

  Request Body:
  ```json
  {
    "email": "guest@example.com",
    "password": "your_password"
  }
  ```

- **POST /logout**: User logout.

### Property Routes

- **GET /api/properties**: Get all properties.

  Query Parameters:
  - `sort_by`: Sort properties by field (default: "price_per_night").
  - `sort_order`: Sort order (1 for ascending, -1 for descending, default: 1).
  - `page`: Page number for pagination (default: 1).
  - `per_page`: Number of properties per page (default: 9).
  - `title`: Filter properties by title (optional).
  - `property_type`: Filter properties by type (optional).
  - `location`: Filter properties by location (optional).

- **GET /api/properties/{property_id}**: Get a single property by property ID.

- **POST /api/properties**: Create a new property.

  Request Body:
  ```json
  {
    "title": "Property Title",
    "location": "Property Location",
    "property_type": "Property Type",
    "description": "Property Description",
    "price_per_night": 100,
    "status": true,
    "img": "Property Image URL"
  }
  ```

- **PUT /api/properties/{property_id}**: Update an existing property by property ID.

  Request Body (fields to be updated):
  ```json
  {
    "title": "New Title",
    "location": "New Location",
    "price_per_night": 120
    // Add other fields to update as needed
  }
  ```

- **DELETE /api/properties/{property_id}**: Delete an existing property by property ID.

### Booking Routes

- **GET /api/properties/book**: Get all booking data.

- **GET /api/properties/book/{booking_id}**: Get a single booking data by booking ID.

- **POST /api/properties/book**: Create a new booking.

  Request Body:
  ```json
  {
    "property_id": "Property ID",
    "property_title": "Property Title",
    "price_per_night": 100,
    "property_location": "Property Location",
    "property_img": "Property Image URL",
    "book_date": "2023-07-31",
    "end_date": "2023-08-07"
  }
  ```

- **DELETE /api/properties/book/{booking_id}**: Delete a booking data by booking ID.

### Chatbot Routes

- **POST /api/chat**: Get a response from the chatbot.

  Request Body:
  ```json
  {
    "user_input": "User's message or query"
  }
  ```

  Response:
  ```json
  {
    "response": "Chatbot's response to the user input"
  }
  ```

## Helper Functions

- `get_db()`: Connect to the MongoDB server and return the database instance.
- `hash_password(password)`: Hash the provided password using bcrypt.
- `verify_password(stored_hash, password)`: Verify if the provided password matches the stored hashed password.
- `Property`: Model class for a property with title, location, property type, description, price per night, status, and image attributes.
- `Booking`: Model class for a booking with property image, ID, title, price per night, location, booking date, and end date attributes.
- `get_chatbot_response(user_input)`: Function to handle chatbot responses using OpenAI's GPT-3 model.

# Homely Horizons Frontend Documentation

This documentation provides a comprehensive guide to the frontend implementation of the "Homely Horizons" web application. The frontend is built using modern web technologies, including HTML, CSS, JavaScript, and React.js, to create an interactive and user-friendly experience for users.

## Table of Contents

### Prerequisites

Before running the frontend, ensure that you have the following software installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the GitHub repository containing the project code:

```bash
git clone https://github.com/your-username/homely-horizons.git
cd homely-horizons
```

2. Install the required Node.js packages using npm:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory of the project and set the necessary environment variables:

```
REACT_APP_API_BASE_URL=http://your-api-base-url
REACT_APP_OPENAI_API_KEY=your-openai-api-key
```

Replace `http://your-api-base-url` with the base URL of your backend API, and `your-openai-api-key` with the API key for OpenAI.

4. Run the development server:

```bash
npm start
```

The frontend will now be accessible at `http://localhost:3000/`.

## Folder Structure

```
homely-horizons/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   ├── Authentication/
│   │   ├── PropertyManagement/
│   │   ├── PropertyBrowsing/
│   │   ├── Booking/
│   │   ├── ChatbotIntegration/
│   │   └── ...
│   ├── api/
│   ├── assets/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── ...
```

- `public/`: Contains the public files like the main `index.html` file and other static assets.
- `src/`: Contains the source code for the frontend application.
- `src/components/`: Contains various reusable components used in different sections of the application.
- `src/api/`: Contains utility functions for making API requests and handling responses.
- `src/assets/`: Contains static assets like images, icons, etc.
- `src/utils/`: Contains utility functions and helper methods used throughout the application.
- `src/App.js`: The main component representing the application.
- `src/index.js`: The entry point of the application.

## Components

The frontend is divided into several components, each responsible for a specific section or feature of the application.

### Authentication

- `Login`: Component to handle user login functionality.
- `SignUp`: Component to handle user registration (sign-up) functionality.

### Property Management

- `HostDashboard`: Component to provide hosts with the ability to manage their properties efficiently.
- `PropertyForm`: Component to create or update a property listing.

### Property Browsing

- `PropertyList`: Component to display a list of available properties for users to browse.
- `PropertyCard`: Component to represent a single property in the list.

### Booking

- `BookingForm`: Component to handle the booking process, allowing users to reserve properties based on their preferences.

### Chatbot Integration

- `Chatbot`: Component to integrate and interact with the chatbot functionality.

## Routing

The frontend uses React Router for handling navigation and routing within the application. The main routes are as follows:

- `/login`: Route for user login.
- `/signup`: Route for user registration.
- `/host/dashboard`: Route for the host's property management dashboard.
- `/browse`: Route for property browsing.
- `/book/:propertyId`: Route for booking a specific property.

## State Management

The frontend uses the React Context API for state management. The global state is managed using context providers and consumers to share data across components.

## API Integration

The frontend communicates with the backend API using various utility functions defined in the `src/api/` directory. These functions handle making HTTP requests and handling responses.

## Payment Integration

The frontend integrates with a payment gateway to facilitate secure and seamless booking transactions. The payment gateway API is called during the booking process to process payments.

## Logging Out

Users can securely log out of their accounts by clicking on the logout option available in the application. Logging out clears the user's session data and redirects them to the login page.
![Screenshot 2023-07-30 164444](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/89630e3d-1592-4fef-b3f9-8498ad0884bf)
![Screenshot 2023-07-31 082552](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/57d3bc21-8bd6-483d-8bb4-ec459457bf39)
![Screenshot 2023-07-31 082606](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/40377c43-80f9-495a-bab8-6fe1eaae1713)
![Screenshot 2023-07-31 082641](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/20d18df2-68d7-4642-8bfe-bd3864006fd3)
![Screenshot 2023-07-31 082914](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/c940a60e-9fa0-4a34-a675-62a641325039)
![Screenshot 2023-07-31 083023](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/d3d4132c-5689-49e8-b1fd-db964a8d19eb)
![Screenshot 2023-07-31 083035](https://github.com/Halderpritam123/Homestead-Horizon/assets/115460430/c4c50d85-0473-4133-a7dc-2062584c7689)






