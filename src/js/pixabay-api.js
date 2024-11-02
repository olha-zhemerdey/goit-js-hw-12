import axios from "axios";

const API_KEY = '46775903-5820c4e6d789cb0cb95772c39';
const URL = 'https://pixabay.com/api/?';

export async function getPhotos(q, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });
  const res = await axios.get(`${URL}${params}`)
  try {
    return res.data;
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Ups.. Something wrong',
      position: 'topRight',
    });
  }
}

