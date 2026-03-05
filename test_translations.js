const fs = require('fs');
const content = fs.readFileSync('script.js', 'utf8');
// Extract the translations object manually since it's hard to eval the whole file with browser globals
const match = content.match(/const translations = ({[\s\S]*?});/);
if (!match) {
    console.error("Could not find translations object");
    process.exit(1);
}
// Clean up the object to make it parsable by JSON.parse or eval in a safe way
let objStr = match[1];
// Eval is safer here because it's a JS object, not JSON
const translations = eval("(" + objStr + ")");

const expectedKeys = ['nav_how', 'nav_benefits', 'nav_faq', 'nav_about', 'about_title', 'about_desc'];
const langs = Object.keys(translations);

langs.forEach(lang => {
    console.log(`Checking [${lang}]...`);
    expectedKeys.forEach(key => {
        if (!translations[lang][key]) {
            console.error(`  MISSING KEY: ${key}`);
        } else {
            // console.log(`  Found: ${key}`);
        }
    });
});
