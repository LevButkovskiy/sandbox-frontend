self.addEventListener('install', (event) => {
	console.log('[SW] Установлен');
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	console.log('[SW] Активирован');
});

self.addEventListener('push', (event) => {
	const data = event.data?.json() || {
		title: 'Без заголовка',
		body: 'Пустое уведомление',
	};

	const options = {
		body: data.body,
		icon: '/vite.svg',
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('message', (event) => {
	console.log('[SW] Получено сообщение:', event.data); // ➕

	if (event.data && event.data.type === 'SIMULATE_PUSH') {
		const data = event.data.payload || {
			title: 'Локальное уведомление',
			body: 'Имитация push без сервера',
		};

		self.registration.showNotification(data.title, {
			body: data.body,
			icon: '/vite.svg',
		});
	}
});
