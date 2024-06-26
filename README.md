
### Frontend README

```markdown
# Article Management Frontend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Docker Setup](#docker-setup)

## Introduction

This is the frontend service for the Article Management application. It provides a user interface for managing articles and user authentication.

## Features

- User authentication (signup, login)
- Article CRUD operations
- Responsive design
- Form validation using Formik and Yup
- Image upload with preview and size validation

## Technologies

- React
- Redux
- TypeScript
- Axios
- Formik
- Yup
- VITE

## Prerequisites

- Node.js (v14 or higher)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/article-management-frontend.git
   cd article-management-frontend

## : Running the Application
 1. To start the application, run:
    ```npm run dev

## : Folder Structure
dist/
public/
node_modules/
src/
|-- assets
|-- components/
|-- constants/
|-- context
|-- pages/
|-- redux/
|-- Routes/
|-- services/
|-- App.tsx
|-- main.tsx

## : Docker Setup
docker build -t article-management-frontend .
docker run -p 5173:5173 article-management-frontend
