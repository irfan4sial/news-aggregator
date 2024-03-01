# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

To run this project, follow these steps:

1. Clone the repository:

### `git clone <repository-url>`

2. Navigate to the project directory:

### `cd news-aggregator`

3. Install dependencies:

### `npm install`

4. Build the Docker for single container:

### `docker build -t news-aggregator .`

5. Run the Docker container:

### `docker run -p 8080:80 news-aggregator`

6. Open your browser and navigate to http://localhost:8080 to view the application.

### `Optional Case for multiple container like Client & Backend`

7. Build the Docker for multiple container:

Run the Docker for multi container:

### `docker-compose up --build`

8. Open your browser and navigate to http://localhost:8080 to view the application.
