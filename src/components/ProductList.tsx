import { ProductType } from '../types/ProductType';
import Product from './Product';

interface ProductListProps {
	products: ProductType[];
}

const ProductList = ({ products }: ProductListProps) => {
	return (
		<ul className="list-unstyled">
			{products.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</ul>
	);
};

export default ProductList;
