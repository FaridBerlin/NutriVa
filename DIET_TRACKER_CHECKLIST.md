# Diet Tracker Pre-Launch Checklist ✅

## 🎯 Before Running the Application

### Backend Setup:

- [ ] MongoDB is running
- [ ] `.env` file exists with:
  - [ ] `MONGO_URI` (MongoDB connection string)
  - [ ] `JWT_SECRET` (for authentication)
  - [ ] `PORT` (optional, defaults to 3000)
  - [ ] `FRONTEND_URL` (optional, defaults to http://localhost:5173)
- [ ] Dependencies installed (`npm install` in backend/)
- [ ] No syntax errors in backend files

### Frontend Setup:

- [ ] `.env` file exists with:
  - [ ] `VITE_API_URL` or similar (API base URL)
- [ ] Dependencies installed (`npm install` in frontend/)
- [ ] No syntax errors in frontend files

---

## 🧪 Testing Checklist

### 1. Backend Tests:

```bash
cd backend

# Test 1: Start server
npm run dev
# ✅ Should see: "Server is listening on port: 3000"
# ✅ Should see: "MongoDB Connected Successfully"

# Test 2: Create tracker (after creating AI meal plan)
curl -X POST http://localhost:3000/api/diet-trackers/{MEAL_PLAN_ID} \
  -H "Authorization: Bearer YOUR_TOKEN"
# ✅ Should return new tracker with status 201

# Test 3: Get active tracker
curl -X GET http://localhost:3000/api/diet-trackers/active \
  -H "Authorization: Bearer YOUR_TOKEN"
# ✅ Should return active tracker or 404 if none exists

# Test 4: Mark meal as eaten
curl -X POST http://localhost:3000/api/diet-trackers/day/1/meals/{MEAL_ID}/eat \
  -H "Authorization: Bearer YOUR_TOKEN"
# ✅ Should update tracker and return updated data
```

### 2. Frontend Tests:

```bash
cd frontend

# Test 1: Build check
npm run build
# ✅ Should build without errors

# Test 2: Start dev server
npm run dev
# ✅ Should start on http://localhost:5173
```

### 3. Integration Tests:

- [ ] **Login Flow**

  - [ ] Can login with valid credentials
  - [ ] Redirects to dashboard after login
  - [ ] Token is stored in localStorage

- [ ] **AI Meal Plan**

  - [ ] Can view existing AI meal plans
  - [ ] Can create new AI meal plan
  - [ ] Meal plan has days with meals
  - [ ] Each meal has: dishName, type, nutrition, eaten field

- [ ] **Diet Tracker Creation**

  - [ ] Sidebar shows "Diet Tracker" link
  - [ ] Clicking link navigates to /diet-tracker
  - [ ] If no tracker exists, shows "Start Tracking" button
  - [ ] Clicking button creates tracker successfully
  - [ ] Shows error if no meal plan exists

- [ ] **Diet Tracker Usage**
  - [ ] Stats cards display correctly:
    - [ ] Current Day (e.g., "5 / 30")
    - [ ] Streak (e.g., "3 days 🔥")
    - [ ] Adherence Score (e.g., "85%")
    - [ ] Overall Progress (e.g., "42%")
  - [ ] Day selector shows all days
  - [ ] Days are color-coded:
    - [ ] Blue = current/selected
    - [ ] Green = 100% complete
    - [ ] Yellow = partially complete
    - [ ] Gray = not started
  - [ ] Can switch between days
  - [ ] Day progress card shows:
    - [ ] Meals completed vs total
    - [ ] Calories consumed vs target
    - [ ] Protein consumed vs target
    - [ ] Carbs consumed vs target
  - [ ] Meal cards display:
    - [ ] Meal type (Breakfast/Lunch/Dinner/Snack)
    - [ ] Dish name
    - [ ] Description
    - [ ] Nutrition badges
    - [ ] Checkmark when eaten
  - [ ] Clicking meal card toggles eaten status
  - [ ] Stats update after marking meal
  - [ ] Auto-creates next day at 100% completion
  - [ ] Streak increases with consecutive tracking

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'AiMealPlan'"

**Solution:** Check import path in dietTrackerController.js

```javascript
import AiMealPlan from '../models/AiMealPlan.js'
```

### Issue: "aiMealPlanId is not defined"

**Solution:** Make sure DietTracker model uses `aiMealPlanId`:

```javascript
aiMealPlanId: { type: Types.ObjectId, ref: 'AiMealPlan', required: true }
```

### Issue: "No active tracker found" (but one exists)

**Solution:** Check if tracker status is 'active' in database:

```javascript
db.diettrackers.find({ status: 'active' })
```

### Issue: Meals not showing

**Solution:** Check AiMealPlan structure has days array with meals:

```javascript
days: [
  {
    dayNumber: 1,
    meals: [
      {
        dishName: 'Oatmeal',
        type: 'Breakfast',
        // ...
      },
    ],
  },
]
```

### Issue: Stats not updating

**Solution:**

1. Check backend calculations are running
2. Check frontend is receiving updated data
3. Clear browser cache and refresh

### Issue: "Profile completed" required

**Solution:** Make sure user has completed their profile first

---

## 🔍 Database Verification

### Check if data is being created:

```javascript
// MongoDB shell or MongoDB Compass

// Check AiMealPlans
db.aimealplans.find({}).pretty()

// Check DietTrackers
db.diettrackers.find({}).pretty()

// Check if reference is correct
db.diettrackers.findOne({ status: 'active' })
// Should have: aiMealPlanId: ObjectId("...")
```

---

## 📊 Sample Data Check

### Valid AiMealPlan Structure:

```json
{
  "_id": "...",
  "userId": "...",
  "planName": "Weight Loss Plan",
  "dailyCalories": 1800,
  "dailyMacros": {
    "protein": 135,
    "carbs": 203,
    "fat": 60
  },
  "planDuration": 30,
  "days": [
    {
      "dayNumber": 1,
      "meals": [
        {
          "_id": "...",
          "type": "Breakfast",
          "dishName": "Oatmeal with Berries",
          "description": "Healthy breakfast",
          "nutrition": {
            "calories": 350,
            "protein": 12,
            "carbs": 45,
            "fat": 8
          },
          "eaten": false
        }
      ]
    }
  ]
}
```

### Valid DietTracker Structure:

```json
{
  "_id": "...",
  "userId": "...",
  "aiMealPlanId": "...", // References AiMealPlan._id
  "status": "active",
  "currentDay": 1,
  "totalDays": 30,
  "streak": 0,
  "adherenceScore": 0,
  "overallCompletionPercentage": 0,
  "dailyTrackers": [
    {
      "date": "2026-01-01",
      "dayNumber": 1,
      "meals": [
        {
          "mealId": "...",
          "name": "Oatmeal with Berries",
          "category": "Breakfast",
          "isEaten": false,
          "nutrition": {
            "calories": 350,
            "protein": 12,
            "carbs": 45,
            "fat": 8
          }
        }
      ],
      "consumed": {
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0
      },
      "target": {
        "calories": 1800,
        "protein": 135,
        "carbs": 203,
        "fat": 60
      },
      "mealsCompleted": 0,
      "totalMeals": 4,
      "completionPercentage": 0
    }
  ]
}
```

---

## 🚀 Launch Steps

### Step 1: Clean Start

```bash
# Stop all running instances
# Kill any node processes on port 3000 and 5173

# Backend
cd backend
npm install
npm run dev

# In new terminal - Frontend
cd frontend
npm install
npm run dev
```

### Step 2: Create Test User

1. Go to http://localhost:5173
2. Click "Sign Up"
3. Create account
4. Complete profile

### Step 3: Create AI Meal Plan

1. Login
2. Go to Dashboard
3. Click "AI Diet Planner"
4. Fill form and generate plan
5. Wait for plan generation

### Step 4: Start Tracking

1. Click "Diet Tracker" in sidebar
2. Click "Start Tracking"
3. Mark some meals as eaten
4. Watch stats update!

---

## ✅ Success Criteria

Your Diet Tracker is working if:

- ✅ Can create tracker from AI meal plan
- ✅ Can mark meals as eaten/uneaten
- ✅ Stats update in real-time
- ✅ Days auto-create at 100% completion
- ✅ Streak counter works
- ✅ Adherence score calculates
- ✅ No console errors
- ✅ No backend errors
- ✅ UI is responsive

---

## 📝 Files to Review

### If something's not working, check these files:

**Backend:**

1. [backend/models/DietTracker.js](backend/models/DietTracker.js) - Model schema
2. [backend/controllers/dietTrackerController.js](backend/controllers/dietTrackerController.js) - Business logic
3. [backend/routes/dietTrackerRoutes.js](backend/routes/dietTrackerRoutes.js) - API routes
4. [backend/server.js](backend/server.js) - Route registration

**Frontend:**

1. [frontend/src/api/dietTrackerApi.js](frontend/src/api/dietTrackerApi.js) - API calls
2. [frontend/src/context/DietTrackerContext.jsx](frontend/src/context/DietTrackerContext.jsx) - State management
3. [frontend/src/pages/DietTrackerPage.jsx](frontend/src/pages/DietTrackerPage.jsx) - UI component
4. [frontend/src/App.jsx](frontend/src/App.jsx) - Routes and providers
5. [frontend/src/components/Sidebar/Sidebar.jsx](frontend/src/components/Sidebar/Sidebar.jsx) - Navigation

---

## 🎉 When Everything Works

You should see:

- 📊 Beautiful stats dashboard
- 🎯 Color-coded day selector
- ✅ Clickable meal cards
- 🔥 Streak counter
- 💯 Adherence score
- 📈 Real-time progress
- ✨ Smooth auto-create next day
- 🎨 Responsive UI

**Congratulations! Your Diet Tracker is live! 🚀**

---

## 📞 Need Help?

Check these resources:

1. [DIET_TRACKER_IMPLEMENTATION_SUMMARY.md](DIET_TRACKER_IMPLEMENTATION_SUMMARY.md)
2. [DIET_TRACKER_QUICK_REFERENCE.md](DIET_TRACKER_QUICK_REFERENCE.md)
3. [DIET_TRACKER_ARCHITECTURE.md](DIET_TRACKER_ARCHITECTURE.md)
4. Backend terminal logs
5. Browser console (F12)
6. MongoDB logs

---

**Happy Tracking! 📊✨**
