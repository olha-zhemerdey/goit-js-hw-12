// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './js/pixabay-api';
import { createMarkup } from './js/render-function';

const searchForm = document.querySelector('.feedback-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

let page = 1;
let searchPoint = '';

loader.style.display = 'none';
searchForm.addEventListener('submit', submitForm);

async function submitForm(e) {
  e.preventDefault();
  page = 1;
  loader.style.display = 'block';
  gallery.innerHTML = '';
  searchPoint = e.target.elements.input.value.trim();

  if (searchPoint.length === 0) {
    loader.style.display = 'none';
    return iziToast.error({
      title: 'Error',
      backgroundColor: 'tomato',
      message: 'Sorry, your query is empty. Please try again!',
      messageColor: 'white',
      messageSize: '20',
      position: 'bottomRight',
      close: true,
      displayMode: 2,
    });
  }

  const res = await getPhotos(searchPoint, page);
  try {
    if (res.hits.length === 0) {
      loadBtn.classList.add('is-hidden');
      gallery.innerHTML = '';
      return iziToast.error({
        title: 'Error',
        backgroundColor: 'tomato',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        messageSize: '20',
        position: 'bottomRight',
        close: true,
        displayMode: 2,
      });
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(res.hits));
    lightbox.refresh();
    if (res.totalHits > 15) {
      loadBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}

loadBtn.addEventListener('click', clickOnBtn);

async function clickOnBtn() {
  loader.style.display = 'block';
  page += 1;
  const res = await getPhotos(searchPoint, page);
  try {
    const lastPage = Math.ceil(res.totalHits / 15);
    if (lastPage === page) {
      loadBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'Error',
        backgroundColor: 'tomato',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: 'white',
        messageSize: '20',
        position: 'bottomRight',
        close: true,
        displayMode: 2,
      });
    }
    gallery.insertAdjacentHTML('beforeend', createMarkup(res.hits));
    const heightForScroll =
      gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: heightForScroll * 2,
      behavior: 'smooth',
    });
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
