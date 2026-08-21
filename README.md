MIC
A web application built with React, TypeScript, and Supabase.

🚀 Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18+ recommended)

npm or yarn

A Supabase project

Installation
Clone the repository:

Bash
git clone https://github.com/zennstrom/mic.git
cd mic
Install dependencies:

Bash
npm install
# or
yarn install
Configure Environment Variables:
Create a .env file in the root directory (based on .env.example if available) and add your Supabase credentials:

Code snippet
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the development server:

Bash
npm run dev
🛠 Tech Stack
Frontend: React, TypeScript, Vite

Backend/Database: Supabase

Routing: React Router (via App.tsx)

📦 Features
Supabase Integration: Secure database connectivity and authentication via supabaseClient.ts.

Type-Safe Development: Built with TypeScript for better code reliability.

Modern Build Tooling: Optimized build process using Vite.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
