import { useEffect, useState } from 'react';
import { CategoryType } from '../types/CategoryType';
import { categories } from '../data/category-data';
import { Form, InputGroup } from 'react-bootstrap';

interface Props {
	categoryId: number;
	onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Category = ({ categoryId, onSelect }: Props) => {
	const [getCategories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		setCategories(categories);
	}, [categoryId]);

	return (
		<InputGroup className="mb-3">
			<InputGroup.Text>Options</InputGroup.Text>
			<Form.Select onChange={onSelect}>
				<option value="0"> All Categories...</option>
				{getCategories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</Form.Select>
		</InputGroup>
	);
};

export default Category;
