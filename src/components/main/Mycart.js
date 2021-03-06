import {
	Button,
	ButtonGroup,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { myContext } from '../../App';
import './Cartcheckout.css';
import emptyCart from './../../assets/onlinecart.jpg';

function Mycart() {
	const history = useHistory();

	const { isAuth, localCart, setLocalCart, setCartCount } = useContext(myContext);
	setCartCount(localCart.length);

	// If cart is empty then it returns empty cart image
	if (localCart.length === 0) {
		return (
			<div className="mycart-wrapper container-sm">
				<img style={{ width: '100%' }} src={emptyCart} aria-label="empty cart" alt="broken" />
			</div>
		);
	}

	// Displays user cart
	return (
		<div className="mycart-wrapper container-sm">
			<div className="mycart-container">
				{/* To load different products as card */}
				{localCart
					.filter((e) => e.qty !== 0)
					.map((data, index) => (
						<Cartcard
							usercart={data}
							key={index}
							index={index}
							localCart={localCart}
							setLocalCart={setLocalCart}
							setCartCount={setCartCount}
						/>
					))}
				<div>
					{/* if user is authorized they can proceed to checkoout else they will be directed to login page */}

					{isAuth ? (
						<Button
							variant="contained"
							onClick={() => history.push(`/checkout/${localStorage.getItem('user_id')}`)}
						>
							Procced to Checkout
						</Button>
					) : (
						<Button variant="outlined" onClick={() => history.push('/login')}>
							Procced to Checkout
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

function Cartcard({ usercart, index, localCart, setLocalCart }) {
	const history = useHistory();
	const [itemQty, selectItemQty] = useState(usercart.qty);

	const reduceQty = () => {
		if (localCart[index].qty >= 1) {
			localCart[index].qty -= 1;
			selectItemQty(itemQty - 1);
		}
		setLocalCart(localCart.filter((e) => e.qty !== 0));
	};

	return (
		<Card className="cart-product-card" key={index}>
			{/* For product image */}
			<CardMedia
				className="cart-card-image"
				component="img"
				height="160"
				image={usercart.image}
				alt="Product image"
				aria-label="Product image"
				onClick={() => history.push(`/view-product/${usercart._id}`)}
			/>
			<CardContent className="card-content">
				<Typography className="product-name" gutterBottom variant="h6" component="div">
					{usercart.product_name}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Sold By - {usercart.soldBy}
				</Typography>
				<Typography className="product-price" variant="h4" color="text.secondary">
					???{usercart.price}
				</Typography>

				{/* Button  group where user can see the QTY as well increase or decrease QTY */}
				<CardActions className="card-btn-grp">
					<ButtonGroup>
						<Button variant="contained" onClick={() => reduceQty()}>
							-
						</Button>
						<Button variant="text">{usercart.qty}</Button>
						<Button
							variant="contained"
							onClick={() => (localCart[index].qty += 1) & selectItemQty(itemQty + 1)}
						>
							+
						</Button>
					</ButtonGroup>
				</CardActions>
			</CardContent>
		</Card>
	);
}

export default Mycart;
