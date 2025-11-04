# EduTutor Pro - Course Registration System

A modern web application for student course registration built with React and Express.

## Features

- Student information management
- Course browsing and selection by major
- Real-time course registration
- Duplicate course detection
- Responsive design
- Session persistence on page refresh

## Tech Stack

**Frontend:**

- React 18
- React Router
- Vite
- Lucide Icons

**Backend:**

- Node.js
- Express.js
- CORS

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/ByteObed/edututor-pro.git
cd edututor-pro
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backend
npm install
cd ..
```

## Running the Application

### Development Mode

1. **Start the backend server**

```bash
cd backend
npm start
```

Backend runs on: `http://localhost:5000`

2. **Start the frontend (in a new terminal)**

```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
edututor-pro/
├── backend/
│   ├── Data-info/
│   │   ├── courses-data.js
│   │   └── students.json
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   │   └── Header/
│   ├── pages/
│   │   ├── CourseSelectionPage.jsx
│   │   ├── CourseCard.jsx
│   │   ├── SelectedCoursesPanel.jsx
│   │   └── StudentInfoPage.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
├── public/
│   ├── favicon.png
│   └── _redirects
└── package.json
```

## 🌐 Deployment

### Netlify Deployment

1. Push code to GitHub
2. Connect your repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. The `_redirects` file handles client-side routing

### Backend Deployment

Deploy the backend separately to:
Push code to GitHub
Connect your repository to Render
Build command: `npm run build`
Publish directory: `dist`

Update the API URL in `src/services/api.js`

## Configuration

### API Endpoints

Update backend URL in `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

### CORS Configuration

Backend accepts requests from:

- `http://localhost:3000` (development)
- Your production domain

## Available Majors

- Computer Science
- Engineering
- Business
- Mathematics
- Biology

## 🐛 Known Issues

- Payment integration is planned (currently in demo mode)
- Course capacity limits not yet implemented

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Your Name

- GitHub: [@ByteObed](https://github.com/yourusername)
- Email: obedafatsaw@gmail.com

## Acknowledgments

- Vite for the build tool
- React team for the framework
- Lucide for the iconss
