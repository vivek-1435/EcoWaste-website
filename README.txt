
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
Currently, the system uses an email-based role assignment.

How to get Admin Access:
1. Go to the Sign Up page.
2. Sign up with the email: admin@ecowaste.com
3. Set ANY password you want (e.g., admin123).
4. The system automatically detects this email and grants Admin privileges.

5. HOW TO CHANGE / ADD / REMOVE ADMINS
------------------------------------------------------------------------------
If you want to change who is an admin, you need to edit the backend code.

File Location: 
backend/controllers/authController.js

Step-by-Step Guide:

1. Open `backend/controllers/authController.js` in your code editor.
2. Search for the `register` function (around line 27).
3. Find the line that looks like this:
   const role = email === 'admin@ecowaste.com' ? 'admin' : 'user';

------------------------------------------------------------------------------
To CHANGE the admin email:
   Replace 'admin@ecowaste.com' with your desired email.
   
   Example:
   const role = email === 'myemail@gmail.com' ? 'admin' : 'user';

------------------------------------------------------------------------------
To ADD MULTIPLE admins:
   Change the logic to check against a list of emails.

   Example:
   const adminEmails = ['admin@ecowaste.com', 'manager@ecowaste.com', 'boss@gmail.com'];
   const role = adminEmails.includes(email) ? 'admin' : 'user';

------------------------------------------------------------------------------
To REMOVE an admin:
   Simply remove their email from the list or change the email back to the original one.
   If a user has already registered as an admin, changing the code won't strip their 
   role immediately unless you also update their document in the database (MongoDB).
   However, new signups will follow the new rule.

6. TECHNOLOGIES USED
------------------------------------------------------------------------------
Frontend: React.js, Tailwind CSS, Lucide React (Icons), Axios
Backend: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Multer
MongoDB Connection URI: mongodb://localhost:27017/ecowaste (Local Database)
State Management: React Context API (AuthContext)
==============================================================================
