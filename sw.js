const version = "2018-09-24";
const cacheName = `timezone-dashboard-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
       './',
       './index.html',
       './bower_components/bootstrap/dist/css/bootstrap.min.css',
       './bower_components/jquery/dist/jquery.min.js',
       './bower_components/handlebars/handlebars.js',
       './bower_components/bootstrap/dist/js/bootstrap.min.js',
       './bower_components/moment/min/moment.min.js',
       './bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
       './bower_components/typeahead.js/dist/typeahead.bundle.min.js',
       './bower_components/ember/ember.min.js',
       './bower_components/ember-data/ember-data.min.js',
       './bower_components/ember/ember-template-compiler.js'
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', event => {
   console.log(event.request.url);

  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
