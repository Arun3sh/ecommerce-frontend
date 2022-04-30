import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../../global';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Myorder() {
	const history = useHistory();
	const [order, setOrder] = useState([]);
	useEffect(() => {
		const getUserOrder = async () => {
			await axios
				.get(`${userApi}/view-order/${localStorage.getItem('user_id')}`, {
					headers: {
						'x-auth-token': ` ${localStorage.getItem('token')}`,
					},
				})
				.then(({ data }) => setOrder(data.user_order.reverse()))
				.catch((err) => toast.error(err));
		};
		getUserOrder();
	}, []);

	if (order.length === 0) {
		return <div className="myorder-wrapper container-sm">You've no orders yet.</div>;
	}

	return (
		<div className="myorder-wrapper container-sm">
			<div className="myorder-container">
				{order.map((orders, index) => (
					<div key={index}>
						<ul>
							{orders
								.filter((e) => e.qty !== undefined)
								.map(({ _id, product_name, image, price, qty }, index) => (
									// <li>{product_name}</li>
									<Card className="checkout-product-card" key={index}>
										<div style={{ width: '35%' }}>
											<CardMedia
												className="card-image"
												component="img"
												height="160"
												image={image}
												alt={product_name}
												onClick={() => history.push(`/view-product/${_id}`)}
											/>
										</div>
										<CardContent style={{ width: '65%' }}>
											<Typography
												className="product-name"
												gutterBottom
												variant="h6"
												component="div"
												onClick={() => history.push(`/view-product/${_id}`)}
											>
												{product_name}
											</Typography>
											<Typography
												className="product-price-order"
												variant="p"
												color="text.secondary"
											>
												₹{price}
											</Typography>
											<Typography variant="h6" color="text.secondary">
												Quantity : {qty}
											</Typography>
											<Typography className="product-orderid" variant="h5" color="text.secondary">
												Order id : {orders[orders.length - 1]}
											</Typography>
											<Typography
												className="product-delivery-info"
												variant="p"
												color="text.primary"
											>
												Please Check your email for delivery updates
											</Typography>
										</CardContent>
									</Card>
								))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}

export default Myorder;
