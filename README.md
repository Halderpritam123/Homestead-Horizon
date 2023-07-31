# Homestead-Horizon

Live Demo:[https://64bdab6e5797ba67f576c003--kaleidoscopic-choux-c57581.netlify.app/home](https://kaleidoscopic-choux-c57581.netlify.app/home)
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

## Conclusion

This documentation provides an overview of the Horizon Hotel project's backend. It includes information about the endpoints, request/response formats, and helper functions used in the backend implementation. For more details on each endpoint's functionality, refer to the corresponding sections in this document.

If you have any questions or need further assistance, feel free to reach out to the development team.
