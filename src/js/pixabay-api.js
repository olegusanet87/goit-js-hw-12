'use strict';

const KEY = '42541165-a3d46185342d32ff55345145c';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = true;


export function searchImages(searchTerm) {
	const QUERY = encodeURIComponent(searchTerm);
	const LINK = `${BASE_URL}?key=${KEY}&q=${QUERY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`;
	return fetch(LINK)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => data.hits)
		.catch(error => {
			throw new Error('Error fetching data:', error);
		});
}