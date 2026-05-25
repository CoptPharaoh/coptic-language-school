const fs = require("fs");
const path = require("path");

const lessonsDir = path.join(__dirname, "lessons");

const letters = [
  ["alpha", "Alpha", "Ⲁ ⲁ", "A"],
  ["veeta", "Veeta", "Ⲃ ⲃ", "B"],
  ["eyy", "Eyy", "Ⲉ ⲉ", "E"],
  ["zeeta", "Zeeta", "Ⲍ ⲍ", "Z"],
  ["yota", "Yota", "Ⲓ ⲓ", "I"],
  ["kappa", "Kappa", "Ⲕ ⲕ", "K"],
  ["mey", "Mey", "Ⲙ ⲙ", "M"],
  ["ney", "Ney", "Ⲛ ⲛ", "N"],
  ["o", "O", "Ⲟ ⲟ", "O"],
  ["tav", "Tav", "Ⲧ ⲧ", "T"],

  ["eeta", "Eeta", "Ⲏ ⲏ", "E"],
  ["ro", "Ro", "Ⲣ ⲣ", "R"],
  ["cima", "Cima", "Ⲥ ⲥ", "S"],
  ["key", "Key", "Ⲭ ⲭ", "K"],
  ["oo", "Oo", "Ⲱ ⲱ", "O"],
  ["ti", "Ti", "Ϯ ϯ", "Ti"],

  ["ghamma", "Ghamma", "Ⲅ ⲅ", "G"],
  ["delta", "Delta", "Ⲇ ⲇ", "D"],
  ["so", "So", "ⲋ", "6"],
  ["theeta", "Theeta", "Ⲑ ⲑ", "Th"],
  ["lavla", "Lavla", "Ⲗ ⲗ", "L"],
  ["eksi", "Eksi", "Ⲝ ⲝ", "Ex"],
  ["pi", "Pi", "Ⲡ ⲡ", "P"],
  ["epsilon", "Epsilon", "Ⲩ ⲩ", "V / Ou / Ee"],
  ["phi", "Phi", "Ⲫ ⲫ", "F"],
  ["epsi", "Epsi", "Ⲯ ⲯ", "Ps"],
  ["shai", "Shai", "Ϣ ϣ", "Sh"],
  ["fai", "Fai", "Ϥ ϥ", "F"],
  ["khai", "Khai", "Ϧ ϧ", "Kh"],
  ["horee", "Horee", "Ϩ ϩ", "H"],
  ["janja", "Janja", "Ϫ ϫ", "J"],
  ["cheema", "Cheema", "Ϭ ϭ", "Ch"],
];

function page(slug, name, coptic, sound) {
  return `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${name} | Learn Coptic</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<header class="topbar">
  <div class="wrap nav">
    <a class="brand" href="../index.html">
      <img src="../assets/images/midwest-logo.png" class="site-logo" alt="Midwest Coptic Logo">
      <span>Learn Coptic</span>
    </a>

    <nav class="links">
      <a href="../levels/level101.html">Level 101</a>
    </nav>
  </div>
</header>

<main>

<section class="lesson-hero">
  <div class="wrap">
    <span class="badge">Level 101 • Letter Lesson</span>
    <h1>${name}</h1>
    <p>Learn the Coptic letter ${name}: ${coptic}.</p>
  </div>
</section>

<section class="section">
  <div class="wrap lesson-layout">

    <div>

      <div class="video-box">
        <p>Video coming soon for ${name}.</p>
      </div>

      <h2>Practice Together</h2>

      <div class="audio-grid">
        <div class="sound-card">
          <div class="coptic">${coptic}</div>
          <p>${name} makes the sound “${sound}.”</p>

          <button
            class="sound-btn"
            onclick="playAudio('../assets/audio/${slug}.m4a')">
            🔊 Play ${name}
          </button>
        </div>
      </div>

      <div class="card">
        <h3>Follow Along</h3>
        <ol class="checklist">
          <li>Point to the letter: ${coptic}</li>
          <li>Say “${name}” out loud.</li>
          <li>Say the sound “${sound}.”</li>
          <li>Trace the letter on the worksheet.</li>
          <li>Color the letter ${name}.</li>
        </ol>
      </div>

      <div class="card quiz-card">
        <h3>Quick Quiz</h3>
        <p>Which one is ${name}?</p>

        <button class="sound-btn" onclick="checkAnswer(this, true)">${coptic}</button>
        <button class="sound-btn" onclick="checkAnswer(this, false)">?</button>

        <p class="quiz-result"></p>
      </div>

      <div class="card quiz-card">
        <h3>Sound Check</h3>
        <p>What sound does ${name} make?</p>

        <button class="sound-btn" onclick="checkAnswer(this, true)">${sound}</button>
        <button class="sound-btn" onclick="checkAnswer(this, false)">A different sound</button>

        <p class="quiz-result"></p>
      </div>

    </div>

    <aside class="card">
      <h3>Lesson Goals</h3>

      <ul class="checklist">
        <li>Recognize ${name}.</li>
        <li>Hear the sound clearly.</li>
        <li>Repeat after the lesson.</li>
        <li>Practice tracing and coloring.</li>
      </ul>

      <a class="btn primary" href="../pdfs/Coptic_L101_2016.pdf">
        Open Worksheet PDF
      </a>
    </aside>

  </div>
</section>

</main>

<footer class="footer">
  <div class="wrap">Level 101 • ${name} Lesson</div>
</footer>

<script src="../assets/js/app.js"></script>

</body>
</html>`;
}

for (const [slug, name, coptic, sound] of letters) {
  const filePath = path.join(lessonsDir, `${slug}.html`);

  if (slug === "alpha") {
    console.log("Skipping alpha.html so your current Alpha page is not overwritten.");
    continue;
  }

  fs.writeFileSync(filePath, page(slug, name, coptic, sound));
  console.log(`Created ${slug}.html`);
}
