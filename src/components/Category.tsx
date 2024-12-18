import React from 'react';
import { CategoryType } from '../types/CategoryType';

interface Props {
	categories: CategoryType[];
	onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Category = ({ categories, onSelect }: Props) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<label className="input-group-text">Options</label>
			</div>
			<select className="custom-select" onChange={onSelect}>
				<option value=""> All Categories...</option>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Category;
