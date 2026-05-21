# Learn Coptic Static Website

## What this is
A fast, mobile-friendly Coptic language learning site with lesson pages, YouTube video embeds, audio pronunciation buttons, vocabulary cards, PDFs, and a repeatable workflow.

## Folder structure
- `index.html` — homepage
- `levels/` — level landing pages
- `lessons/` — individual lesson pages
- `assets/css/style.css` — design/mobile layout
- `assets/js/app.js` — audio button logic
- `assets/audio/` — put MP3 pronunciation files here
- `pdfs/` — uploaded curriculum PDFs

## GitHub Pages setup
1. Create a GitHub repository called `coptic-language-school`.
2. Upload all files/folders from this project.
3. Go to Settings → Pages.
4. Under Build and deployment, choose Deploy from branch.
5. Select `main` branch and `/root` folder.
6. Save.
7. Your site will publish at `https://YOURUSERNAME.github.io/coptic-language-school/`.

## How to add a video
Upload your recording to YouTube as Unlisted. Click Share → Embed. Replace the placeholder inside the `video-box` with the iframe.

## How to add audio
1. Export the pronunciation as MP3.
2. Put it in `assets/audio/`.
3. Use this button format:

```html
<button class="sound-btn" onclick="playAudio('../assets/audio/alpha.mp3')">🔊 Play Alpha</button>
```

## How to add a new lesson
1. Copy `lessons/template.html`.
2. Rename it, for example `lessons/ghamma.html`.
3. Edit the title, Coptic text, pronunciation, vocabulary, audio buttons, and PDF link.
4. Add the lesson link to the matching level page.
