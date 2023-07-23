# Import necessary modules and libraries
from flask import Flask, request, jsonify, session
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
import bcrypt

# Create the Flask app instance
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from different domains
app.secret_key = "pritam"  # Secret key for session encryption
app.config['SESSION_TYPE'] = 'filesystem'  # Enable Flask session type

# MongoDB configuration
MONGO_URI = "mongodb+srv://pritampritamhalder:pritam123@cluster0.k7ucy26.mongodb.net/?retryWrites=true&w=majority"  # Replace this with your MongoDB connection URI
DB_NAME = "horizonHotel"  # Replace this with your desired database name

# Helper functions

def get_db():
    # Connect to the MongoDB server and return the database instance
    client = MongoClient(MONGO_URI)
    return client[DB_NAME]

def hash_password(password):
    # Hash the provided password using bcrypt
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(stored_hash, password):
    # Verify if the provided password matches the stored hashed password
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash)

# Property model class
class Property:
    def __init__(self, title, location, status, property_type, description, price_per_night, img):
        # Initialize the Property object with the provided attributes
        self._id = ObjectId()
        self.title = title
        self.location = location
        self.property_type = property_type
        self.description = description
        self.price_per_night = price_per_night
        self.status = status
        self.img = img

# Booking model class
class Booking:
    def __init__(self,property_img, property_id, property_title, price_per_night, property_location, book_date, end_date):
        # Initialize the Booking object with the provided attributes
        self._id = ObjectId()
        self.property_id = property_id
        self.property_title = property_title
        self.price_per_night = price_per_night
        self.property_location = property_location
        self.property_img=property_img,
        self.book_date = book_date
        self.end_date = end_date

# Route to handle the root URL
@app.route("/")
def index():
    # Return a simple message to indicate that the server is running
    return "Server running"

# User routes

# Route to handle host signup
@app.route('/signup/host', methods=['POST'])
def host_signup():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email already exists in the database
    if db.hosts.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    # Hash the password before saving it in the database
    hashed_password = hash_password(password)

    # Create a new host document
    host_id = db.hosts.insert_one({
        "email": email,
        "password": hashed_password,
    }).inserted_id

    return jsonify({"host_id": str(host_id)}), 201

# Route to handle guest signup
@app.route('/signup/guest', methods=['POST'])
def guest_signup():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email already exists in the database
    if db.guests.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    # Hash the password before saving it in the database
    hashed_password = hash_password(password)

    # Create a new guest document
    guest_id = db.guests.insert_one({
        "email": email,
        "password": hashed_password,
    }).inserted_id

    return jsonify({"guest_id": str(guest_id)}), 201

# Route to handle host login
@app.route('/login/host', methods=['POST'])
def host_login():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the host with the given email
    host = db.hosts.find_one({"email": email})

    if not host:
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify the password
    if not verify_password(host['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Set the user role to "host" in the session
    session['user_role'] = 'host'

    # Return the host ID in the login response
    return jsonify({"message": "Host login successful", "host_id": str(host["_id"])}), 200

# Route to handle guest login
@app.route('/login/guest', methods=['POST'])
def guest_login():
    db = get_db()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the guest with the given email
    guest = db.guests.find_one({"email": email})

    if not guest:
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify the password
    if not verify_password(guest['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Set the user role to "guest" in the session
    session['user_role'] = 'guest'

    return jsonify({"message": "Guest login successful"}), 200

# Route to handle user logout
@app.route('/logout', methods=['POST'])
def logout():
    # Remove user_role from session to log out the user
    session.pop('user_role', None)
    return jsonify({"message": "Logout successful"}), 200

# Property routes
# Route to get all properties
@app.route("/api/properties", methods=["GET"])
def get_all_properties():
    db = get_db()

    # Get query parameters for sorting, pagination, and filtering
    sort_by = request.args.get('sort_by', 'price_per_night')  # Default sort by price_per_night
    sort_order = int(request.args.get('sort_order', 1))  # Default sort order ascending
    page = int(request.args.get('page', 1))  # Default page 1
    per_page = int(request.args.get('per_page', 9))  # Default 10 properties per page
    title_filter = request.args.get('title', '')
    property_type_filter = request.args.get('property_type', '')
    location_filter = request.args.get('location', '')

    # Prepare the filter query based on the provided parameters
    filter_query = {}
    if title_filter:
        filter_query['title'] = {'$regex': title_filter, '$options': 'i'}  # Case-insensitive title filter
    if property_type_filter:
        filter_query['property_type'] = property_type_filter
    if location_filter:
        filter_query['location'] = location_filter

    # Get total number of properties matching the filter criteria
    total_properties = db.properties.count_documents(filter_query)

    # Calculate the total number of pages based on the number of properties and properties per page
    total_pages = (total_properties - 1) // per_page + 1

    # Ensure that the page number is within valid range
    if page < 1:
        page = 1
    elif page > total_pages:
        page = total_pages

    # Calculate the skip and limit values for pagination
    skip = (page - 1) * per_page
    limit = per_page

    # Ensure that the skip value is non-negative
    if skip < 0:
        skip = 0

    # Fetch properties based on the filter and pagination parameters
    properties = db.properties.find(filter_query).skip(skip).limit(limit)

    # Sort the properties based on the provided sort parameters
    if sort_by:
        properties = properties.sort(sort_by, sort_order)

    # Convert the properties to a list of dictionaries
    res = []
    for property in properties:
        res.append({
            "id": str(property["_id"]),
            "title": str(property['title']),
            "location": str(property['location']),
            "property_type": str(property['property_type']),
            "description": str(property['description']),
            "price_per_night": str(property['price_per_night']),
            "status": str(property['status']),
            "img": str(property['img'])  # Add the 'img' field to the response
        })

    # Return the paginated and filtered properties
    return jsonify(res)


# Route to get a single property by property ID
@app.route("/api/properties/<string:property_id>", methods=["GET"])
def get_property(property_id):
    db = get_db()
    property = db.properties.find_one({"_id": ObjectId(property_id)})
    if property:
        res = {
            "id": str(property["_id"]),
            "title": str(property["title"]),
            "location": str(property["location"]),
            "property_type": str(property["property_type"]),
            "description": str(property["description"]),
            "price_per_night": str(property["price_per_night"]),
            "status": bool(property["status"]),
            "img": str(property["img"])  # Add the 'img' field to the response
        }
        return jsonify(res)
    return jsonify({"message": "Property not found"}), 404

# Route to create a new property
@app.route("/api/properties", methods=["POST"])
def create_property():
    db = get_db()
    data = request.get_json()
    property = Property(
        title=data["title"],
        location=data["location"],
        property_type=data["property_type"],
        description=data["description"],
        price_per_night=data["price_per_night"],
        status=data["status"],
        img=data["img"]  # Add the 'img' field to the new Property object
    )
    db.properties.insert_one(property.__dict__)
    return jsonify({"message": "Property created successfully"}), 201

# Route to update an existing property by property ID
@app.route("/api/properties/<string:property_id>", methods=["PUT"])
def update_property(property_id):
    db = get_db()
    data = request.get_json()
    db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": data})
    return jsonify({"message": "Property updated successfully"})

# Route to delete an existing property by property ID
@app.route("/api/properties/<string:property_id>", methods=["DELETE"])
def delete_property(property_id):
    db = get_db()
    result = db.properties.delete_one({"_id": ObjectId(property_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Property deleted successfully"})
    return jsonify({"message": "Property not found"}), 404

# Route to post a new booking
# Route to post a new booking
@app.route("/api/properties/book", methods=["POST"])
def post_property_to_book_collection():
    db = get_db()
    data = request.get_json()

    # Extract booking data from the request body
    property_id = data.get('property_id')
    property_title = data.get('property_title')
    price_per_night = data.get('price_per_night')
    property_location = data.get('property_location')
    property_img = data.get('property_img')  # Directly set the property_img attribute to the received string value
    book_date = data.get('book_date')
    end_date = data.get('end_date')

    # Create a new Booking object
    booking = Booking(
        property_id=property_id,
        property_title=property_title,
        price_per_night=price_per_night,
        property_location=property_location,
        property_img=property_img,  # Set property_img as string without any changes
        book_date=book_date,
        end_date=end_date
    )

    # Insert the booking data into the database
    booking_id = db.book.insert_one(booking.__dict__).inserted_id

    # Update the status of the property to False
    if property_id:
        db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": {"status": False}})

    return jsonify({"booking_id": str(booking_id)}), 201


# Route to get all booking data
@app.route("/api/properties/book", methods=["GET"])
def get_all_book_data():
    db = get_db()
    book_data = db.book.find()
    res = []
    for book_entry in book_data:
        res.append({
            "booking_id": str(book_entry["_id"]),
            "property_id": str(book_entry.get("property_id")),
            "property_title": str(book_entry.get("property_title")),
            "price_per_night": str(book_entry.get("price_per_night")),
            "property_location": str(book_entry.get("property_location")),
            "property_img":str(book_entry.get("property_img")),
            "book_date": str(book_entry.get("book_date")),
            "end_date": str(book_entry.get("end_date"))
        })
    return jsonify(res)

# Route to get a single booking data by booking ID
@app.route("/api/properties/book/<string:booking_id>", methods=["GET"])
def get_book_data(booking_id):
    db = get_db()
    book_entry = db.book.find_one({"_id": ObjectId(booking_id)})
    if book_entry:
        res = {
            "booking_id": str(book_entry["_id"]),
            "property_id": str(book_entry.get("property_id")),
            "property_title": str(book_entry.get("property_title")),
            "price_per_night": str(book_entry.get("price_per_night")),
            "property_location": str(book_entry.get("property_location")),
            "property_img":str(book_entry.get("property_img")),
            "book_date": str(book_entry.get("book_date")),
            "end_date": str(book_entry.get("end_date"))
        }
        return jsonify(res)
    return jsonify({"message": "Booking data not found"}), 404
# Route to delete a booking data by booking ID
@app.route("/api/properties/book/<string:booking_id>", methods=["DELETE"])
def delete_book_data(booking_id):
    db = get_db()
    book_entry = db.book.find_one({"_id": ObjectId(booking_id)})
    if book_entry:
        property_id = book_entry.get("property_id")

        # Delete the booking data
        result = db.book.delete_one({"_id": ObjectId(booking_id)})
        if result.deleted_count > 0:
            # Update the status of the property to True (available) after deleting the booking
            if property_id:
                db.properties.update_one({"_id": ObjectId(property_id)}, {"$set": {"status": True}})
            return jsonify({"message": "Booking data deleted successfully"})
    return jsonify({"message": "Booking data not found"}), 404

# # Route to delete a booking data by booking ID
# @app.route("/api/properties/book/<string:booking_id>", methods=["DELETE"])
# def delete_book_data(booking_id):
#     db = get_db()
#     result = db.book.delete_one({"_id": ObjectId(booking_id)})
#     if result.deleted_count > 0:
#         return jsonify({"message": "Booking data deleted successfully"})
#     return jsonify({"message": "Booking data not found"}), 404

# Run the Flask app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)
