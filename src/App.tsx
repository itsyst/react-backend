import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Category from './components/Category';
import { products } from './data/product-data';
import { categories } from './data/category-data';
import { ProductType } from './types/ProductType';
import { CategoryType } from './types/CategoryType';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
	const [getProducts, setProducts] = useState<ProductType[]>([]);
	const [getCategories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		console.log('Fetching Categories and Products!');
		setCategories(categories);
		setProducts(products);
	}, []);

	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = parseInt(event.target.value);

		if (!isNaN(selectedId)) {
			const filteredProducts = products.filter((p) => p.categoryId === selectedId);
			setProducts(filteredProducts);
		} else setProducts(products);

		console.log(selectedId);
	};

	return (
		<>
			<Category categories={getCategories} onSelect={onSelect} />
			<ProductList products={getProducts} />
		</>
	);
}

export default App;
