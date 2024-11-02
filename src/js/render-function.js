

export function createMarkup(arr) {
    return arr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img
                class="gallery-image"
                src="${webformatURL}"
                alt="${tags}"
                width="360"
              />
            </a>
            <ul class="gallery-info">
                  <li class="info-block">
                    <h5>Likes</h5>
                    <p>${likes}</p>
                  </li>
                  <li class="info-block">
                    <h5>Views</h5>
                    <p>${views}</p>
                  </li>
                  <li class="info-block">
                    <h5>Comments</h5>
                    <p>${comments}</p>
                  </li>
                  <li class="info-block">
                    <h5>Downloads</h5>
                    <p>${downloads}</p>
                  </li>
                </ul>
              </li>`
      )
      .join('');
  }
  