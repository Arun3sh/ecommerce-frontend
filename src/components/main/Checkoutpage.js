import { Button, TextField } from '@mui/material';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { myContext } from '../../App';
import { paymentApi } from '../../global';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Checkoutpage() {
	let { id } = useParams();
	let orderId;
	const { localCart, setLocalCart, setCartCount } = useContext(myContext);
	const history = useHistory();
	let totalCost = 0;

	localCart.map((e) => (totalCost += e.price * e.qty));

	function storeOrder(value) {
		if (value.error === undefined) {
			if (value.emsg) {
				toast.error(value.emsg);
				history.goBack();
			}
			toast.success(value.msg);

			setLocalCart([]);

			setCartCount(0);
			history.push('/my-orders');
		} else {
			toast.error(value.error);
			history.goBack();
		}
	}

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

		if (!res) {
			toast.error('Razorpay SDK failed to load. Are you online?');
			return;
		}

		const result = async () => {
			await fetch(`${paymentApi}/order`, {
				method: 'POST',
				body: JSON.stringify({ amount: totalCost }),
				headers: {
					'Content-type': 'application/json',
					'x-auth-token': ` ${localStorage.getItem('token')}`,
				},
			})
				.then((data) => data.json())
				.then((d) => {
					if (d.error) {
						toast.error('Connectivity issue with Razor pay. Please try later');
						history.push('/checkout');
					} else {
						orderId = d.id;
					}
				});
		};
		await result();

		if (!result) {
			toast.error('Server error. Are you online?');
			return;
		}

		const options = {
			key: 'rzp_test_4k3ZRpnA3HTowh',
			amount: (totalCost * 100).toString(),
			currency: 'INR',
			name: 'eCommerce',
			description: 'Test Transaction',
			order_id: orderId,

			prefill: {
				name: localStorage.getItem('user_name'),
				email: localStorage.getItem('user_email'),
				contact: '9999999999',
			},
			handler: async function (response) {
				const newUserCart = [...localCart, orderId];

				const data = {
					orderCreationId: response.razorpay_order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					userCart: newUserCart,
					userId: id,
				};

				const result = async () => {
					await fetch(`${paymentApi}/success`, {
						method: 'POST',
						body: JSON.stringify(data),
						headers: {
							'Content-type': 'application/json',
							'x-razorpay-signature': response.razorpay_signature,
							'x-auth-token': ` ${localStorage.getItem('token')}`,
						},
					})
						.then((data) => data.json())
						.then((v) => storeOrder(v));
				};

				await result();
			},
			notes: {
				address: 'user address comes here',
			},
			theme: {
				color: '#61dafb',
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	const formValidationSchema = yup.object({
		user_address: yup.string().required('Dont leave this field empty'),
	});

	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			user_address: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: () => displayRazorpay(),
	});

	return (
		<div className="checkout-wrapper container-sm">
			<div className="checkout-container">
				{/* Product info */}
				<div className="product-checkout">
					{localCart.map(({ product_name, price, qty, image }) => (
						<Card
							className="checkout-product-card"
							// sx={{ maxWidth: 335 }}
							// onClick={() => history.push(`/view-product/${id}`)}
						>
							<CardMedia
								className="card-image"
								component="img"
								height="160"
								image={image}
								alt={product_name}
							/>
							<CardContent>
								<Typography className="product-name" gutterBottom variant="h6" component="div">
									{product_name}
								</Typography>
								<Typography className="product-price" variant="h4" color="text.secondary">
									₹{price}
								</Typography>
								<Typography variant="body1" color="text.secondary">
									Quantity : {qty}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>

				<form className="checkout-details" onSubmit={handleSubmit}>
					<TextField
						label="Address"
						maxRows={4}
						multiline
						variant="outlined"
						className="user-address"
						id="user_address"
						name="user_address"
						value={values.user_address}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.user_address && touched.user_address}
						helperText={errors.user_address && touched.user_address ? errors.user_address : ''}
					/>
					<h5>Total Cost : ₹ {totalCost}</h5>
					<Button variant="outlined" type="submit">
						proceed to buy
					</Button>
				</form>
			</div>
		</div>
	);
}
export default Checkoutpage;
