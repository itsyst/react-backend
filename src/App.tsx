import { useState } from 'react';
import Category from './components/Category';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
	const [categoryId, setCategoryId] = useState<number>(0);

	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = parseInt(event.target.value, 10);
		setCategoryId(selectedId);

		console.log(selectedId);
	};

	return (
		<>
			<Category onSelect={onSelect} categoryId={categoryId} />
			<ProductList categoryId={categoryId} />
		</>
	);
}

export default App;
