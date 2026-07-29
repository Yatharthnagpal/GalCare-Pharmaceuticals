const fs = require('fs');
const path = require('path');

const iconPath = path.join(__dirname, '..', 'public', 'apple-icon.png');
const iconBase64 = fs.readFileSync(iconPath).toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="50" viewBox="0 0 240 50" fill="none">
  <!-- Favicon base64 image in place of circle -->
  <g transform="translate(0, 5)">
    <clipPath id="favicon_clip_dark">
      <rect width="40" height="40" rx="10"/>
    </clipPath>
    <image href="data:image/png;base64,${iconBase64}" width="40" height="40" clip-path="url(#favicon_clip_dark)"/>
  </g>

  <!-- Dark mode white typography -->
  <text x="52" y="27" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-weight="bold" fill="#ffffff" letter-spacing="-0.2">
    Galcare
  </text>
  <text x="53" y="41" font-family="system-ui, -apple-system, sans-serif" font-size="9.5" font-weight="600" fill="#e2e8f0" letter-spacing="0.5">
    Innovation Skin Care
  </text>
</svg>`;

const outputPath = path.join(__dirname, '..', 'public', 'galcare-logo-dark.svg');
fs.writeFileSync(outputPath, svgContent, 'utf8');
console.log('Successfully created galcare-logo-dark.svg with embedded base64 favicon!');
