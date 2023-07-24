# Homestead-Horizon

Live Demo:[https://64bdab6e5797ba67f576c003--kaleidoscopic-choux-c57581.netlify.app/home](https://kaleidoscopic-choux-c57581.netlify.app/home)
<br/>
Backend Link:https://horizon-2pqa.onrender.com/
<br/>
Video Presentation:https://drive.google.com/file/d/1oB_Bx0RL9pizmuggxMy-1CaS0DWKgHv6/view?usp=sharing

**Stage 1: Project Setup and Database Design**

1. Page Name: Database Schema Design
   - Functionality: The four main entities: Hosts, Properties, Guests, and Bookings.
   - Tech Stack: Backend: Flask, Python
   -              Frontend: Angular
   -              Data Base:Mongo Db
**Stage 2: Backend Development**

2. Page Name: Host Management
   - Functionality:
     - CRUD operations for Host profiles (Create, Read, Update, Delete)
   - Backend API Endpoints:
     - `/api/hosts` (GET): Get a list of all hosts
     - `/api/hosts/:id` (GET): Get a specific host by ID
     - `/api/hosts` (POST): Create a new host
     - `/api/hosts/:id` (PUT): Update a specific host by ID
     - `/api/hosts/:id` (DELETE): Delete a specific host by ID

3. Page Name: Property Management
   - Functionality:
     - CRUD operations for Properties (Create, Read, Update, Delete)
   - Backend API Endpoints:
     - `/api/properties` (GET): Get a list of all properties
     - `/api/properties/:id` (GET): Get a specific property by ID
     - `/api/properties` (POST): Create a new property
     - `/api/properties/:id` (PUT): Update a specific property by ID
     - `/api/properties/:id` (DELETE): Delete a specific property by ID

4. Page Name: Guest Profile Management
   - Functionality:
     - CRUD operations for Guest profiles (Create, Read, Update, Delete)
   - Backend API Endpoints:
     - `/api/guests` (GET): Get a list of all guests
     - `/api/guests/:id` (GET): Get a specific guest by ID
     - `/api/guests` (POST): Create a new guest
     - `/api/guests/:id` (PUT): Update a specific guest by ID
     - `/api/guests/:id` (DELETE): Delete a specific guest by ID

5. Page Name: Property Listing and Search
   - Functionality:
     - Display a list of properties with search and filter options (by location, property type, and host)
   - Backend API Endpoint:
     - `/api/properties` (GET): Get a list of properties with optional query parameters for filtering (e.g., `?location=xyz`, `?property_type=abc`, etc.)

**Stage 3: Booking Management**

6. Page Name: Booking Management
   - Functionality:
     - Display and manage bookings for guests and properties (Create, Read, Update, Delete)
   - Backend API Endpoints:
     - `/api/bookings` (GET): Get a list of all bookings
     - `/api/bookings/:id` (GET): Get a specific booking by ID
     - `/api/bookings` (POST): Create a new booking
     - `/api/bookings/:id` (PUT): Update a specific booking by ID
     - `/api/bookings/:id` (DELETE): Delete a specific booking by ID
