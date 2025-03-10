const CACHE_NAME = 'anime-cache'

//lista de armazenamento
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/login.index',
  '/cadastro.index',
  '/pesquisar.index',
  '/animes.json',
  '/manifast.json'
];

// salvar arquivos
self.addEventListener('install', event =>{
  console.log('service worker instalado!');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Arquivos armazenados no cache:', urlsToCache);
        return cache.addAll(urlsToCache );
    })
  );
});

//Ativação: remove caches antigos
self.addEventListener ('activate', event =>{
  console.log('Service ativado ativado!');
  event.respondWith(
    caches.keys().then(cachesNames => {
      return Promise.all(
        cachesNames.filter(cache => cache !== CACHE_NAME)
        .map(cache => caches.delete(cache))
      );
    })
  );
});

//requisições fetch
self.addEventListener('fetch', event =>{
  event.responWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
