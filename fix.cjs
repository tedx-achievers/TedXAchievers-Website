const fs = require('fs');

function removeUnusedReact(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import React(?:, \{[^}]+\})? from ['"]react['"];\n?/, match => {
    if (match.includes('{')) {
      return match.replace(/React, /, '');
    }
    return '';
  });
  content = content.replace(/import React from ['"]react['"];\n?/, '');
  fs.writeFileSync(file, content);
}

const reactFiles = [
  'src/components/FAQ.tsx',
  'src/components/GetReadySection.tsx',
  'src/components/Speakers.tsx',
  'src/pages/About.tsx',
  'src/pages/Speakers.tsx',
  'src/pages/Team.tsx',
  'src/pages/Tickets.tsx',
  'src/pages/Timeline.tsx'
];

reactFiles.forEach(f => {
  if(fs.existsSync(f)) removeUnusedReact(f);
});

// Fix GetReadySection.tsx
if (fs.existsSync('src/components/GetReadySection.tsx')) {
  let grs = fs.readFileSync('src/components/GetReadySection.tsx', 'utf8');
  grs = grs.replace(/const timeLeft = [^;]+;/, '');
  grs = grs.replace(/const formatNumber = [^;]+;/, '');
  fs.writeFileSync('src/components/GetReadySection.tsx', grs);
}

// Fix ScrollStack.tsx
if (fs.existsSync('src/components/ScrollStack.tsx')) {
  let ss = fs.readFileSync('src/components/ScrollStack.tsx', 'utf8');
  ss = ss.replace(/const scrollContainer = [^;]+;/, '');
  fs.writeFileSync('src/components/ScrollStack.tsx', ss);
}

// Fix Register.tsx
if (fs.existsSync('src/pages/Register.tsx')) {
  let reg = fs.readFileSync('src/pages/Register.tsx', 'utf8');
  reg = reg.replace(/AnimatePresence,?\s*/g, '');
  fs.writeFileSync('src/pages/Register.tsx', reg);
}

// Fix SplitText.tsx
if (fs.existsSync('src/components/SplitText.tsx')) {
  let st = fs.readFileSync('src/components/SplitText.tsx', 'utf8');
  st = st.replace(
    /const Tag = \(tag \|\| 'p'\) as React\.ElementType;\s+return \(\s+<Tag ref={ref} style={style} className={classes}>\s+{text}\s+<\/Tag>\s+\);/s,
    `const tagToUse = tag || 'p';
    
    return React.createElement(
      tagToUse,
      { ref, style, className: classes },
      text
    );`
  );
  fs.writeFileSync('src/components/SplitText.tsx', st);
}
