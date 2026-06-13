// firebase-messaging-sw.js
// Đặt file này ở THƯ MỤC GỐC của website (cùng cấp với index.html)

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCOHY29HgPjxXsnqDhwToSf-BNdQJFAlsQ",
  authDomain: "pivo-verse.firebaseapp.com",
  projectId: "pivo-verse",
  storageBucket: "pivo-verse.firebasestorage.app",
  messagingSenderId: "239612370929",
  appId: "1:239612370929:web:cbf5af0a670236fedc6e50"
});

const messaging = firebase.messaging();

// Xử lý thông báo khi app đang ở background
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message:', payload);

  const { title, body, icon } = payload.notification || {};

  self.registration.showNotification(title || 'Pivo CRM', {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {},
    vibrate: [200, 100, 200],
    requireInteraction: false
  });
});

// Khi người dùng nhấn vào thông báo
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
