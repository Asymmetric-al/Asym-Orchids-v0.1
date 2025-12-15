const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src/app/(mc)');
const destDir = path.join(process.cwd(), 'src/app/mc');

if (!fs.existsSync(srcDir)) {
  console.log('Source directory does not exist:', srcDir);
  process.exit(0);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Get all items in source directory
const items = fs.readdirSync(srcDir);

items.forEach(item => {
  const srcPath = path.join(srcDir, item);
  const destPath = path.join(destDir, item);
  
  if (item === 'page.tsx') {
    // Skip page.tsx as we will rewrite it
    return;
  }
  
  console.log(`Moving ${item} to ${destDir}`);
  
  // If destination exists (e.g. layout.tsx might not exist, but directories might?), remove it first?
  // Actually, we want to overwrite layout.tsx if it exists (it doesn't in destDir based on dir output)
  
  try {
    fs.renameSync(srcPath, destPath);
  } catch (err) {
    console.error(`Error moving ${item}:`, err);
    // If rename fails (e.g. cross-device), try copy and delete
    try {
        fs.cpSync(srcPath, destPath, { recursive: true });
        fs.rmSync(srcPath, { recursive: true, force: true });
    } catch (e) {
        console.error(`Error copying ${item}:`, e);
    }
  }
});

// Remove the source directory if empty (it should only contain page.tsx now)
try {
  fs.rmSync(srcDir, { recursive: true, force: true });
  console.log('Removed source directory');
} catch (err) {
  console.error('Error removing source directory:', err);
}
