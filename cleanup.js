const fs = require('fs');
const path = require('path');

const dirs = ['(admin)', '(donor)', '(missionary)', '(mc)'];
const basePath = 'C:/Users/Conrad/orchids-projects/orchids-orchids-platform/src/app';

dirs.forEach(d => {
  const fullPath = path.join(basePath, d);
  try {
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log('Deleted:', d);
    } else {
      console.log('Does not exist:', d);
    }
  } catch(e) {
    console.error('Error deleting', d, e.message);
  }
});
