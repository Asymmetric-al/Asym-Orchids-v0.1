import { readFileSync, writeFileSync, existsSync } from 'fs';

const files = ['email', 'pdf', 'sign', 'mobilize', 'reports', 'support', 'care', 'events', 'automations', 'admin', 'contributions', 'web-studio'];

files.forEach(f => {
  const p = `src/app/mc/${f}/page.tsx`;
  if (existsSync(p)) {
    let c = readFileSync(p, 'utf8');
    c = c.replace("import { TilePage } from '@/components/mission-control/tiles/TilePage'", "import { TilePage } from '@/features/mission-control'");
    c = c.replace("import { getTileById } from '@/lib/mission-control/tiles'", "import { getTileById } from '@/config'");
    writeFileSync(p, c);
    console.log(`Updated ${p}`);
  }
});

console.log('Done');
