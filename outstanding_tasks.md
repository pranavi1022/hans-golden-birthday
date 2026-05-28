# 💛 Hans's Golden Birthday Website — Outstanding Tasks & Asset Guide ✨

This document outlines the **exact files, assets, and steps** needed to finalize and run the **Happy Golden Birthday Website for Hans**. 

The entire visual architecture, interaction engine, and dynamic loading system are fully implemented. The website is configured to pull all messages, the letter, and photos dynamically. The repository is pushed and hosted on GitHub Pages, but currently contains **empty folder structures** (marked by `.gitkeep` placeholder files). 

To complete the site, follow this comprehensive guide to prepare your assets and update your content.

---

## 📂 1. Directory Structure for Assets

Place your images and audio files exactly in the following directories in your project:

```text
hans-bday/
├── assets/
│   ├── images/
│   │   ├── childhood/         # 🧒 Place Childhood photos here
│   │   ├── growing-up/        # 🌱 Place Growing Up photos here
│   │   ├── current/           # ✨ Place Current/Solo photos here
│   │   ├── together/          # 💛 Place Photos of you together here
│   │   ├── then.jpg           # 📚 Childhood photo for slider (draggable)
│   │   └── now.jpg            # 🎓 Current photo for slider (draggable)
│   └── music/
│       ├── birthday.mp3       # 🎵 Main background music track
│       ├── pop.mp3            # 🎈 Sound effect: balloon pop
│       └── blow.mp3           # 🎂 Sound effect: candle blow out
```

---

## 📸 2. Preparing and Naming Photo Assets

To maintain the luxury design, polaroid frames, and alignment, prepare your photos using the recommended naming conventions and formats.

### A. The Draggable "Then vs Now" Slider
This slider compares two photos side-by-side. For the smoothest sliding transition, try to use photos with similar proportions (vertical orientations work best).

| Filename | Description | Location | Format |
| :--- | :--- | :--- | :--- |
| `then.jpg` | Childhood or "6th class" photo | `assets/images/then.jpg` | `.jpg` or `.png` |
| `now.jpg` | BTech / current photo | `assets/images/now.jpg` | `assets/images/now.jpg` | `.jpg` or `.png` |

---

### B. Polaroid Memory Gallery Categories
The gallery displays photo cards styled like cinematic vintage Polaroids. The polaroids are organized under four category tabs. You can drop any number of photos in these folders, but make sure their names match what is written in `data/messages.json`.

#### Category 1: "Little Hans to Golden Girl" (Childhood)
*   **Path**: `assets/images/childhood/`
*   **Default Filenames expected**: `1.jpg`, `2.jpg`, `3.jpg`

#### Category 2: "Growing Up" (Teenage/School days)
*   **Path**: `assets/images/growing-up/`
*   **Default Filenames expected**: `1.jpg`, `2.jpg`, `3.jpg`

#### Category 3: "The Golden Girl Now" (Present-day Solos)
*   **Path**: `assets/images/current/`
*   **Default Filenames expected**: `1.jpg`, `2.jpg`, `3.jpg`

#### Category 4: "Our Moments" (Group/Friendship Photos)
*   **Path**: `assets/images/together/`
*   **Default Filenames expected**: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `7.jpg`, `8.jpg`, `9.jpg`

> [!TIP]
> **Cropping Tip**: Polaroid crops are square by default, but our container will automatically handle standard aspect ratios using CSS `object-fit: cover`. Standard vertical/portrait phone photos look gorgeous.

---

## 🎵 3. Preparing Audio Assets

The website uses high-fidelity audio triggers. All assets should be in standard `.mp3` format.

| Filename | Purpose | Description / Recommendations | Path |
| :--- | :--- | :--- | :--- |
| `birthday.mp3` | Background Soundtrack | A beautiful, nostalgic, or cheerful background track. It will play when the user clicks the floating music player or opens the envelope. | `assets/music/birthday.mp3` |
| `pop.mp3` | Balloon Pop Sound | A crisp, quick balloon pop sound effect. Triggered when balloons are clicked. | `assets/music/pop.mp3` |
| `blow.mp3` | Candle Blow Sound | A soft "whoosh" sound effect representing blowing out a candle. Triggered when clicking "Blow the Candles". | `assets/music/blow.mp3` |

---

## ✏️ 4. Updating and Customizing Text Content

You can easily change all texts on the website without writing any code. Two configuration files handle all text rendering.

### A. The General Configuration: `data/messages.json`
Open this file to customize any header, badge, or image file paths.

```json
{
  "hero": {
    "title": "HAPPY GOLDEN BIRTHDAY TO MY HANSSS 💛✨",
    "subtitle": "My Twin Soul",
    "badge": "✨ 19 on 19 ✨"
  },
  "balloons": {
    "heading": "Pop a Balloon 🎈",
    "messages": [
      "Golden bday for my golden girl 💛✨",
      "More adventures loading… 🌍💖",
      "6th class us would be surprised 😭💛"
    ]
  },
  "gallery": {
    "heading": "Our Golden Memories 📸",
    "categories": [
      {
        "name": "Little Hans to Golden Girl",
        "emoji": "🧒✨",
        "images": [
          "assets/images/childhood/1.jpg",
          "assets/images/childhood/2.jpg",
          "assets/images/childhood/3.jpg"
        ]
      },
      ...
    ]
  },
  "slider": {
    "heading": "Then → Now 💛",
    "thenLabel": "Then 📚",
    "nowLabel": "Now 🎓",
    "thenImage": "assets/images/then.jpg",
    "nowImage": "assets/images/now.jpg"
  },
  "wish": {
    "heading": "Make a Golden Wish 🎂",
    "buttonText": "✨ Blow the Candles ✨",
    "message": "Make a wish ✨ May all your golden dreams come true 💛"
  },
  "letter": {
    "heading": "A Letter For You 💌",
    "seal": "💛"
  },
  "ending": {
    "quote": "Forever agreement. No way back 🫂💖",
    "badge": "✨ 19 on 19 ✨",
    "hearts": "💛✨💛"
  }
}
```

*   **To add more images**: Just add more image file paths to the `"images": []` arrays in the gallery section.
*   **To edit labels**: Modify the title, subtitle, or button texts directly.

---

### B. The Personal Handwriting Letter: `data/letter.txt`
Open this plain text file and type your heart out! 
*   The webpage automatically reads this file and formats it using an elegant hand-drawn script font (*Dancing Script*).
*   **Formatting**: Standard line breaks and paragraphs are preserved on the page.

---

## 🚀 5. Testing Locally & Deploying to the Live Site

Once your assets are inside the folders, follow these steps to test and release the updates:

### Step 1: Run the Website Locally
To verify that your photos and music load correctly before deploying, start a local server:
```bash
# In the terminal within the "hans bday" directory, run:
npx -y serve .
```
Open the local URL (usually `http://localhost:3000` or `http://localhost:8080`) in your web browser.

---

### Step 2: Push and Go Live!
Since the website is hosted on GitHub Pages, pushing your updates to GitHub will auto-update the live link within 1–2 minutes.

Run these command-line steps inside your local project terminal:

```bash
# 1. Stage all new images, audio, and updated text files
git add -A

# 2. Commit the changes
git commit -m "feat: add real photos, background music, and pop/blow sound effects"

# 3. Push to GitHub
git push
```

Within a minute of pushing, your updated memories website will be live at:
**[https://pranavi1022.github.io/hans-golden-birthday/](https://pranavi1022.github.io/hans-golden-birthday/)** 💛✨
