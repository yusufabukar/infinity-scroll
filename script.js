const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let pageReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = new Array();

// Unsplash API
const APIKey = 'eVZ6PHwXp7z3mw3C7ZYW4qwTWAeoWu924mVuV4BaYlo';
const query = 'nature,water,space';
let count = 5; // Initial Load
const API = `https://api.unsplash.com/photos/random/?client_id=${APIKey}&featured&query=${query}&count=${count}`;

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		pageReady = true;
		loader.hidden = true;
		count = 30;
	};
};

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	};
};

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photos.length;

	photos.forEach(photo => {
		const a = document.createElement('a');
		setAttributes(a, {
			href: photo.links.html,
			target: '_blank'
		});

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		img.addEventListener('load', imageLoaded);

		a.appendChild(img);
		imageContainer.appendChild(a);
	});
};

async function getPhotos() {
	try {
		const response = await fetch(API);
		photos = await response.json();
		displayPhotos();
	} catch (error) {
		console.log('Error Retrieving Photos:', error)
	};
};

window.addEventListener('scroll', () => {
	// Load more photos when user scrolls close to end
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && pageReady) {
		pageReady = false;
		getPhotos();
	};
});

getPhotos();