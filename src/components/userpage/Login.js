import './Login.css';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { myContext } from '../../App';
import axios from 'axios';
import { userApi } from '../../global';
import loginIllu from './../../assets/eshopping.png';
import { Link } from 'react-router-dom';

toast.configure();

function Login() {
	const { setIsAuth, setCartCount, localCart, setLocalCart } = useContext(myContext);
	const history = useHistory();

	const checkUser = () => {
		axios
			.post(`${userApi}/login-user`, values)
			.then(({ data }) => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('user_id', data.id);
				localStorage.setItem('user_name', data.user_name);
				localStorage.setItem('user_email', data.user_email);
				setIsAuth(true);
				toast.success('Log in success');
				history.push('/');

				getCart(data.id);
			})
			.catch((err) => toast.error(err));
	};

	const getCart = async (id) => {
		await axios
			.get(`${userApi}/view-cart/${id}`, {
				headers: {
					'x-auth-token': localStorage.getItem('token'),
				},
			})
			.then(({ data }) => {
				data.user_cart.length > 0 ? setLocalCart([...data.user_cart]) : setLocalCart([]);
				setCartCount(data.user_cart.length);
			});
	};

	const formValidationSchema = yup.object({
		user_email: yup.string().email().required('Dont leave this field empty'),
		password: yup.string().required('Password is required'),
	});

	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			user_email: '',
			password: '',
			data: localCart,
		},
		validationSchema: formValidationSchema,
		onSubmit: () => checkUser(),
	});

	return (
		<div className="container-sm login-wrapper">
			<div className="login-title">
				<h3>WELCOME</h3>
				<p>please login</p>
			</div>
			<div className="login-container">
				<img className="login-img" src={loginIllu} aria-label="user illustration" alt="broken" />

				<div className="login-container-form">
					{/* <Paper elevation={3} style={{ padding: '25px' }}> */}
					<form className="login-form" onSubmit={handleSubmit}>
						<div className="login-form-div">
							<TextField
								variant="standard"
								label="email id"
								autoFocus
								id="user_email"
								name="user_email"
								value={values.user_email}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.user_email && touched.user_email}
								helperText={errors.user_email && touched.user_email ? errors.user_email : ''}
							/>
							<TextField
								variant="standard"
								label="password"
								type="password"
								id="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.password && touched.password}
								helperText={errors.password && touched.password ? errors.password : ''}
							/>
							<div className="submit-user">
								<Button variant="outlined" color="error" onClick={() => history.goBack()}>
									Back
								</Button>
								<Button variant="outlined" type="submit">
									Submit
								</Button>
							</div>
						</div>
						<div className="register-yet">
							<Link to="/register" aria-label="not registered">
								Haven't Registered Yet? Click here
							</Link>
						</div>
					</form>
					{/* </Paper> */}
				</div>
			</div>
		</div>
	);
}
export default Login;
