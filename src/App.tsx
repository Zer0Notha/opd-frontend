import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/store';

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>Hello world</Provider>
		</BrowserRouter>
	);
}

export default App;
