const fs = require('fs');

function fixConflict(filepath) {
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    if (!content.includes('<<<<<<< HEAD')) {
      return false;
    }
    
    const lines = content.split('\n');
    const result = [];
    let inConflict = false;
    let inHead = false;
    
    for (const line of lines) {
      if (line === '<<<<<<< HEAD') {
        inConflict = true;
        inHead = true;
      } else if (line === '=======') {
        inHead = false;
      } else if (line.startsWith('>>>>>>> ')) {
        inConflict = false;
      } else if (inHead || !inConflict) {
        result.push(line);
      }
    }
    
    fs.writeFileSync(filepath, result.join('\n'));
    console.log(`✅ ${filepath}`);
    return true;
  } catch (e) {
    console.log(`❌ ${filepath}: ${e.message}`);
    return false;
  }
}

const files = [
  'frontend/src/components/Footer.jsx',
  'frontend/src/components/dashboard/index.js',
  'frontend/src/components/dashboard/CreateMeal.jsx',
  'frontend/src/components/dashboard/WeeklyCalendar.jsx',
  'frontend/src/pages/DashboardPage.jsx',
  'frontend/src/pages/SettingsPage.jsx',
  'frontend/src/pages/ProfilePage.jsx',
  'backend/routes/userRoutes.js',
  'backend/models/Meal.js',
  'backend/controllers/userController.js'
];

let count = 0;
files.forEach(f => { if (fs.existsSync(f) && fixConflict(f)) count++; });
console.log(`\n�� Fixed ${count} files`);
