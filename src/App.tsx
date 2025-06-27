import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
	const [permission, setPermission] = useState<NotificationPermission>(
		Notification.permission,
	);

	// useEffect(() => {
	// 	if ('Notification' in window) {
	// 		Notification.requestPermission().then(setPermission);
	// 	}
	// }, []);

	const requestPerm = () => {
		Notification.requestPermission().then(setPermission);
	};
	// const simulatePush = async () => {
	// 	if (permission !== 'granted') {
	// 		alert('Разрешите уведомления');
	// 		return;
	// 	}

	// 	const registration = await navigator.serviceWorker.getRegistration();
	// 	if (registration?.active) {
	// 		registration.active.postMessage({
	// 			type: 'SIMULATE_PUSH',
	// 			payload: {
	// 				title: 'Привет от React!',
	// 				body: 'Это уведомление сработало через postMessage',
	// 			},
	// 		});
	// 	} else {
	// 		alert('Service Worker не активен');
	// 	}
	// };

	const subscribeToPush = async () => {
		if (permission !== 'granted') {
			alert('Сначала разрешите уведомления');
			return;
		}

		const registration = await navigator.serviceWorker.ready;

		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
		});

		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/subscribe`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(subscription),
			},
		);

		if (response.ok) {
			alert('✅ Подписка отправлена на сервер');
		} else {
			alert('❌ Ошибка отправки подписки');
		}
	};

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={subscribeToPush}>Уведолмения</button>
				<button onClick={requestPerm}>Доступ</button>

				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
