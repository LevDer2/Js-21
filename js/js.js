const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryContainer = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");

let currentIndex = -1;

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }, index) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
      />
    </a>
  </li>`
  )
  .join("");

galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  evt.preventDefault();

  const target = evt.target;
  if (!target.classList.contains("gallery__image")) return;

  currentIndex = Number(target.dataset.index);
  openModal(currentIndex);
}

function openModal(index) {
  const { original, description } = galleryItems[index];
  lightbox.classList.add("is-open");
  lightboxImage.src = original;
  lightboxImage.alt = description;

  window.addEventListener("keydown", onKeyPress);
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function closeModal() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  currentIndex = -1;

  window.removeEventListener("keydown", onKeyPress);
}

function onKeyPress(evt) {
  switch (evt.code) {
    case "Escape":
      closeModal();
      break;
    case "ArrowRight":
      if (currentIndex < galleryItems.length - 1) {
        currentIndex += 1;
        updateModalImage(currentIndex);
      }
      break;
    case "ArrowLeft":
      if (currentIndex > 0) {
        currentIndex -= 1;
        updateModalImage(currentIndex);
      }
      break;
  }
}

function updateModalImage(index) {
  const { original, description } = galleryItems[index];
  lightboxImage.src = original;
  lightboxImage.alt = description;
}