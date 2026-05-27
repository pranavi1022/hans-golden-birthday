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
- 📝 **ALL content editable** without touching code

## 📂 Project Structure

```
hans-golden-birthday/
├── index.html                  # Main HTML file
├── css/
│   ├── index.css               # Design system (colors, fonts, variables)
│   ├── hero.css                # Hero section + music toggle
│   ├── balloons.css            # Balloon pop interaction
│   ├── gallery.css             # Memory photo gallery
│   ├── slider.css              # Then vs Now comparison
│   ├── wish.css                # Birthday cake + confetti
│   ├── letter.css              # Handwritten letter card
│   ├── ending.css              # Stars + lanterns finale
│   └── animations.css          # Global animation utilities
├── js/
│   ├── main.js                 # Master init + content loader
│   ├── particles.js            # Hero gold particle canvas
│   ├── balloons.js             # Balloon pop + burst effect
│   ├── slider.js               # Before/after drag slider
│   ├── wish.js                 # Candle blow + confetti
│   ├── music.js                # Background music toggle
│   └── animations.js           # Scroll-reveal + stars canvas
├── data/
│   ├── messages.json           # ✏️ ALL editable text content
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

## ✏️ How to Edit Content

> **You NEVER need to touch any code!** Just edit `data/messages.json` and `data/letter.txt`.

### Complete Editable Fields in `messages.json`

| JSON Key | What it controls | Example |
|----------|-----------------|---------|
| `hero.title` | Main birthday heading | `"HAPPY GOLDEN BIRTHDAY TO MY HANSSS 💛✨"` |
| `hero.subtitle` | Subtitle under the heading | `"My Twin Soul"` |
| `hero.badge` | Badge text below subtitle | `"✨ 19 on 19 ✨"` |
| `balloons.heading` | Section heading for balloons | `"Pop a Balloon 🎈"` |
| `balloons.messages[0]` | First balloon message | `"Golden bday for my golden girl 💛✨"` |
| `balloons.messages[1]` | Second balloon message | `"More adventures loading… 🌍💖"` |
| `balloons.messages[2]` | Third balloon message | `"6th class us would be surprised 😭💛"` |
| `gallery.heading` | Section heading for gallery | `"Our Golden Memories 📸"` |
| `gallery.categories[].name` | Category title | `"Childhood Memories"` |
| `gallery.categories[].emoji` | Emoji before category title | `"👶"` |
| `gallery.categories[].images[]` | Photo file paths | `"assets/images/childhood/1.jpg"` |
| `slider.heading` | Section heading for slider | `"Then → Now 💛"` |
| `slider.thenLabel` | Label on the "then" side | `"Then 📚"` |
| `slider.nowLabel` | Label on the "now" side | `"Now 🎓"` |
| `slider.thenImage` | Then photo path | `"assets/images/then.jpg"` |
| `slider.nowImage` | Now photo path | `"assets/images/now.jpg"` |
| `wish.heading` | Section heading for wish | `"Make a Golden Wish 🎂"` |
| `wish.buttonText` | Blow candles button text | `"✨ Blow the Candles ✨"` |
| `wish.message` | Birthday wish text | `"Make a wish ✨ May all your golden dreams come true 💛"` |
| `letter.heading` | Section heading for letter | `"A Letter For You 💌"` |
| `letter.seal` | Wax seal emoji | `"💛"` |
| `ending.quote` | Final closing quote | `"Forever agreement. No way back 🫂💖"` |
| `ending.badge` | Golden badge text | `"✨ 19 on 19 ✨"` |
| `ending.hearts` | Hearts below the badge | `"💛✨💛"` |

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
3. For the slider: place `then.jpg` and `now.jpg` directly in `assets/images/`
4. **Supported formats:** `.jpg`, `.png`, `.webp`
5. **Recommended:** Square or portrait orientation, at least **500px wide**

### Adding Music

1. Place your `.mp3` file in `assets/music/`
2. Rename it to `birthday.mp3` (or update the path in `js/music.js`)
3. The music toggle button will appear in the **top-right corner** 🎵

## 🚀 Running Locally

```bash
# Option 1: Using Node.js
npx serve .

# Option 2: Using Python
python -m http.server 8000

# Option 3: Using VS Code
# Install 'Live Server' extension, right-click index.html → Open with Live Server
```

Then open [http://localhost:8000](http://localhost:8000) (or the port shown).

## 🌐 Deployment (GitHub Pages)

1. Push code to GitHub
2. Go to repo **Settings → Pages**
3. Source: **Deploy from branch** → `master` → `/ (root)`
4. Save and wait ~2 minutes
5. Your site will be live at `https://pranavi1022.github.io/hans-golden-birthday/`

### Pushing Updates

After editing messages, photos, or letter:
```bash
git add -A
git commit -m "Update content"
git push
```
GitHub Pages will auto-redeploy in ~1 minute.

## 💡 Tips

- ✅ Test changes locally before pushing
- 📦 Optimize images for web (compress to **< 500KB** each)
- 🖼️ Use portrait photos for gallery items
- ↩️ The letter supports line breaks — just press Enter in the `.txt` file
- 🎨 Colors and animations are in the `css/` files if you want to customize the theme

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
