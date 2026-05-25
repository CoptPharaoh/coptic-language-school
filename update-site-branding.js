const fs = require("fs");
const path = require("path");

const root = __dirname;

function walk(dir) {
  let files = [];

  for (const item of fs.readdirSync(dir)) {

    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {

      if (item === ".git" || item === "node_modules") continue;

      files = files.concat(walk(full));

    } else if (item.endsWith(".html")) {

      files.push(full);
    }
  }

  return files;
}

const htmlFiles = walk(root);

for (const file of htmlFiles) {

  let html = fs.readFileSync(file, "utf8");

  // REMOVE WORKFLOW LINK

  html = html.replace(
    /\s*<a href="(?:\.\.\/)?recording-workflow\.html">Workflow<\/a>/g,
    ""
  );

  // REPLACE CROSS ICON WITH MIDWEST LOGO

  html = html.replace(
    /<span class="seal">.*?<\/span>/g,

    `<img class="site-logo" src="${
      file.includes("/levels/") || file.includes("/lessons/")
        ? "../"
        : ""
    }assets/images/midwest-logo.png" alt="Midwest Coptic Orthodox Churches logo">`
  );

  // REPLACE OLD WORDING

  html = html.replace(
    /Coptic Orthodox youth language project/gi,
    "Coptic Orthodox Churches of Midwest, USA"
  );

  fs.writeFileSync(file, html);

  console.log("Updated:", path.relative(root, file));
}

console.log("Done updating HTML files.");