# Diet Tracker Architecture Diagram 🏗️

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                     (Frontend - React/JSX)                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────────┐    ┌──────────────┐
│   Sidebar    │      │ DietTrackerPage  │    │  Dashboard   │
│              │      │                  │    │              │
│ - Navigation │      │ - Stats Cards    │    │ - Overview   │
│ - Diet       │      │ - Day Selector   │    │ - Quick      │
│   Tracker    │      │ - Meal Cards     │    │   Access     │
│   Link 🎯    │      │ - Progress Bars  │    │              │
└──────────────┘      └──────────────────┘    └──────────────┘
                                │
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌────────────────┐      ┌────────────────┐
            │ DietTracker    │      │ AiMealPlan     │
            │ Context        │      │ Context        │
            │                │      │                │
            │ - activeTracker│      │ - activePlan   │
            │ - loading      │      │ - allPlans     │
            │ - Actions      │      │ - Actions      │
            └────────────────┘      └────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌────────────────┐      ┌────────────────┐
            │ dietTrackerApi │      │ aiMealPlanApi  │
            │                │      │                │
            │ - createTracker│      │ - getMealPlan  │
            │ - markMealEaten│      │ - generatePlan │
            │ - undoMeal     │      │ - deletePlan   │
            └────────────────┘      └────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                │
                                │ HTTP/HTTPS
                                │
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND API                             │
│                    (Node.js + Express)                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌──────────────────────┐  ┌──────────────────────┐
        │ dietTrackerRoutes    │  │ aiMealPlanRoutes     │
        │                      │  │                      │
        │ POST /:aiMealPlanId  │  │ POST /               │
        │ GET  /active         │  │ GET  /latest         │
        │ POST /day/:day/eat   │  │ GET  /:id            │
        │ POST /day/:day/undo  │  │ DELETE /:id          │
        └──────────────────────┘  └──────────────────────┘
                    │                       │
                    ▼                       ▼
        ┌──────────────────────┐  ┌──────────────────────┐
        │ dietTrackerController│  │ aiMealPlanController │
        │                      │  │                      │
        │ - createDietTracker  │  │ - createMealPlan     │
        │ - getActiveTracker   │  │ - getMealPlanById    │
        │ - markMealAsEaten    │  │ - deleteMealPlan     │
        │ - undoMeal           │  │ - getDayFromPlan     │
        │                      │  │                      │
        │ 🧮 Calculations:     │  │ 🧮 Uses:             │
        │ - updateStreak()     │  │ - calculateBMR()     │
        │ - calculateAdherence │  │ - calculateTDEE()    │
        │ - calculateDailyComp │  │ - calculateCalories()│
        │ - auto-create next   │  │ - calculateMacros()  │
        └──────────────────────┘  └──────────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MONGOOSE MODELS                            │
└─────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
        ┌───────────────┐ ┌──────────┐ ┌──────────┐
        │ DietTracker   │ │AiMealPlan│ │   User   │
        │               │ │          │ │          │
        │ - userId      │ │ - userId │ │ - email  │
        │ - aiMealPlanId│─┼─>_id     │ │ - name   │
        │ - status      │ │ - days[] │ │ - profile│
        │ - currentDay  │ │   meals[]│ │          │
        │ - totalDays   │ │     eaten│ │          │
        │ - streak      │ │ - macros │ │          │
        │ - adherence   │ │ - cals   │ │          │
        │ - dailyTracks │ │          │ │          │
        │   []          │ │          │ │          │
        └───────────────┘ └──────────┘ └──────────┘
                    │           │           │
                    └───────────┴───────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MONGODB                                 │
│                   (Database Storage)                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Examples

### Example 1: User Marks Meal as Eaten

```
User clicks meal card
    │
    ▼
DietTrackerPage.handleToggleMeal(mealId, isEaten)
    │
    ▼
DietTrackerContext.markMealAsEaten(dayNumber, mealId)
    │
    ▼
dietTrackerApi.markMealAsEaten(dayNumber, mealId)
    │
    ▼ HTTP POST
Backend: dietTrackerController.markMealAsEaten()
    │
    ├─> Find active tracker from DB
    ├─> Find meal in day
    ├─> Update meal.isEaten = true
    ├─> Calculate consumed macros ➕
    ├─> Update completion % 📊
    ├─> tracker.updateStreak() 🔥
    ├─> tracker.calculateAdherenceScore() 💯
    ├─> Check if day 100% complete
    │   └─> YES: createNextDayTracker() ✨
    └─> Save to database
    │
    ▼
Return updated tracker to frontend
    │
    ▼
DietTrackerContext updates state
    │
    ▼
DietTrackerPage re-renders with new data
    │
    ▼
User sees updated stats! ✅
```

---

### Example 2: Creating a Tracker

```
User clicks "Start Tracking"
    │
    ▼
DietTrackerPage.handleCreateTracker()
    │
    ▼
Get activePlan._id from AiMealPlanContext
    │
    ▼
DietTrackerContext.createTracker(aiMealPlanId)
    │
    ▼
dietTrackerApi.createTracker(aiMealPlanId)
    │
    ▼ HTTP POST
Backend: dietTrackerController.createDietTracker()
    │
    ├─> Validate user owns the meal plan
    ├─> Check for existing active tracker
    ├─> Get Day 1 from AiMealPlan
    ├─> Create dailyTracker with:
    │   - meals mapped from AiMealPlan
    │   - target calories & macros
    │   - consumed = 0
    │   - completionPercentage = 0
    ├─> Create DietTracker document
    └─> Save to database
    │
    ▼
Return new tracker to frontend
    │
    ▼
DietTrackerContext updates state
    │
    ▼
DietTrackerPage shows tracker! ✅
```

---

## 🔗 Model Relationships

```
User ──────────┐
               │
               ├─ has many → AiMealPlan
               │                  │
               │                  │ referenced by
               │                  ▼
               └─ has many → DietTracker
                                  │
                                  │ tracks
                                  ▼
                            dailyTrackers[]
                                  │
                                  │ contains
                                  ▼
                              meals[]
                                  │
                                  │ maps to
                                  ▼
                        AiMealPlan.days[].meals[]
```

---

## 🧮 Calculation Flow

```
AiMealPlan Creation
    │
    ├─> User Profile Data
    │   (age, weight, height, gender, activity)
    │
    ▼
nutritionCalculations.js
    │
    ├─> calculateBMR() → 1650 kcal
    ├─> calculateTDEE() → 2280 kcal (BMR × 1.375)
    ├─> calculateCalories(goal) → 1824 kcal (weight loss)
    └─> calculateMacros() → { protein: 137g, carbs: 205g, fat: 51g }
    │
    ▼
Store in AiMealPlan.dailyCalories & dailyMacros
    │
    ▼
Used when creating DietTracker as "targets"
    │
    ▼
DietTracker tracks consumption vs targets
    │
    ├─> Daily: consumed vs target
    ├─> Completion: meals eaten / total meals
    ├─> Streak: consecutive days ≥70%
    └─> Adherence: weighted score (50% + 30% + 20%)
```

---

## 🎨 Component Hierarchy

```
App.jsx
 └─ DietTrackerProvider
     └─ Router
         └─ Routes
             └─ /diet-tracker (Protected)
                 └─ DietTrackerPage
                     ├─ Sidebar (navigation)
                     ├─ Stats Cards
                     │   ├─ Current Day
                     │   ├─ Streak 🔥
                     │   ├─ Adherence Score
                     │   └─ Overall Progress
                     ├─ Day Selector
                     │   └─ Day Buttons (color-coded)
                     ├─ Day Progress Card
                     │   └─ Nutrition breakdown
                     └─ Meals Grid
                         └─ Meal Cards (clickable)
```

---

## 📦 Context Providers

```javascript
// App.jsx structure
<AuthProvider>
  <ProfileProvider>
    <AiMealPlanProvider>
      <DietTrackerProvider>
        {' '}
        ✨ NEW
        <Router>{/* Routes */}</Router>
      </DietTrackerProvider>
    </AiMealPlanProvider>
  </ProfileProvider>
</AuthProvider>
```

**Why this order?**

- Auth must be outermost (everyone needs user)
- Profile needs Auth
- AiMealPlan needs Auth
- DietTracker needs Auth + AiMealPlan

---

## 🚀 Auto-Create Next Day Logic

```
User marks last meal of day as eaten
    │
    ▼
Day completion = 100%
    │
    ▼
Check: currentDay < totalDays?
    │
    ├─ YES
    │   │
    │   ▼
    │   createNextDayTracker()
    │       │
    │       ├─ Get next day data from AiMealPlan
    │       ├─ Map meals to tracker format
    │       ├─ Set consumed = 0
    │       ├─ Set targets from plan
    │       ├─ Push to dailyTrackers[]
    │       └─ Update currentDay++
    │
    └─ NO
        │
        ▼
        Set tracker.status = 'completed' 🎉
```

---

## 📝 Key Files & Their Roles

| File                       | Role             | Key Functions                                 |
| -------------------------- | ---------------- | --------------------------------------------- |
| `DietTracker.js` (Model)   | Database schema  | `calculateAdherenceScore()`, `updateStreak()` |
| `dietTrackerController.js` | Business logic   | `createDietTracker()`, `markMealAsEaten()`    |
| `dietTrackerRoutes.js`     | API endpoints    | Routes definition                             |
| `dietTrackerApi.js`        | Frontend API     | HTTP requests                                 |
| `DietTrackerContext.jsx`   | State management | Context provider                              |
| `DietTrackerPage.jsx`      | UI component     | Renders tracker                               |
| `nutritionCalculations.js` | Math utils       | BMR, TDEE, macros                             |

---

## ✅ Integration Points

### With AiMealPlan:

- Uses `AiMealPlan._id` as reference
- Maps meal structure: `dishName`, `type`, `nutrition`
- Respects `eaten` field from AiMealPlan
- Uses `dailyCalories` and `dailyMacros` as targets

### With User/Auth:

- Requires authentication
- Filters by `userId`
- Protected routes

### With Profile:

- Indirectly through AiMealPlan
- BMR/TDEE calculated from profile data
- Used during meal plan generation

---

This architecture ensures:

- ✅ Separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Single source of truth (backend for calculations)
- ✅ Real-time updates
- ✅ Type safety through Mongoose schemas

**Happy coding! 🎉**
