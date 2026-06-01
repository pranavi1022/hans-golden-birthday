/* ============================================
   STORY.JS — Our Story Timeline Builder
   Dynamically creates the story timeline from
   messages.json data
   ============================================ */

function populateStory(storyData) {
  if (!storyData) return;

  const heading = document.getElementById('story-heading');
  const timeline = document.getElementById('story-timeline');
  if (!heading || !timeline) return;

  heading.textContent = storyData.heading || 'Our Story 💛';

  storyData.chapters.forEach(function(chapter, index) {
    // Create chapter element
    const chapterEl = document.createElement('div');
    chapterEl.className = 'story-chapter reveal';
    chapterEl.style.transitionDelay = (index * 0.15) + 's';

    // Chapter number (dot on timeline)
    const numberEl = document.createElement('div');
    numberEl.className = 'chapter-number';
    numberEl.textContent = chapter.number;

    // Chapter card
    const cardEl = document.createElement('div');
    cardEl.className = 'chapter-card';

    // Chapter title
    const titleEl = document.createElement('h3');
    titleEl.className = 'chapter-title';
    titleEl.textContent = 'Chapter ' + chapter.number + ' — ' + chapter.title;

    // Chapter content
    const contentEl = document.createElement('p');
    contentEl.className = 'chapter-content';
    contentEl.textContent = chapter.content;

    cardEl.appendChild(titleEl);
    cardEl.appendChild(contentEl);

    // Optional image (Chapter 5 has trio photo)
    if (chapter.image) {
      const photoWrapper = document.createElement('div');
      photoWrapper.className = 'chapter-photo';
      const img = document.createElement('img');
      img.src = chapter.image;
      img.alt = 'Chapter ' + chapter.number + ' — ' + chapter.title;
      img.loading = 'lazy';
      img.onerror = function() {
        // Hide photo wrapper if image doesn't exist
        photoWrapper.style.display = 'none';
      };
      photoWrapper.appendChild(img);
      cardEl.appendChild(photoWrapper);
    }

    chapterEl.appendChild(numberEl);
    chapterEl.appendChild(cardEl);
    timeline.appendChild(chapterEl);
  });
}

function initStory() {
  // Story uses the same reveal/IntersectionObserver from animations.js
  // No additional JS needed beyond populateStory
}
