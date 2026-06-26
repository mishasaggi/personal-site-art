const gallery = document.querySelector('.gallery');
const overlay = document.querySelector('.overlay');
const overlayImage = overlay.querySelector('img');
const overlayClose = overlay.querySelector('.close');

console.log('Welcome to my art gallery! I know the pictures have pretty inconsistent lighting and resolutions. For my future projects I will learn how to take good pictures :)')

function generateHTML([h, v], image) {
  return `
    <div class="item h${h} v${v}">
      <img src="images/${image}">
      <div class="item__overlay">
        <button>View →</button>
      </div>
    </div>
  `;
}

function randomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

// second approach
const images = Array.from({ length: 41 }, (_, i) => `${i + 1}.jpg`);
const counts = {};
images.forEach(img => counts[img] = 0);
let seen = new Set();

function pickImage() {
  let pool;
  const unseen = images.filter(img => !seen.has(img)); // array
  const underLimit = images.filter(img => counts[img] < 2); // array
  const aboutToExceed = images.some(img => counts[img] === 2); //boolean

  if (unseen.length > 0 && aboutToExceed) {
    //prioritize unseen images
    pool = unseen;
  } else if (underLimit.length > 0) {
    // prefer images under the repetition limit
    pool = underLimit;
  } else {
    // everything has been seen and used, use full randomness for further repetition
    pool = images
  }
  const choice = pool[Math.floor(Math.random() * pool.length)];
  counts[choice]++;
  seen.add(choice);

  return choice;
}

function handleClick(e) {
  const src = e.currentTarget.querySelector('img').src;
  overlayImage.src = src;
  overlay.classList.add('open');
}

function close() {
  overlay.classList.remove('open');
}

// create layout with varying h and v spans where (sometimes randomly) picked image is added
const gridLayouts = Array.from({ length: 123 }, () => [randomNumber(4), randomNumber(4)])
  .concat(Array.from({ length: 18 }, () => [1, 1]));

const gridLayoutHtml = gridLayouts.map(layout => generateHTML(layout, pickImage())).join('');
gallery.innerHTML = gridLayoutHtml;

const items = document.querySelectorAll('.item');
items.forEach(item => item.addEventListener('click', handleClick));
overlayClose.addEventListener('click', close);
