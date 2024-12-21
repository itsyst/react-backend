import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
	show: boolean;
	onClose: () => void;
	onSave: (newUser: FormData, reset: () => void) => void;
}

const schema = z.object({
	name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
	website: z.string().url({ message: 'Invalid website URL.' }).or(z.literal('')).optional()
});

type FormData = z.infer<typeof schema>;

const StaticModal = ({ show, onClose, onSave }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { name: '', email: '', phone: '', website: '' }
	});

	const onSubmit = (data: FormData) => {
		onSave(data, reset);
	};

	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Create User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Enter name" {...register('name')} isInvalid={!!errors.name} />
						<Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" {...register('email')} isInvalid={!!errors.email} />
						<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="phone">
						<Form.Label>Phone</Form.Label>
						<Form.Control type="text" placeholder="Enter phone" {...register('phone')} isInvalid={!!errors.phone} />
						<Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="website">
						<Form.Label>Website</Form.Label>
						<Form.Control type="text" placeholder="Enter website" {...register('website')} isInvalid={!!errors.website} />
						<Form.Control.Feedback type="invalid">{errors.website?.message}</Form.Control.Feedback>
					</Form.Group>
					<Modal.Footer>
						<Button variant="secondary" onClick={onClose}>
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							Save
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default StaticModal;
