# Project Overview

## 1. Vision & Goals

**Building a Better Digital Ecosystem for BKU**

This project aims to create a superior edition of the university website, engineered for **convenience, speed, and reliability**.

- **Capacity**: Designed to handle **50,000 - 70,000 users** simultaneously (Students, Lecturers, Officers, Admins).
- **Mobile-First**: Optimized for all devices, ensuring a seamless experience on mobile.
- **Holistic Ecosystem**: Moving beyond just a student portal, this platform integrates workflows for all university roles.

## 2. Ecosystem Roles

The platform facilitates distinct workflows for four key user groups:

- **Students** (Current Focus): Managing academic usage, tracking progress, and accessing student services.
- **Lecturers**: Posting lectures, managing course materials, and checking attendance.
- **Officers**: Organizing classes, scheduling time tables, and managing academic administration.
- **Admins**: Managing features, analyzing system data, and overseeing the ecosystem.

## 3. Technology Stack & Structure

The project leverages a modern, high-performance stack:

| Component             | Tech                      | Reference                    |
| --------------------- | ------------------------- | ---------------------------- |
| **Frontend**          | **Next.js 15** (React 19) | `frontend/package.json`      |
| **Backend**           | **FastAPI** (Python)      | `backend/requirements.txt`   |
| **Local Environment** | **Docker**                | `docker-compose.yml`         |
| **Database**          | **PostgreSQL**            | (Inferred from dependencies) |

**Structure Highlights:**

- **Monorepo**: Unified codebase for Frontend and Backend.
- **Frontend**: Located in `frontend/`, focusing on dynamic, responsive UI for students and staff.
- **Backend**: Located in `backend/`, providing a robust asynchronous API.
