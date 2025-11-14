const fs = require('fs');
const path = require('path');

const FEED_DIR = '/Users/usuario/Desktop/feed/src';
const OUTPUT_FILE = path.join(__dirname, '../data/feed-components.json');

// Extract component info from feed directory
function extractComponents() {
  const components = [];
  
  // Main imports directory
  const importsDir = path.join(FEED_DIR, 'imports');
  if (fs.existsSync(importsDir)) {
    const files = fs.readdirSync(importsDir);
    const componentFiles = files.filter(f => 
      f.endsWith('.tsx') && 
      !f.includes('svg-') && 
      !f.match(/-\d+\.tsx$/) // Skip numbered variants
    );
    
    componentFiles.forEach(file => {
      const name = file.replace('.tsx', '');
      const filePath = path.join(importsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Try to extract description from comments or default
      let description = `${name} component from Feed V3`;
      
      // Check for export default
      if (content.includes('export default')) {
        components.push({
          id: `feed-${name.toLowerCase()}`,
          name: name,
          description: description,
          version: '0.1.0',
          date: new Date().toISOString().split('T')[0],
          product: 'Feed',
          source: 'feed',
          filePath: `feed/src/imports/${file}`
        });
      }
    });
  }
  
  // Components directory (non-UI components)
  const componentsDir = path.join(FEED_DIR, 'components');
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    const componentFiles = files.filter(f => 
      f.endsWith('.tsx') && 
      !f.startsWith('ui/') &&
      !f.includes('use')
    );
    
    componentFiles.forEach(file => {
      const name = file.replace('.tsx', '');
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('export') && !content.includes('useLiveThreadUpdates')) {
        components.push({
          id: `feed-${name.toLowerCase()}`,
          name: name,
          description: `${name} component from Feed V3`,
          version: '0.1.0',
          date: new Date().toISOString().split('T')[0],
          product: 'Feed',
          source: 'feed',
          filePath: `feed/src/components/${file}`
        });
      }
    });
  }
  
  return components;
}

// Run extraction
const components = extractComponents();

// Ensure data directory exists
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write to file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(components, null, 2));
console.log(`Extracted ${components.length} components to ${OUTPUT_FILE}`);

