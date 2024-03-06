'use strict';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';


export async function searchImages(searchTerm, page, perPage = 15) {
	const API_KEY = '42541165-a3d46185342d32ff55345145c';

	try {
		const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&page=${page}&per_page=${perPage}`);
		return response.data.hits;
	} catch (error) {
		throw new Error('Failed to fetch images from Pixabay API');
	}
}




