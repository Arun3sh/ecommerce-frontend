import './Footer.css';
import { Button, TextField } from '@mui/material';
import { HashLink } from 'react-router-hash-link';
import { AiOutlineInstagram } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

toast.configure({
	autoClose: 5000,
	draggable: false,
});

function Footer() {
	// User contact form validation
	const formValidationSchema = yup.object({
		name: yup.string().required('Your name is required'),
		contact: yup.number().required('Your contact is required'),
		query: yup.string(),
	});

	const { errors, handleSubmit, handleBlur, handleChange, touched, values, resetForm } = useFormik({
		initialValues: {
			name: '',
			contact: '',
			query: '',
		},
		validationSchema: formValidationSchema,

		onSubmit: () => {
			toast.success('We will reach you!!');

			resetForm();
		},
	});

	return (
		<footer className="container-sm footer-wrapper">
			<div className="footer-wrapper-content">
				{/* Solutions */}
				<div className="footer-solution">
					<span className="footer-heading">Get to know us</span>
					<HashLink to="/#About-us">About us</HashLink>
					<HashLink to="/#Carrers">Carrers</HashLink>
					<HashLink to="/#Press-release">Press release</HashLink>
					<HashLink to="/#Gift-a-smile">Gift a smile</HashLink>
				</div>

				{/* Company */}
				<div className="footer-company">
					<span className="footer-heading">Contact Us</span>
					<HashLink to="/#about">Facebook</HashLink>
					<a target="_blank" rel="noreferrer" href="https://www.instagram.com/?hl=en">
						<AiOutlineInstagram /> Instagram
					</a>
					<p className="address">eCommerce Home Office, Coimbatore, India</p>
					<p className="phone">+91 00000 00000</p>
				</div>

				{/* ContactUS */}
				<form onSubmit={handleSubmit} className="footer-contactus">
					<span className="footer-heading">
						Leave your conatct with query. We will get back to you
					</span>
					<TextField
						id="name"
						name="name"
						variant="outlined"
						label="Name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.name && touched.name}
						helperText={errors.name && touched.name ? errors.name : ''}
					/>
					<TextField
						id="contact"
						name="contact"
						variant="outlined"
						label="Phone Number"
						value={values.contact}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.contact && touched.contact}
						helperText={errors.contact && touched.contact ? errors.contact : ''}
					/>
					<TextField
						id="query"
						name="query"
						multiline
						rows={4}
						variant="outlined"
						label="Detailed Enquiry"
						value={values.query}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.query && touched.query}
						helperText={errors.query && touched.query ? errors.query : ''}
					/>
					<Button type="submit" variant="outlined">
						Submit
					</Button>
				</form>
			</div>
			<div className="copyright">Copyright © 2022 Aruneshwaran</div>
		</footer>
	);
}

export default Footer;
