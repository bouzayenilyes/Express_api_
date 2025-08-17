# Express.js CRUD API

A RESTful API built with Express.js and MySQL that provides CRUD operations for Users and Products with Swagger documentation.

## Features

- **User Management**: Complete CRUD operations for users
- **Product Management**: Complete CRUD operations for products
- **Swagger Documentation**: Interactive API documentation
- **MySQL Integration**: Persistent data storage
- **Concurrent Servers**: Runs multiple APIs simultaneously
- **Auto-reload**: Development server with nodemon

## Tech Stack

- **Backend**: Express.js 5.1.0
- **Database**: MySQL 2.18.1
- **Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Development**: Nodemon for auto-reload

## Project Structure

```
express_js_api/
├── index.js          # Main entry point (runs user API)
├── user.js           # User CRUD API (port 3000)
├── product.js        # Product CRUD API (port 3001)
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Database Setup

### 1. Create Databases

```sql
-- Create users database
CREATE DATABASE crud_example;
USE crud_example;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Create products database
CREATE DATABASE products;
USE products;

CREATE TABLE prodcucts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);
```

### 2. Update Database Configuration

Update the database connection settings in both `user.js` and `product.js`:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "your_username", // Update with your MySQL username
  password: "your_password", // Update with your MySQL password
  database: "database_name",
});
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd express_js_api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### User API (Port 3000)

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Get all users     |
| POST   | `/users`     | Create a new user |
| PUT    | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

### Product API (Port 3001)

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/products`     | Get all products     |
| POST   | `/products`     | Create a new product |
| PUT    | `/products/:id` | Update product by ID |
| DELETE | `/products/:id` | Delete product by ID |

## API Documentation

Interactive Swagger documentation is available at:

- **User API Docs**: http://localhost:3000/api-docs

## Usage Examples

### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Get All Users

```bash
curl http://localhost:3000/users
```

### Create a Product

```bash
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "price": 999.99}'
```

### Get All Products

```bash
curl http://localhost:3001/products
```

## Development

The project uses nodemon for automatic server restart during development. Both servers run concurrently:

- **User API**: http://localhost:3000
- **Product API**: http://localhost:3001

### Available Scripts

- `npm run dev` - Start both servers in development mode with auto-reload

## Server Architecture

The application runs two separate Express servers:

1. **index.js** - Manages the User API with Swagger documentation
2. **product.js** - Handles Product CRUD operations

Both servers run simultaneously using the `&` operator in the npm script.

## Error Handling

The API includes basic error handling for:

- Database connection errors
- Invalid request data
- Resource not found (404)
- Server errors (500)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC License

## Notes

- Make sure MySQL server is running before starting the application
- Update database credentials in both `user.js` and `product.js`
- The product table name has a typo (`prodcucts` instead of `products`) - consider fixing this in production
