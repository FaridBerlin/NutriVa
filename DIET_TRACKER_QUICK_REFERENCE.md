# Diet Tracker Quick Reference Guide 🚀

## 🎯 What Was Implemented

### ✅ Your Requirements Met:

1. **AI Meal Structure** - Uses AiMealPlan with `dishName`, `type`, `eaten` fields
2. **aiMealPlanId** - Renamed from mealPlanId throughout codebase
3. **Auto-create Next Day** - When day hits 100%, next day auto-created
4. **JSX Components** - All frontend in JavaScript, not TypeScript
5. **API Routes** - `/api/diet-trackers/:aiMealPlanId`
6. **Backend Calculations** - ALL calculations (BMI, TDEE, adherence, streak) stay in backend

---

## 📁 New Files Created

```
backend/
  (no new files, only modifications)

frontend/
  src/
    api/
      dietTrackerApi.js ✨
    context/
      DietTrackerContext.jsx ✨
    pages/
      DietTrackerPage.jsx ✨
```

---

## 🔧 Modified Files

```
backend/
  models/DietTracker.js ✏️
  controllers/dietTrackerController.js ✏️
  routes/dietTrackerRoutes.js ✏️

frontend/
  src/
    App.jsx ✏️
    components/Sidebar/Sidebar.jsx ✏️
```

---

## 🗑️ Files to Delete (After Testing)

```bash
# Backend
rm backend/models/Meal.js
rm backend/models/MealPlan.js
rm backend/controllers/mealController.js
rm backend/controllers/mealPlanController.js
rm backend/routes/mealRoutes.js
rm backend/routes/mealPlanRoutes.js

# Frontend
rm frontend/src/context/mealPlanContext.jsx
rm frontend/src/components/mealPlanner/MealPlanList.jsx
rm frontend/src/components/mealPlanner/MealPlanListDetails.jsx
```

**⚠️ IMPORTANT:** Before deleting:

1. Search for imports of these files
2. Remove them from [server.js](backend/server.js) (lines 9-10)
3. Test everything works

---

## 🚀 How to Use

### 1. Start the App:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Use the Feature:

1. Login → Dashboard
2. Click **"Diet Tracker"** in sidebar (green button with 🎯)
3. If no tracker exists, click **"Start Tracking"**
4. Click meal cards to mark as eaten
5. Watch stats update automatically!

---

## 📊 How Data Flows

```
User clicks meal → Frontend (DietTrackerPage)
                    ↓
                 dietTrackerApi.markMealAsEaten()
                    ↓
                 Backend Controller
                    ↓
              Updates AiMealPlan (eaten field)
                    ↓
              Recalculates DietTracker stats:
              - Daily completion %
              - Calories consumed
              - Protein/Carbs/Fat consumed
              - Overall completion %
              - Streak calculation
              - Adherence score
                    ↓
              Returns updated tracker
                    ↓
              Frontend displays new stats ✅
```

---

## 🧮 Backend Calculations Explained

### Already Existing (from nutritionCalculations.js):

- `calculateBMR()` - Uses Mifflin-St Jeor equation
- `calculateTDEE()` - BMR × activity multiplier
- `calculateCalories()` - Adjusts for weight loss/gain goal
- `calculateMacros()` - Splits into protein/carbs/fat

### In DietTracker Model:

- `calculateDailyCompletion(dayNumber)` - Meals completed / total meals × 100
- `calculateOverallCompletion()` - Average of all daily completions
- `calculateStreak()` - Consecutive days with ≥70% completion
- `calculateAdherenceScore()` - Weighted score:
  - 50% completion percentage
  - 30% streak score
  - 20% nutrition adherence

**Frontend never duplicates these** - just displays values! ✅

---

## 🎨 UI Components

### Stats Cards (Top):

- **Current Day** - Shows day X of Y
- **Streak** - Consecutive tracking days 🔥
- **Adherence Score** - Overall performance (0-100%)
- **Overall Progress** - Average completion across all days

### Day Selector:

- **Blue** - Currently selected day
- **Green** - 100% complete
- **Yellow** - Partially complete (1-99%)
- **Gray** - Not started

### Meal Cards:

- Click to toggle eaten status
- Shows nutrition: calories, protein, carbs, fat
- Green background when eaten
- Checkmark icon ✓ when complete

---

## 🐛 Troubleshooting

### "No active tracker found"

→ Click "Start Tracking" button

### "Please create a meal plan first"

→ Go to Dashboard → AI Diet Planner → Generate a plan

### Stats not updating

→ Check backend terminal for errors
→ Refresh the page
→ Check browser console (F12)

### Meal toggle not working

→ Make sure you're logged in
→ Check if aiMealPlan has days with meals
→ Check backend logs

---

## 📝 Code Examples

### Mark Meal as Eaten (Frontend):

```jsx
const { markMealAsEaten } = useDietTracker()

const handleToggle = async (mealId) => {
  const result = await markMealAsEaten(dayNumber, mealId)
  if (!result.success) {
    alert(result.error)
  }
}
```

### Create Tracker (Frontend):

```jsx
const { createTracker } = useDietTracker()
const { activePlan } = useAiMealPlan()

const handleCreate = async () => {
  const result = await createTracker(activePlan._id)
  if (result.success) {
    console.log('Tracker created!')
  }
}
```

### Backend Calculation (Auto-runs):

```javascript
// In dietTrackerController.js
tracker.updateStreak()
tracker.adherenceScore = tracker.calculateAdherenceScore()
await tracker.save()
```

---

## ✅ Testing Commands

```bash
# Check if backend is running
curl http://localhost:3000/api/diet-trackers/active \
  -H "Authorization: Bearer YOUR_TOKEN"

# Check frontend build
cd frontend && npm run build

# Check for errors
npm run lint
```

---

## 📚 Key Concepts

### Context Providers Hierarchy:

```
AuthProvider
  └─ ProfileProvider
      └─ AiMealPlanProvider
          └─ DietTrackerProvider ✨ NEW
```

### Model Relationships:

```
User → Profile
User → AiMealPlan
User → DietTracker → aiMealPlanId (references AiMealPlan)
```

### Auto-Create Logic:

```
Day completion hits 100%
  → Check if more days exist
    → Yes: Create next day tracker automatically
    → No: Mark tracker as "completed"
```

---

## 🎉 You're All Set!

The Diet Tracker is fully integrated with:

- ✅ AiMealPlan structure
- ✅ Backend calculations
- ✅ Auto-create next day
- ✅ JSX components
- ✅ Real-time tracking
- ✅ Beautiful UI with Tailwind CSS

**Need help?** Check:

- [DIET_TRACKER_IMPLEMENTATION_SUMMARY.md](DIET_TRACKER_IMPLEMENTATION_SUMMARY.md)
- [DIET_TRACKER_IMPLEMENTATION_GUIDE.md](guide/DIET_TRACKER_IMPLEMENTATION_GUIDE.md)
- Individual code files for inline comments

---

**Happy Tracking! 📊✨**
