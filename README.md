# LeadFlow – Lead Management System

A full-stack Lead Management application developed as part of the Full Stack Developer Screening Assignment for Meru Technosoft Pvt. Ltd.

LeadFlow provides a simple dashboard for capturing, managing, searching, and tracking sales leads.

## Features

- **Add Leads:** Create leads with name, email, phone, company, source, and status.
- **View Leads:** Display all leads in an organized table.
- **Edit Leads:** Update lead information and lead status.
- **Delete Leads:** Delete leads with a confirmation step.
- **Search Leads:** Search leads by name.
- **Filter Leads:** Filter leads by status.
- **Dashboard Statistics:** Display total leads and counts for different statuses.
- **Input Validation:** Validate required fields and email addresses on the frontend and backend.
- **Database Integration:** Store lead information in MongoDB Atlas.

## Technology Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- Mongoose
- Express Validator
- CORS
- dotenv

### Database
- MongoDB Atlas

## Project Structure

```text
leadflow/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── LeadTable.jsx
│   │   │   └── LeadForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── leadController.js
│   │   ├── middleware/
│   │   │   └── validateRequest.js
│   │   ├── models/
│   │   │   └── Lead.js
│   │   ├── routes/
│   │   │   └── leadRoutes.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or MongoDB connection string
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd leadflow
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file by copying the example file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Configure the `server/.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Replace the MongoDB placeholder with your own MongoDB connection string.

Start the backend development server:

```bash
npm run dev
```

Backend URL:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal and navigate to the client directory:

```bash
cd client
npm install
```

Create the frontend environment file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Configure `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Open the application in your browser:

`http://localhost:5173`

## API Documentation

Base URL:

`http://localhost:5000/api`

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check server and database health |
| POST | `/leads` | Create a new lead |
| GET | `/leads` | Retrieve all leads |
| GET | `/leads/:id` | Retrieve a lead by ID |
| PUT | `/leads/:id` | Update an existing lead |
| DELETE | `/leads/:id` | Delete a lead |

### Search and Filtering

Search leads by name:

```http
GET /api/leads?search=Priya
```

Filter leads by status:

```http
GET /api/leads?status=New
```

Supported statuses:

- New
- Contacted
- Qualified
- Lost

## Database Design

The application uses MongoDB Atlas with Mongoose for database management.

Each lead document contains the following fields:

| Field | Type | Description |
|---|---|---|
| name | String | Lead's full name |
| email | String | Lead's email address |
| phone | String | Contact number |
| company | String | Company name |
| source | String | Lead acquisition source |
| status | String | Current lead status |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Last update timestamp |

### Supported Lead Sources

- Website
- LinkedIn
- Referral
- Cold Call
- Email Campaign
- Social Media
- Other

The Mongoose schema includes field validation, timestamps, and indexes for name and status/date queries.

## Validation and Error Handling

- Required fields are validated on the frontend and backend.
- Email addresses are validated.
- Lead status and source values are restricted to supported options.
- Invalid requests return appropriate validation errors.
- Invalid IDs and missing records are handled by the backend.
- Database connection errors are reported by the server.

## Assumptions

- A lead must contain a name, email, phone number, and company.
- Each lead has one source and one status.
- New leads receive the default status `New`.
- The application is designed as a single-user lead management system without authentication.
- MongoDB Atlas is used as the database.

## Future Improvements

With additional development time, the application could be extended with:

- User authentication and role-based access.
- Pagination and sorting.
- Automated API testing.
- Cloud deployment with a live demo.
- Additional analytics and lead performance reports.

## What I Am Proud Of

I built LeadFlow as a complete MERN stack application, connecting a React dashboard with REST APIs and MongoDB Atlas.

One interesting challenge was implementing the complete lead management workflow, including backend validation, search, filtering, and status updates, while keeping the application simple and easy to use.

---

**Developed as part of the Full Stack Developer Screening Assignment – Meru Technosoft Pvt. Ltd.**
