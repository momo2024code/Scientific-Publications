📚 Scientific Publications

A full-stack application to manage and explore academic publications.
It provides a Node.js backend and an Angular 19 frontend, allowing users to view, search, and filter publications.

🛠️ Features

Backend (Node.js / Express / MySQL):

Stores publications in a MySQL database.

Retrieve all publications, filter by year, search by keyword.

View individual publication details.

Swagger UI integration for API documentation.

Migration script to create tables and insert initial data.

Frontend (Angular 19):

Display a list of publications with search and filter options.

View detailed information for each publication.

Smooth navigation between publication list and details.

🚀 Getting Started
Prerequisites

Node.js (v14+)

npm (v6+)

Angular CLI

Docker & Docker Compose

Backend Setup

Clone the repository:

git clone https://github.com/momo2024code/Scientific-Publications.git
cd Scientific-Publications/AcademicHub-backend


Install dependencies:

npm install


Start Docker containers (backend + MySQL):

docker-compose up -d --build


Run the migration to create tables and insert initial data:

docker compose run backend npm run migrate


Backend runs at: http://localhost:5000
Swagger documentation: http://localhost:5000/api-docs

Frontend Setup

Navigate to the frontend directory:

cd ../AcademicHub-Frontend


Install dependencies:

npm install


Start the Angular application:

ng serve


Frontend runs at: http://localhost:4200

📄 API Endpoints
Method	Endpoint	Description
GET	/api/publications	Retrieve all publications
POST	/api/publications	Add a new publication
GET	/api/publications/year/{year}	Filter publications by year
GET	/api/publications/search/{term}	Search publications by keyword
GET	/api/publications/{citationKey}	Retrieve a publication by citationKey
🧪 Testing

If you add tests for the backend:

npm test

📦 Docker Setup (Optional)

Build Docker images:

docker-compose build


Start services:

docker-compose up


Backend: http://localhost:5000

Frontend: http://localhost:4200

Run migration to populate initial data:

docker compose run backend npm run migrate

📄 License

This project is licensed under the MIT License – see the LICENSE file.
