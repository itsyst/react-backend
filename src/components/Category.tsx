import { useEffect, useState } from 'react';
import { CategoryType } from '../types/CategoryType';
import { categories } from '../data/category-data';

interface Props {
	categoryId: number;
	onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Category = ({ categoryId, onSelect }: Props) => {
	const [getCategories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		console.log('Fetching Categories ...', categoryId);
		setCategories(categories);
	}, [categoryId]);

	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<label className="input-group-text">Options</label>
			</div>
			<select className="custom-select" onChange={onSelect}>
				<option value="0"> All Categories...</option>
				{getCategories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Category;
