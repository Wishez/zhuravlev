// 1. Open cache
// 2. Cache files
// 3. Confirm whether all the requored assets are cached or not

const CACHE_NAME = 'filipp-zhuravlev-cache-v1';
const urlsToCache = [
	'/',
	'./css/main.css',
	'./components/Article.js',
	'./components/Blog.js',
	'./components/About.js',
	'./components/Archive.js',
	'./img/footer-background.jpg',
	'./img/header-background.jpg'
];

self.addEventListener('install', e => {
	e.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache);
			})
	);	
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request)
			.then(resp => {
				if (resp) 
					return resp;

				const fetchRequest = e.request.clone();

				return fetch(fetchRequest)
					.then(resp => {
						if(!resp || resp.status !== 200 || resp.type !== 'basic') {
			              return resp;
			            }
			            var responseToCache = resp.clone();
			            
						caches.open(CACHE_NAME)
							.then(cache => {
								cache.put(e.request, responseToCache);
							});

						return resp;
					});


			})
	);
});