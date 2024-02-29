import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import Error from '../img/bi_x-octagon.svg';

export function clearGallery() {
	const gallery = document.getElementById('gallery');
	gallery.innerHTML = '';
}

export function displayImages(images) {
	clearGallery();

	const gallery = document.querySelector('.gallery');
	const fragment = document.createDocumentFragment();

	images.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
		const galleryItem = document.createElement('li');
		galleryItem.classList.add('gallery-item');

		const galleryLink = document.createElement('a');
		galleryLink.classList.add('gallery-link');
		galleryLink.href = `${largeImageURL}`;

		const img = document.createElement('img');
		img.classList.add('gallery-image');
		img.src = `${webformatURL}`;
		img.alt = tags;
		galleryLink.appendChild(img);
		galleryItem.appendChild(galleryLink);

		const infoContainer = document.createElement('div');
		infoContainer.classList.add('image-details');

		const likesLabel = document.createElement('span');
		likesLabel.classList.add('detail-label');
		likesLabel.textContent = 'Likes:';
		infoContainer.appendChild(likesLabel);

		const likesValue = document.createElement('span');
		likesValue.classList.add('detail-value');
		likesValue.textContent = `${likes}`;
		infoContainer.appendChild(likesValue);

		const viewsLabel = document.createElement('span');
		viewsLabel.classList.add('detail-label');
		viewsLabel.textContent = 'Views:';
		infoContainer.appendChild(viewsLabel);

		const viewsValue = document.createElement('span');
		viewsValue.classList.add('detail-value');
		viewsValue.textContent = `${views}`;
		infoContainer.appendChild(viewsValue);

		const commentsLabel = document.createElement('span');
		commentsLabel.classList.add('detail-label');
		commentsLabel.textContent = 'Comments:';
		infoContainer.appendChild(commentsLabel);

		const commentsValue = document.createElement('span');
		commentsValue.classList.add('detail-value');
		commentsValue.textContent = `${comments}`;
		infoContainer.appendChild(commentsValue);

		const downloadsLabel = document.createElement('span');
		downloadsLabel.classList.add('detail-label');
		downloadsLabel.textContent = 'Downloads:';
		infoContainer.appendChild(downloadsLabel);

		const downloadsValue = document.createElement('span');
		downloadsValue.classList.add('detail-value');
		downloadsValue.textContent = `${downloads}`;
		infoContainer.appendChild(downloadsValue);

		galleryItem.appendChild(infoContainer);
		fragment.appendChild(galleryItem);
	});

	gallery.appendChild(fragment);
	const lightbox = new SimpleLightbox('.gallery a', {
		captionsData: 'alt',
		captionDelay: 250
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


