/**
 * キャッシュファイルの設定と、インストール処理とキャッシュロード処理を記述
 */


// キャッシュファイルの指定
// urlsToCacheで登録したURLをキャッシュしてくれ、オフラインでも閲覧可
var CACHE_NAME = 'gps-sample-caches';
var urlsToCache = [
    '/index.html',
];
// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
