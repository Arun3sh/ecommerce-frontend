import './Product.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { productApi } from '../../global';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

function Productlist() {
	// To get the url search parameters
	let params = new URLSearchParams(window.location.search);
	const category = params.get('category');
	const search = params.get('search');

	const [product, setProduct] = useState([]);

	// To load the products based on search inputs as well as query
	useEffect(() => {
		const getProducts = async () => {
			await axios
				.get(`${productApi}${window.location.search}`)
				.then((data) => setProduct(data.data))
				.catch((err) => toast.error(err));
		};
		getProducts();
	}, [window.location.search]);

	return (
		<div className="product-wrapper container-sm">
			<div className="product-container">
				{search !== null ? (
					<h5>
						Showing Results for : {category} - {search}
					</h5>
				) : (
					<h5>Showing Results for : "{category}"</h5>
				)}
				<section className="product-card-section">
					{product.map(({ _id, product_name, price, soldBy, image }, index) => (
						<Productcard
							key={index}
							id={_id}
							product_name={product_name}
							price={price}
							soldBy={soldBy}
							image={image}
						/>
					))}
				</section>
			</div>
		</div>
	);
}

function Productcard({ id, product_name, price, soldBy, image }) {
	const history = useHistory();
	return (
		<Card className="product-card" onClick={() => history.push(`/view-product/${id}`)}>
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
					???{price}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Sold By - {soldBy}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Productlist;
