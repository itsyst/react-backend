import { ProductType } from '../types/ProductType';

interface Props {
	product: ProductType;
}

const Product = ({ product }: Props) => {
	return <li key={product.id}>{product.name}</li>;
};

export default Product;
