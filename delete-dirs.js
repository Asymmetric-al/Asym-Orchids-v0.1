const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app/(admin)/dashboard',
  'src/app/(donor)/dashboard',
  'src/app/(missionary)/dashboard',
  'src/app/(donor)/feed',
  'src/app/(missionary)/feed'
];

dirs.forEach(dir => {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Deleted: ${dir}`);
  } catch (e) {
    console.log(`Error deleting ${dir}: ${e.message}`);
  }
});
