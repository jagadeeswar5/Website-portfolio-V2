# Local Setup Instructions

This is a full-stack portfolio website with a Python FastAPI backend and React frontend.

## Prerequisites

1. **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
2. **Node.js 16+ and npm** - [Download Node.js](https://nodejs.org/)
3. **MongoDB** - You'll need MongoDB running locally or a MongoDB connection string

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example and update with your MongoDB URL)
# Copy backend/.env.example to backend/.env
# Edit backend/.env and set your MONGO_URL

# Run the server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The backend will run on `http://localhost:8000`

**Note:** If you don't have MongoDB installed locally, you can:
- Use MongoDB Atlas (free cloud MongoDB): https://www.mongodb.com/cloud/atlas
- Install MongoDB locally: https://www.mongodb.com/try/download/community

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# OR if you prefer yarn (as specified in package.json):
yarn install

# Create .env file
# Copy frontend/.env.example to frontend/.env
# The default should work if backend is on port 8000

# Start the development server
npm start
# OR
yarn start
```

The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env in backend/ folder)
- `MONGO_URL`: MongoDB connection string (e.g., `mongodb://localhost:27017` or MongoDB Atlas URI)
- `DB_NAME`: Database name (default: `portfolio_db`)
- `CORS_ORIGINS`: Allowed CORS origins (default: `http://localhost:3000`)

### Frontend (.env in frontend/ folder)
- `REACT_APP_BACKEND_URL`: Backend API URL (default: `http://localhost:8000`)

## Running Both Servers

You'll need to run both servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## Troubleshooting

1. **Port already in use**: If port 3000 or 8000 is already in use, you can change the ports in the commands above
2. **MongoDB connection error**: Make sure MongoDB is running locally or your MongoDB Atlas connection string is correct
3. **Module not found**: Make sure you've installed all dependencies for both backend and frontend
4. **CORS errors**: Make sure the `REACT_APP_BACKEND_URL` in frontend/.env matches the backend URL

## API Endpoints

The backend provides these endpoints:
- `GET /api/` - Hello World
- `POST /api/status` - Create status check
- `GET /api/status` - Get all status checks

## Testing

After both servers are running:
1. Open `http://localhost:3000` in your browser
2. You should see the portfolio website
3. Check the browser console for any errors
4. Check backend terminal for API requests

