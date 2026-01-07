# HealthConnect Frontend

A premium, modern healthcare platform connecting patients with providers.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
- `/src/app`: Application routes and pages (Patient, Doctor, Admin dashboards).
- `/src/components`: Reusable UI components (Button, Navbar, Sidebar, Hero).
- `/src/context`: Global state management (`AuthContext`).
- `/src/services`: API abstraction layer for backend communication.
- `/src/types`: Centralized TypeScript definitions.

## Key Features
- **Patient Dashboard**: Stats, appointment history, and health tips.
- **Consultation Chat**: Secure messaging interface for medical advice.
- **Doctor Dashboard**: Patient management, schedule tracking, and profile settings.
- **Admin Center**: Platform-wide user management and doctor verification.
- **Health Blog**: CMS-managed educational content.

## Setup & Running
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Backend Configuration
Ensure the backend server is running on `http://localhost:5000` or update the `API_BASE_URL` in `src/lib/api.ts`.
