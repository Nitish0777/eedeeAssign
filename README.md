# Backend Setup with Node.js and MySQL

This repository contains the backend setup for a Node.js server using MySQL database. It includes database schema for user authentication and tracking blue triangles clicked by users.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MySQL Server

## Setup

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Nitish0777/eedeeAssign.git
    ```

2. Navigate to the project directory:

    ```bash
    cd folder Name
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up MySQL database:

    - Create a new database (e.g., `blue_triangles_db`) in your MySQL server.
    - Run the SQL scripts provided in `database/schema.sql` to create the necessary tables.

5. Configure database connection:

    - Modify the database connection details in `config.js` file to match your MySQL server configuration.

## Database Schema

The database schema consists of the following tables:

1. **User**: Stores user information including username and password.
2. **BlueTriangles**: Tracks blue triangles clicked by users.

## Running the Server

To start the Node.js server, run the following command:

```bash
npm start
