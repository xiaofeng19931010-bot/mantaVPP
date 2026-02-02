const fs = require('fs');
try {
    const content = fs.readFileSync('figma_output_container.json', 'utf8');
    const json = JSON.parse(content);
    const designText = json.content[0].text;
    fs.writeFileSync('design_code_v3.txt', designText);
    console.log('Successfully extracted design code to design_code_v3.txt');
} catch (e) {
    console.error('Error extracting design:', e);
}