'use strict';
import { searchImages } from './js/pixabay-api.js';
import { displayImages, clearGallery, displayErrorMessage } from './js/render-functions.js';

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";




import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const formsubmit = document.querySelector('.form-submit');
formsubmit.addEventListener('mouseover', function () {
	formsubmit.classList.add('hover-effect');
});

formsubmit.addEventListener('mouseout', function () {
	formsubmit.classList.remove('hover-effect');
});

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('.form');
	const input = document.querySelector('.form-input');

	input.addEventListener('click', function () {
		input.classList.add('press-effect');
	});

	input.addEventListener('mouseover', function () {
		input.classList.add('hover-effect');
	});

	input.addEventListener('mouseout', function () {
		input.classList.remove('hover-effect');
	});

	const formsubmit = document.querySelector('.form-submit');
	formsubmit.addEventListener('mouseover', function () {
		formsubmit.classList.add('hover-effect');
	});

	formsubmit.addEventListener('mouseout', function () {
		formsubmit.classList.remove('hover-effect');
	});

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const searchTerm = input.value.trim();

		if (searchTerm === '') {
			displayErrorMessage('Please enter a search term.');
			return;
		}
		const spanLoader = document.querySelector('.loader');
		spanLoader.classList.add('loading');
		clearGallery();

		searchImages(searchTerm)
			.then(images => {
				if (images.length === 0) {
					displayErrorMessage('Sorry, there are no images matching your search query. Please try again.');
					return;
				}
				displayImages(images);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
				displayErrorMessage('An error occurred while fetching data. Please try again later.');
			})
			.finally(() => {
				spanLoader.classList.remove('loading');
			});
	});
});