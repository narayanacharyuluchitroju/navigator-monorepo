# NavApp Monorepo

# 📌 Project Name: Navigator

## 🗺️ Overview
Navigator is a full-stack location management application built with:

- ⚙️ Spring Boot (Backend)
- ⚛️ React.js (Frontend)
- 🛢️ MongoDB (Database)
- 🐳 Docker & GitHub Actions (CI/CD)

It allows users to register, log in, add their locations via map click or geolocation, and view them interactively on a map.

---

## 🚀 Features

- 🔐 Secure login and registration
- 📍 Click on map or use current location
- 📝 Save, locate, and delete location entries
- 🗺️ Interactive map with markers
- ⚡ CI/CD enabled with Docker & GitHub Actions

---

## 🖼️ Screenshots

### 🔐 Login Page
![Login](assets/login.png)

### 📝 Register Page
![Register](assets/register.png)

### 📊 Dashboard
![Dashboard](assets/dashboard.png)

---

## 📁 Folder Structure

```
navigator-monorepo/
│
├── Navigator/              # Spring Boot Backend
├── navapp-frontend/        # React Frontend
├── docker-compose.yml      # For local multi-container setup
└── .github/workflows/      # GitHub Actions CI/CD config
```

---

## 🐳 Docker Setup

```bash
# Start all services
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

## 🔧 Environment Variables

### Backend (`Navigator/src/main/resources/application.properties`)
```properties
spring.data.mongodb.uri=${MONGO_URI}
spring.data.mongodb.database=${MONGO_DB}
server.port=${SERVER_PORT}
```

### Frontend (`.env`)
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

---

## 🔄 CI/CD Pipeline

GitHub Actions builds both frontend and backend, pushes Docker images to Docker Hub on every push to `main` branch.

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests!

---

## 📜 License

MIT License

