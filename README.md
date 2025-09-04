# 📚 Scientific Publications

A full-stack application to manage and explore academic publications.  
It provides a **Node.js backend** and an **Angular frontend**, allowing users to view, search, and filter publications.

---

## 🛠️ Features

**Backend (Node.js / Express):**
- Serve publications stored in a JSON file.
- Retrieve all publications, filter by year, search by keyword.
- View individual publication details.
- Swagger UI integration for API documentation.

**Frontend (Angular):**
- Display a list of publications with search and filter options.
- View detailed information for each publication.
- Navigate easily between the publications list and details page.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- Angular CLI

### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/momo2024code/Scientific-Publications.git
cd Scientific-Publications/AcademicHub-backend
Install dependencies:

bash
Copy code
npm install
Start the backend server:

bash
Copy code
npm start
The backend runs at http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../AcademicHub-Frontend
Install dependencies:

bash
Copy code
npm install
Start the Angular application:

bash
Copy code
ng serve
The frontend runs at http://localhost:4200.

📄 API Endpoints
Method	Endpoint	Description
GET	/api/publications	Retrieve all publications
POST	/api/publications	Add a new publication
GET	/api/publications/year/{year}	Filter publications by year
GET	/api/publications/search/{term}	Search publications by keyword
GET	/api/publications/{citationKey}	Retrieve a publication by citationKey

API documentation is available via Swagger UI at http://localhost:5000/api-docs.

🧪 Testing
If you add tests for the backend:

bash
Copy code
npm test
📦 Docker Setup (Optional)
Build Docker images:

bash
Copy code
docker-compose build
Start services:

bash
Copy code
docker-compose up
Backend: http://localhost:5000

Frontend: http://localhost:4200

📄 License
This project is licensed under the MIT License - see the LICENSE file.
