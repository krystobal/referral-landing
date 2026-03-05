const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

const keysToFormat = [
    'hero_title',
    'how_title',
    'step1_title',
    'step2_title',
    'step3_title',
    'benefits_title',
    'benefit1_title',
    'benefit2_title',
    'benefit3_title',
    'faq_title'
];

for (const key of keysToFormat) {
    const regex = new RegExp(`(^[ \\t]*${key}:[ \\t]*)(["'\`])(.*?)\\2(,)`, 'gm');
    content = content.replace(regex, (match, prefix, quote, text, suffix) => {
        if (!text) return match;
        
        let formatted = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        formatted = formatted.replace(/\bfizz\b/ig, 'Fizz');
        
        return prefix + quote + formatted + quote + suffix;
    });
}

fs.writeFileSync('script.js', content, 'utf8');
console.log('Updated script.js with sentence case');
