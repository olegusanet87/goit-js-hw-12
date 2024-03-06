import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import Error from '../img/bi_x-octagon.svg';




export function clearGallery() {
	const gallery = document.getElementById('.gallery');
	gallery.innerHTML = '';
}


export function displayImages(images) {
	const gallery = document.querySelector('.gallery');
	const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
		`<li class="gallery-item"> 
		<div class="gallery-card">
		<a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
						</a>
            <div class="image-details">
                <p class="detail-value"><b>Likes:</b> ${likes}</p>
                <p class="detail-value"><b>Views:</b> ${views}</p>
                <p class="detail-value"><b>Comments:</b> ${comments}</p>
                <p class="detail-value"><b>Downloads:</b> ${downloads}</p>
            </div>
						</div>
        </li>`
	).join("");

	gallery.insertAdjacentHTML("beforeend", markup);


	const lightbox = new SimpleLightbox('.gallery a', {
		captionsData: 'alt',
		captionDelay: 250,
	});

}

export function displayErrorMessage(message) {
	iziToast.error({
		title: 'Error',
		message: message,
		position: 'topCenter',
		class: 'popup-message',
		theme: 'dark',
		backgroundColor: '#ef4040',
		messageColor: '#fff',
		position: 'topRight',
		timeout: 3000,
		iconUrl: Error
	});
}


