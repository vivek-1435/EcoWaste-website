
==============================================================================
ECOWASTE - MODERN WASTE & FOOD EXCHANGE PLATFORM
==============================================================================

1. PROJECT OVERVIEW
------------------------------------------------------------------------------
EcoWaste is a MERN stack (MongoDB, Express, React, Node.js) web application designed 
to facilitate waste management and food exchange. It connects users with waste collectors 
and allows for easy tracking of earnings and environmental impact.

2. PROJECT STRUCTURE
------------------------------------------------------------------------------
The project is divided into two main folders:

- backend/           : Contains the Node.js/Express server code, API routes, and database models.
- ecowaste-app/      : Contains the React frontend code (UI).

3. HOW TO RUN THE PROJECT
------------------------------------------------------------------------------
You need to run both the backend and frontend servers simultaneously.

Terminal 1 (Backend):
  cd backend
  npm run dev

Terminal 2 (Frontend):
  cd ecowaste-app
  npm start

The application will be accessible at http://localhost:3000

4. ADMIN CREDENTIALS & ACCESS GUIDE
------------------------------------------------------------------------------
[MOVED TO LOCAL FILE: ADMIN_SECRETS.txt]
For security reasons, admin credentials and configuration instructions 
are not included in this public repository.

Please refer to `ADMIN_SECRETS.txt` in your local environment if available.

5. TECHNOLOGIES USED
------------------------------------------------------------------------------
Frontend: React.js, Tailwind CSS, Lucide React (Icons), Axios
Backend: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Multer
MongoDB Connection URI: mongodb://localhost:27017/ecowaste (Local Database)
State Management: React Context API (AuthContext)
==============================================================================
