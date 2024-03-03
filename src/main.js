'use strict';
import { searchImages } from './js/pixabay-api.js';
import { displayImages, clearGallery, displayErrorMessage } from './js/render-functions.js';

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";




import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";



const formsubmit = document.querySelector('.form-submit');
formsubmit.addEventListener('mouseover', function () {
	formsubmit.classList.add('hover-effect');
});

formsubmit.addEventListener('mouseout', function () {
	formsubmit.classList.remove('hover-effect');
});

let searchTerm = '';
let page = 1;
let loadMoreBtn;
let loadingMoreSpan;

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form');
	const input = document.querySelector('.form-input');
	const gallery = document.querySelector('.gallery');
	loadMoreBtn = document.querySelector('.loadmore');
	loadingMoreSpan = document.querySelector('.loading-more');



	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		searchTerm = input.value.trim();
		if (searchTerm === '') {
			displayErrorMessage('Please enter a search term.');
			return;
		}
		page = 1;
		await searchAndDisplayImages();
	});

	loadMoreBtn.addEventListener('click', async function () {
		page++;
		loadMoreBtn.style.display = 'none';
		loadingMoreSpan.style.display = 'block';

		const galleryItemHeight = getHeight();

		if (galleryItemHeight) {
			window.scrollBy({
				top: galleryItemHeight * 2,
				behavior: 'smooth'
			});
		}
		await searchAndDisplayImages(searchTerm);

	})




	getHeight();
});

function getHeight() {
	const galleryItem = document.querySelector('.gallery-item');
	if (galleryItem) {
		const galleryItemHeight = galleryItem.getBoundingClientRect().height;
		console.log(galleryItemHeight);
		return galleryItemHeight;
	}
	return null;
}



async function searchAndDisplayImages() {
	try {
		const images = await searchImages(searchTerm, page);
		const totalHits = images.totalHits;
		const totalImage = page * 15;

		if (totalImage >= totalHits) {
			loadMoreBtn.style.display = 'none';
			displayErrorMessage("We're sorry, but you've reached the end of search results.");
			console.log(images.totalHits);

			return;
		}
		displayImages(images);


		if (images.length < 15) {
			loadMoreBtn.style.display = 'none';
		} else {
			loadMoreBtn.style.display = 'block';
		}
	} catch (error) {
		displayErrorMessage('An error occurred while fetching data. Please try again later.');
	} finally {
		loadingMoreSpan.style.display = 'none';
	}
}



