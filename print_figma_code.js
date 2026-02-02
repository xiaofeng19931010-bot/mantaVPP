const fs = require('fs');
const content = fs.readFileSync('figma_output_container.json', 'utf8');
const json = JSON.parse(content);
console.log(json.content[0].text);