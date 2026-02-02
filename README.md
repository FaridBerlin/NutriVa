# NutriVa

A full-stack health and nutrition management platform with AI-powered features. Track meals, get personalized diet plans, and receive health consultations all in one place.

## What is NutriVa?

NutriVa helps you manage your health and nutrition more effectively. Whether you want to track your daily meals, get personalized diet recommendations, or receive health advice from an AI consultant, we've got you covered. The platform is built with modern technologies and designed to be intuitive and easy to use.

## Features

- **AI Health Advisor** - Get health tips and nutrition advice powered by AI
- **Meal Planning** - Create personalized meal plans based on your goals
- **Diet Tracking** - Log your meals, track calories, and monitor nutrition
- **User Profiles** - Manage your health goals and track your progress
- **Secure Accounts** - Your data is protected with JWT authentication and encryption
- **Responsive Design** - Works great on desktop and mobile with dark mode support

## Tech Stack

**Backend**

- Node.js & Express
- MongoDB with Mongoose
- Ollama for AI
- JWT for authentication
- Nodemailer for emails

**Frontend**

- React 19
- Vite
- Tailwind CSS
- React Router
- Recharts for charts
- Framer Motion for animations
- Axios for API calls

## Requirements

- Node.js 18+
- MongoDB 6+
- Ollama (for AI features)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Anas-Shanan/NutriVa.git
cd NutriVa
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Update your `.env` file with:

```env
MONGODB_URI=mongodb://localhost:27017/nutriva
JWT_SECRET=your_secret_here
PORT=5000
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
OLLAMA_API_URL=http://localhost:11434
NODE_ENV=development
```

Then start the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
NutriVa/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # AI and utility services
│   ├── middleware/      # Auth and validation
│   ├── utils/           # Helper functions
│   ├── data/            # Meal and food data
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/  # React components
        ├── pages/       # Page components
        ├── context/     # State management
        ├── api/         # API calls
        ├── utils/       # Helpers
        └── assets/      # Images and fonts
```

## API Endpoints

**Authentication**

```
POST   /api/auth/signup         - Create new account
POST   /api/auth/login          - Login user
POST   /api/auth/logout         - Logout
POST   /api/auth/refresh        - Refresh token
```

**User Profile**

```
GET    /api/profile             - Get profile
PUT    /api/profile             - Update profile
```

**Diet Tracking**

```
GET    /api/diet-tracker        - Get logged meals
POST   /api/diet-tracker        - Add meal
DELETE /api/diet-tracker/:id    - Delete meal
```

**Meal Plans**

```
POST   /api/ai-meal-plan        - Create meal plan
GET    /api/ai-meal-plan        - Get meal plan
```

**AI Doctor**

```
POST   /api/ai-doctor           - Ask health question
GET    /api/ai-doctor/history   - Get chat history
```

## Development

### Linting and Formatting

```bash
# Check code style
npm run lint

# Fix formatting
npm run format
```

### Building for Production

```bash
cd frontend
npm run build
```

Build output will be in the `dist/` folder.

## Security

- Passwords are hashed with bcryptjs
- JWT-based authentication
- Input validation on all endpoints
- CORS protection
- Environment variables for sensitive data

## Issues & Feedback

Found a bug or have a suggestion? [Open an issue](https://github.com/Anas-Shanan/NutriVa/issues)

Please include:

- Steps to reproduce (if it's a bug)
- Expected behavior
- Actual behavior
- Your environment details

## License

This project is licensed under the ISC License - see [LICENSE](LICENSE) for details.

## Author

**Anas Shanan**

- GitHub: [@Anas-Shanan](https://github.com/Anas-Shanan)

## Roadmap

- Mobile app (iOS/Android)
- Integration with fitness apps
- Advanced nutrition analytics
- Multi-language support
- Challenge and rewards system
- Smart device integration

---

Made with care for your health ❤️
