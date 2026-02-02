const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_output_container.json', 'utf8'));
const codeBlock = data.content.find(c => c.text.includes('function Frame2'));

if (codeBlock) {
    fs.writeFileSync('design_code_v2.txt', codeBlock.text);
    console.log('Extracted code to design_code_v2.txt');
} else {
    console.log('No code block found');
}
