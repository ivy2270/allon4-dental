const CACHE_NAME = 'todo-v1'; // 之後有更新，把版本號往上加（todo-v2, v3...），舊快取才會自動被清掉
const ASSETS = [
  './login.html',
  './index.html',
  './manifest.json'
];

// 安裝時快取基本檔案
self.addEventListener('install', (e) => {
  self.skipWaiting(); // 新版 Service Worker 不用等所有分頁關閉才生效
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 啟用時清掉舊版快取（CACHE_NAME 改變時才會用到）
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// 攔截請求（確保離線時或弱網環境能開啟基本介面）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});