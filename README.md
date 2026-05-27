# 💛 Hans's Golden Birthday Website ✨

A premium interactive birthday website celebrating Hans's Golden Birthday — turning 19 on the 19th!

## 🌟 Features

- 🖤 Luxury **Black + Gold + White** aesthetic
- ✨ Golden floating particles and sparkle animations
- 🎈 Interactive balloon messages
- 📸 Memory photo gallery with categories
- 🔀 Then vs Now comparison slider
- 🎂 Birthday cake with candle blowing animation + confetti
- 💌 Handwritten letter section
- 🌌 Starry sky with floating golden lanterns
- 🎵 Background music toggle
- 📱 Fully responsive design
- 📝 All content editable without touching code

## 📂 Project Structure

```
hans bday/
├── index.html                  # Main HTML file
├── css/
│   └── styles.css              # All styles
├── js/
│   ├── app.js                  # Main application logic
│   ├── particles.js            # Golden particle effects
│   ├── gallery.js              # Photo gallery logic
│   ├── slider.js               # Then vs Now slider
│   ├── cake.js                 # Birthday cake + candle
│   ├── letter.js               # Letter section
│   └── music.js                # Background music toggle
├── data/
│   ├── messages.json           # ✏️ All editable text content
│   └── letter.txt              # ✏️ Your personal letter
├── assets/
│   ├── images/
│   │   ├── childhood/          # 👶 Childhood photos
│   │   ├── growing-up/         # 🌱 Growing up photos
│   │   ├── current/            # ✨ Current era photos
│   │   ├── together/           # 💛 Photos together
│   │   ├── then.jpg            # Then slider image
│   │   └── now.jpg             # Now slider image
│   └── music/
│       └── birthday.mp3        # 🎵 Background music
└── README.md                   # This file
```

## 🎨 How to Edit Content

### Changing Messages

Edit `data/messages.json` to update:

| Section | What it controls |
|---------|-----------------|
| `hero.title` | Main birthday heading |
| `hero.subtitle` | Subtitle under the heading |
| `balloons` | Messages shown in floating balloons |
| `gallery.categories` | Photo gallery categories & image paths |
| `slider` | Then vs Now section labels & images |
| `wish.message` | Birthday wish text |
| `ending.quote` | Final closing quote |
| `ending.badge` | Golden badge text |

### Changing the Letter

Edit `data/letter.txt` — this is **plain text**. Write your letter here and it will be displayed in a beautiful handwritten style.

> **Tip:** Line breaks are preserved — just press Enter in the `.txt` file for a new line.

### Adding Photos

1. Place photos in the appropriate `assets/images/` subfolder:
   - `childhood/` — Early memories
   - `growing-up/` — School & teenage years
   - `current/` — Recent photos
   - `together/` — Photos of you together
2. Update the image paths in `data/messages.json` under the `gallery.categories` array
3. **Supported formats:** `.jpg`, `.png`, `.webp`
4. **Recommended:** Square or portrait orientation, at least **500px wide**

### Adding Music

1. Place your `.mp3` file in `assets/music/`
2. Rename it to `birthday.mp3` (or update the path in `js/music.js`)
3. The music toggle button will appear in the **top-right corner** 🎵

## 🚀 Running Locally

```bash
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js
npx serve .

# Option 3: Using VS Code
# Install 'Live Server' extension, right-click index.html → Open with Live Server
```

Then open [http://localhost:8000](http://localhost:8000) (or the port shown).

## 🌐 Deployment (GitHub Pages)

1. Push code to GitHub
2. Go to repo **Settings → Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)`
4. Save and wait ~2 minutes
5. Your site will be live at `https://yourusername.github.io/repo-name/`

## 💡 Tips

- ✅ Test changes locally before pushing
- 📦 Optimize images for web (compress to **< 500KB** each)
- 🖼️ Use portrait photos for gallery items
- ↩️ The letter supports line breaks — just press Enter in the `.txt` file
- 🎨 Colors and animations are defined in `css/styles.css` if you want to customize the theme

## 📱 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| iOS Safari | ✅ Mobile |
| Chrome for Android | ✅ Mobile |

---

<p align="center">Made with 💛 for the golden girl</p>
