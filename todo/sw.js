const CACHE_NAME = 'todo-v3'; // 升級版本號，強制瀏覽器觸發更新並清空舊快取
const ASSETS = [
  './login.html',
  './index.html',
  './manifest.json',
  './icon-192.png',      // 確保將你的 PNG 圖示寫入快取
  './icon-512.png'
];

// 1. 安裝時快取基本檔案
self.addEventListener('install', (e) => {
  self.skipWaiting(); // 強制新版 Service Worker 立即生效，不用等分頁關閉
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. 啟用時清掉舊版快取（當 CACHE_NAME 改變時自動清理）
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // 讓新版 SW 立即控制所有開啟的網頁
  );
});

// 3. 攔截請求（網路優先，成功時同步更新快取，失敗時走本機快取）
self.addEventListener('fetch', (e) => {
  // 只攔截本站的靜態資源請求（避免去干擾 Firebase 的 API 串接）
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // 網路請求成功 (status 200)，將最新檔案複製一份更新進快取中
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // 當沒有網路，或是網路斷線封包丟失時，改從快取拿舊檔案頂替
          return caches.match(e.request);
        })
    );
  }
});
