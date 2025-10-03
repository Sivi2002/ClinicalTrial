# Clinical Trial Analytics Dashboard

This project is a full-stack analytics dashboard built with **Node.js + Express**, **MongoDB (Atlas)**, **React + Redux Toolkit**, and **Recharts**.  
It loads a dataset of clinical trials and shows key insights:

-  Number of trial facilities per country  
-  Participant demographics (sex & age buckets)  
-  Top cities with the most clinical trial facilities  

---

## Tech Stack
- **Backend:** Node.js, Express, Mongoose  
- **Database:** MongoDB Atlas (cloud)  
- **Frontend:** React, Redux Toolkit, Recharts  
- **Other:** Axios, CORS, dotenv

// Using MongoDB Atlas for a centralized cloud database so we don't have to run a local DB on every machine for testing.
// Since Atlas is used, there's no need to change the MONGO_URI in the environment variables.

---

# Clinical Trial Analytics Dashboard — Setup Instructions

## 1. Clone the project
```bash
git clone https://github.com/Sivi2002/ClinicalTrial.git
cd siro_test

cd backend
npm install
npm run dev

# Expected logs
MongoDB connected
Server listening on port 5000

#Test endpoints
curl http://localhost:5000/api/analytics/locations
curl http://localhost:5000/api/analytics/trials-per-city
curl http://localhost:5000/api/analytics/demographics


# Frontend setup
cd ../frontend
npm install
npm start
