import './Login.css';
import {
	Button,
	FormControl,
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

toast.configure();

function Login() {
	// const { login, setLogin, value, setValue } = useContext(authContext);
	const history = useHistory();
	// const [Api, setApi] = useState(patientAPI);

	// const checkUser = async () => {
	// 	await fetch(`${Api}/login-${value}`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(values),
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 		},
	// 	})
	// 		.then((data) => data.json())
	// 		.then((d) => {
	// 			localStorage.setItem('token', d.token);
	// 			localStorage.setItem('id', d.id);
	// 			localStorage.setItem('pt_name', d.pt_name);
	// 			toast.success('Login success');
	// 			setLogin(!login);
	// 			value === 'patient' ? history.push('/appointment') : history.push('/');
	// 		})
	// 		.catch(() => {
	// 			toast.error('Invalid login attempt');
	// 		});
	// };

	const formValidationSchema = yup.object({
		email: yup.string().email().required('Dont leave this field empty'),
		password: yup.string().required('Password is required'),
	});

	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: formValidationSchema,
		// onSubmit: () => checkUser(),
	});

	// To set the api value based on user selection
	// const handleSelectChange = (event) => {
	// 	setValue(event.target.value);

	// 	event.target.value !== 'patient' ? setApi(doctorAPI) : setApi(patientAPI);
	// };

	return (
		<div className="container-sm login-wrapper">
			<div className="login-title">
				<h3>WELCOME</h3>
				<p>please login</p>
			</div>
			<div className="login-container">
				{/* <img className="login-img" src={docIllu} aria-label="user illustration" alt="broken" /> */}

				<div className="login-container-form">
					<Paper elevation={3} style={{ padding: '25px' }}>
						<form className="login-form" onSubmit={handleSubmit}>
							{/* select radio options for doctor patient login */}
							<FormControl>
								<RadioGroup
									className="radioGroup-userType"
									aria-label="type of user"
									defaultValue="patient"
									name="type-user"
								>
									<FormControlLabel value="patient" control={<Radio />} label="Patient" />
									<FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
									<FormControlLabel value="admin" control={<Radio />} label="Admin" />
								</RadioGroup>
							</FormControl>

							<div className="login-form-div">
								<TextField
									variant="standard"
									label="email id"
									autoFocus
									id="email"
									name="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.email && touched.email}
									helperText={errors.email && touched.email ? errors.email : ''}
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
									<Button
										variant="outlined"
										color="error"
										// onClick={() => setValue('patient') & history.goBack()}
									>
										Back
									</Button>
									<Button variant="outlined" type="submit">
										Submit
									</Button>
								</div>
							</div>
						</form>
					</Paper>
				</div>
			</div>
		</div>
	);
}
export default Login;
