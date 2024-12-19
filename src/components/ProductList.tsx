import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductType';
import Product from './Product';
import { products } from '../data/product-data';

interface Props {
	categoryId: number;
}

const ProductList = ({ categoryId }: Props) => {
	const [getProducts, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		if (categoryId === 0) setProducts(products);
		else {
			const filteredProducts = products.filter((p) => p.categoryId === categoryId);
			setProducts(filteredProducts);
		}
	}, [categoryId]);

	return (
		<ul className="list-unstyled">
			{getProducts.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</ul>
	);
};

export default ProductList;
