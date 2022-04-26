import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { productApi } from '../../global';

function Productpage() {
	let params = new URLSearchParams(window.location.search);
	const category = params.get('category');
	const [product, setProduct] = useState([]);

	console.log(params.getAll('category'), window.location.search);

	useEffect(() => {
		const getProducts = async () => {
			await axios
				.get(`${productApi}${window.location.search}`)
				.then((data) => setProduct(data.data))
				.catch((err) => toast.error(err));
		};
		getProducts();
	}, []);
	return (
		<div className="product-wrapper container-sm">
			<div className="product-container">
				<h5>Showing Results for : "{category}"</h5>
			</div>
		</div>
	);
}

export default Productpage;
