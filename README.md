Gen UI - AI Component Generator

Gen UI is a web application built with React, Vite, and Tailwind CSS that leverages the Google Gemini AI model to generate UI component code based on user descriptions. Select your desired framework, describe the component, and let the AI build it for you!

Overview

This application allows users to quickly scaffold UI components by providing a natural language prompt. It's designed to speed up frontend development by generating code snippets for various frameworks.

Features

AI-Powered Code Generation: Uses the Google Gemini model to understand prompts and generate relevant UI code.

Framework Selection: Supports generating code for:

HTML + CSS

HTML + Tailwind CSS

HTML + Bootstrap

HTML + CSS + JS

HTML + Tailwind + Bootstrap

Live Preview & Code Editor: View the generated code and a live preview side-by-side (using Monaco Editor for code display).

Code Management:

Copy generated code to the clipboard.

Download the generated code as an HTML file.

Open the preview in a separate full-screen view.

Dark/Light Mode: Includes a theme toggle for user preference, saved to local storage.

Responsive Design: Built with Tailwind CSS for adaptability across different screen sizes.

User Feedback: Uses react-toastify for notifications (e.g., code copied, file downloaded).

Tech Stack

Frontend: React, Vite, Tailwind CSS

UI Components: react-select, react-spinners, @monaco-editor/react (code display)

AI Model: Google Gemini (via REST API)

Routing: react-router-dom

Notifications: react-toastify

Running the Project Locally

Clone the repository:

git clone <your-repository-url>
cd ai-comp-gen 


(Replace <your-repository-url> with the actual URL from GitHub)

Install dependencies:
Make sure you have Node.js and npm installed.

npm install


Set up Gemini API Key:

The project currently has the API key hardcoded in src/pages/Home.jsx. This is not secure for a public repository.

Recommendation: For local development, you could replace the hardcoded key or preferably use environment variables (e.g., using Vite's import.meta.env). You would create a .env file in the project root:

VITE_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY


And update the Home.jsx file to use import.meta.env.VITE_GEMINI_API_KEY instead of the hardcoded string. Remember to add .env to your .gitignore file.

Run the development server:

npm run dev


Open your browser to the local address provided (usually http://localhost:5173).

Available Scripts

npm run dev: Starts the development server.

npm run build: Builds the application for production.

npm run lint: Lints the project files.

npm run preview: Serves the production build locally for previewing.
