# FutureLift Job Portal

A fully functional job portal website with responsive design, built using modern technologies for an optimal user experience.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary

## Features

- Responsive design that works on all devices
- User authentication and authorization with JWT
- Different dashboards for job seekers and employers
- Job search with filtering options
- Job posting and application system
- Company profiles
- Job seeker profiles with resume upload
- Application tracking system
- Todo list for job seekers to manage their job search

## Setup Instructions

### Prerequisites

- Node.js (v14.x or above)
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd futurelift-job-portal
   ```

2. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   NODE_ENV=development
   PORT=5001
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Deploying to GitHub

1. Initialize a Git repository (if not already done):
   ```
   git init
   ```

2. Add all files to staging:
   ```
   git add .
   ```

3. Commit your changes:
   ```
   git commit -m "Initial commit"
   ```

4. Create a new repository on GitHub (https://github.com/new)

5. Link your local repository to GitHub:
   ```
   git remote add origin https://github.com/yourusername/futurelift-job-portal.git
   ```

6. Push your code to GitHub:
   ```
   git push -u origin main
   ```

## Project Structure

```
futurelift-job-portal/
├── backend/                 # Backend Express.js server
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   └── server.js            # Entry point
├── public/                  # Static files
├── src/                     # React frontend
│   ├── components/          # Reusable components
│   │   ├── auth/            # Authentication components
│   │   ├── common/          # Common UI components
│   │   ├── jobs/            # Job-related components
│   │   └── layout/          # Layout components
│   ├── pages/               # Page components
│   ├── context/             # React context (state management)
│   ├── api/                 # API service functions
│   ├── assets/              # Static assets
│   ├── App.js               # Main App component
│   └── index.js             # React entry point
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth` - Get authenticated user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a single job
- `POST /api/jobs` - Create a job (employers only)
- `PUT /api/jobs/:id` - Update a job (job owner only)
- `DELETE /api/jobs/:id` - Delete a job (job owner only)
- `POST /api/jobs/apply/:id` - Apply for a job (job seekers only)

### Profiles
- `GET /api/profiles/me` - Get current user's profile
- `POST /api/profiles` - Create/update profile
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/user/:user_id` - Get profile by user ID

### Companies
- `POST /api/companies` - Create/update a company (employers only)
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get a company by ID
- `DELETE /api/companies` - Delete company and user

## License

This project is licensed under the MIT License.

## Contributors

- HIT Students Team
