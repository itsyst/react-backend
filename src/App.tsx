import { useState } from 'react';
import Category from './components/Category';
import ProductList from './components/ProductList';
import UserList from './components/UserList';
import './App.css';

function App() {
	const [categoryId, setCategoryId] = useState<number>(0);

	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = parseInt(event.target.value, 10);
		setCategoryId(selectedId);
	};

	return (
		<>
			<Category onSelect={onSelect} categoryId={categoryId} />
			<ProductList categoryId={categoryId} />
			<UserList />
		</>
	);
}

export default App;
