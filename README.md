# SpartanDash

## Prerequisites

Before running the project, install the following on your computer:

- Git
- Node.js (required for the backend)
- npm (included with Node.js)

Verify installation:

```bash
git --version
node -v
npm -v
```

## Clone the Repository

```bash
git clone https://github.com/madi6116/SpartanDash.git
cd SpartanDash
```

## Install Dependencies

### Install root dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Install frontend dependencies

Open a new terminal or navigate back to the project root manually, then run:

```bash
cd SpartanDash/frontend
npm install
```

## Building the Project

### Build the Backend

The backend requires Node.js to be installed on the system.  
Build the backend by running:

```bash
cd backend
npm run build
```

(If your backend uses a different build script, replace the command accordingly.)

### Build the Frontend

```bash
cd frontend
npm run build
```

The output will be placed in the build folder defined by the frontend configuration.

## Running the Project

### Run the Backend

Start the backend server with Node:

```bash
cd backend
node app.js
```

Keep this terminal open.

### Run the Frontend

Open a second terminal and navigate to the frontend folder:

```bash
cd SpartanDash/frontend
npm start
```

The frontend will start at the address shown in the terminal.

## Project Structure

```
SpartanDash/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   └── backend source files
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── build output after running build
├── package.json
├── package-lock.json
└── README.md
```
