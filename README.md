# Eventus

A modern event registration platform built with React and Django REST Framework. Eventus allows users to browse events, view event details, register for events, and manage their registrations through a clean and responsive interface.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Logout

### Event Management

* Browse Available Events
* View Event Details
* Register for Events
* Prevent Duplicate Registrations
* View My Registrations

### User Experience

* Responsive Design
* Search Events
* Event Status Badges
* User Profile Dropdown
* Dark Mode Support
* Theme Persistence

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Django
* Django REST Framework
* JWT Authentication (Simple JWT)
* Django CORS Headers

## Project Structure

```text
Eventus
├── backend
│   ├── registrations
│   ├── events
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

## Installation

### Backend Setup

```bash
cd backend

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## API Endpoints

### Authentication

* POST /api/register/
* POST /api/token/

### Events

* GET /api/events/
* GET /api/events/<id>/
* POST /api/events/<id>/register/

### Registrations

* GET /api/my-registrations/

## Screenshots

![Alt text](<Pasted image 20260616031104.png>)
![Alt text](<Pasted image 20260616031235.png>)
![Alt text](<Pasted image 20260616031357.png>)
![Alt text](<Pasted image 20260616031407.png>)
![Alt text](<Pasted image 20260616031414.png>)

## Live Demo

Frontend:
https://eventus-tau.vercel.app/

Backend:
https://eventus-grda.onrender.com/

## Future Improvements

* Event Categories
* Registration Deadlines
* Email Notifications
* QR Code Tickets
* Event Analytics Dashboard

## Author

Abhishek S
