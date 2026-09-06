# NutriVa

A full-stack health and nutrition management platform with AI-powered features. Track meals, get personalized diet plans, and receive health consultations all in one place.

## What is NutriVa?

NutriVa helps you manage your health and nutrition more effectively. Whether you want to track your daily meals, get personalized diet recommendations, or receive health advice from an AI consultant, we've got you covered. The platform is built with modern technologies and designed to be intuitive and easy to use.

## Features

- **AI Coach** - Get nutrition guidance and diet tips powered by AI
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
cp .env.sample .env
```

Update your `.env` file with:

```env
MONGO_URL=mongodb://localhost:27017
DATABASE=nutriva
PORT=3000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

JWT_SECRET=your_secret_here
JWT_EXPIRE=24h
COOKIE_EXPIRE=24

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Defaults to the hosted service; point at http://127.0.0.1:11434 for a local Ollama
OLLAMA_HOST=https://ollama.com
OLLAMA_API_KEY=your_api_key_here
OLLAMA_MODEL=gpt-oss:120b
OLLAMA_CHAT_MODEL=gpt-oss:120b
```

Then start the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.sample .env
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

All protected routes accept the JWT either from the `token` httpOnly cookie or
an `Authorization: Bearer <token>` header.

**Authentication** — `/api/auth`

```
POST   /api/auth/signup                  - Create new account
POST   /api/auth/login                   - Login user
GET    /api/auth/me                      - Current authenticated user
POST   /api/auth/logout                  - Logout (clears cookie)
POST   /api/auth/forgot-password         - Request a reset link
POST   /api/auth/reset-password/:token   - Set a new password
```

**User account** — `/api/user`

```
GET    /api/user/me                      - Get basic user info
PUT    /api/user/me                      - Update basic user info
PUT    /api/user/change-password         - Change password
```

**Profile** — `/api/profile`

```
GET    /api/profile                      - Get profile + nutrition targets
POST   /api/profile/complete             - Create profile
PUT    /api/profile                      - Update profile
DELETE /api/profile                      - Delete profile
```

**Meal Plans** — `/api/ai-meal-plans`

```
POST   /api/ai-meal-plans                - Generate a meal plan
GET    /api/ai-meal-plans                - List the user's plans
GET    /api/ai-meal-plans/latest         - Most recent plan
GET    /api/ai-meal-plans/days/:day      - A day from the latest plan
GET    /api/ai-meal-plans/:id            - Get one plan
GET    /api/ai-meal-plans/:id/day/:day   - A day from a specific plan
DELETE /api/ai-meal-plans/:id            - Delete a plan
```

**Diet Tracking** — `/api/diet-trackers`

```
POST   /api/diet-trackers/:mealPlanId              - Start tracking a plan
GET    /api/diet-trackers                          - List trackers (paginated)
GET    /api/diet-trackers/active                   - Active tracker
GET    /api/diet-trackers/day/:day                 - One day of the tracker
POST   /api/diet-trackers/day/:day/meals/:id/eat   - Mark a meal eaten
POST   /api/diet-trackers/day/:day/meals/:id/undo  - Undo a meal
```

**AI Coach** — `/api/ai-doctor`

```
POST   /api/ai-doctor/chat               - Ask a nutrition question
POST   /api/ai-doctor/chat/stream        - Same, streamed over SSE
```

> The feature is named **AI Coach**. The route paths still read `ai-doctor`
> from an earlier working title and are listed here as they actually are.
> See `doc/` for the planned rename.

### Rate limits

| Endpoint group | Limit |
| --- | --- |
| Login / signup / change-password | 10 per 15 min (failed attempts only) |
| Forgot / reset password | 5 per hour |
| AI Coach chat | 30 per hour, per user |
| Meal plan generation | 10 per hour, per user |
| Everything else | 300 per 15 min |

## Development

### Linting and Formatting

```bash
# Frontend: lint and format
cd frontend && npm run lint
cd frontend && npm run format

# Backend: format (no linter configured)
cd backend && npm run format
```

### Building for Production

```bash
cd frontend
npm run build
```

Build output will be in the `dist/` folder.

## Security

- Passwords are hashed with bcryptjs
- JWT-based authentication over httpOnly cookies
- Security headers via helmet
- Rate limiting on auth, password-reset and AI endpoints
- Field whitelisting on profile and user updates
- Client-supplied AI chat history is sanitised before it reaches the model
- Input validation via express-validator
- CORS restricted to `FRONTEND_URL`
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
