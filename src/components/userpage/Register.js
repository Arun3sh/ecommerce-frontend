import { useHistory, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './register.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { userApi } from '../../global';

toast.configure();

function Register() {
	const history = useHistory();

	const register = () => {
		// To make sure if same user exists
		fetch(`${userApi}/create-user`, {
			method: 'POST',
			body: JSON.stringify({
				user_address: '',
				user_name: values.username,
				user_email: values.email,
				password: values.password,
				contact: values.contact,
				user_cart: [],
			}),
			headers: { 'Content-type': 'application/json' },
		}).then((res) => {
			if (res.ok) {
				history.push('/login');
				toast.success('Account Created');
			} else {
				toast.error('user email already exists!');
			}
		});
	};

	const formValidationSchema = yup.object({
		username: yup.string().min(4).required('please enter your name'),
		contact: yup.string().required('Please add your contact info'),
		email: yup.string().email().required('email id is required'),
		password: yup
			.string()
			.required('Min 8 characters')
			.matches(
				/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			),
		cpassword: yup
			.string()
			.required('Please re-enter the password')
			.oneOf([yup.ref('password')], 'Passwords do not match'),
	});
	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			username: '',
			contact: '',
			email: '',
			password: '',
			cpassword: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: () => register(),
	});
	return (
		<div className="container-sm register">
			<div className="logo-title">
				<h2>HealthCare</h2>
			</div>
			<div className="register-wrapper">
				<h3>Create an Account</h3>

				<form className="registeruser-form" onSubmit={handleSubmit} autoComplete="off">
					<TextField
						id="username"
						name="username"
						value={values.username}
						label="User Name"
						variant="outlined"
						style={{ width: '40vh' }}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.username && touched.username}
						helperText={errors.username && touched.username ? errors.username : ''}
					/>
					<TextField
						id="contact"
						name="contact"
						value={values.contact}
						label="contact"
						variant="outlined"
						style={{ width: '40vh' }}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.contact && touched.contact}
						helperText={errors.contact && touched.contact ? errors.contact : ''}
					/>
					<TextField
						id="outlined-basic"
						name="email"
						value={values.email}
						label="Enter email id"
						variant="outlined"
						style={{ width: '40vh' }}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.email && touched.email}
						helperText={errors.email && touched.email ? errors.email : ''}
					/>
					<TextField
						id="password"
						name="password"
						value={values.password}
						type="password"
						label="Set Password"
						variant="outlined"
						style={{ width: '40vh' }}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.password && touched.password}
						helperText={errors.password && touched.password ? errors.password : ''}
					/>
					<TextField
						id="cpassword"
						name="cpassword"
						value={values.cpassword}
						type="password"
						label="Confirm Password"
						variant="outlined"
						style={{ width: '40vh' }}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.cpassword && touched.cpassword}
						helperText={errors.cpassword && touched.cpassword ? errors.cpassword : ''}
					/>
					<Button variant="outlined" type="submit" color="success">
						Submit
					</Button>
				</form>
				<div className="user-already">
					<Link to="/login" aria-label="login">
						Already an user? Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
