import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import worker_script from './workers/notifications';
import viteLogo from '/vite.svg';

let worker: Worker;

function App() {
	if (window.Worker) worker = new Worker(worker_script);

	useEffect(() => {
		worker.postMessage('Beunos Dias!');
	});

	const [count, setCount] = useState(0);

	const handleNotification = async () => {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			console.log('✅ Уведомления разрешены');
		} else {
			console.log('❌ Уведомления отклонены');
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
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<button onClick={handleNotification}>Уведолмения</button>
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
