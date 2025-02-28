# My Slate App

This project is a rich text editor built with Vite and Slate.js, along with a backend server (`server.js`) to handle API requests.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/my-slate-app.git
cd my-slate-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Backend Server

The `server.js` file serves API requests (e.g., fetching text data). Ensure the backend is running before launching the frontend.

```sh
node server.js
```

If you need to install Express (or other dependencies), run:
```sh
npm install express cors node-fetch
```

### 4. Start the Vite Development Server

In a separate terminal, run:
```sh
npm run dev
```
This will start the Vite development server, and you can access the app at:
```
http://localhost:5173
```

## Notes
- Ensure the backend (`server.js`) is properly configured to handle CORS if you're fetching data from an external source.
- Modify `server.js` if necessary to serve API requests correctly.

## Building for Production
To build the app for production, run:
```sh
npm run build
```
This will create an optimized build in the `dist/` directory.

---
Enjoy editing with **My Slate App**! 🎉

