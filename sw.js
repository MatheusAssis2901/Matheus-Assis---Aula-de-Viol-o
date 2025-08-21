// Nome do cache
const CACHE_NAME = 'matheus-assis-violao-cache-v1';

// Arquivos para cachear
const urlsToCache = [
  '/',
  'index.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
  'https://cdn.jsdelivr.net/npm/pitchy@4.1.0/dist/pitchy.min.js'
];

// Evento de instalação: abre o cache e adiciona os arquivos principais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: serve os arquivos do cache se estiverem disponíveis
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna a resposta do cache
        if (response) {
          return response;
        }
        // Senão, faz a requisição à rede
        return fetch(event.request);
      }
    )
  );
});

// Evento de ativação: limpa caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

