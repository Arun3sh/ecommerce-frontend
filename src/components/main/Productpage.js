import { Button, MenuItem, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { productApi } from '../../global';
import { toast } from 'react-toastify';
import { myContext } from '../../App';
import { useHistory } from 'react-router-dom';

function Productpage() {
	const { id } = useParams();
	const history = useHistory();

	const { cartCount, setCartCount } = useContext(myContext);

	const [product, setProduct] = useState([]);
	const [selectQty, setSelectQty] = useState(1);

	useEffect(() => {
		const getProduct = async () => {
			await axios
				.get(`${productApi}/${id}`)
				.then((data) => setProduct(data.data[0]))
				.catch((err) => toast.error(err));
		};
		getProduct();
	}, []);

	if (product.length === 0) {
		return <div className="productpage-wrapper container-sm">Loading...</div>;
	}

	return (
		<div className="productpage-wrapper container-sm">
			<div className="productpage-container">
				<div className="row container-sm product-row1">
					<div className="product-col1 col-sm-6">
						<img src={product.image} alt="broken" aria-label="product image" />
					</div>
					<div className="product-col2 col-sm-6">
						<h6>{product.product_name}</h6>
						<h4>₹ {product.price}</h4>
						Reviews
						<div className="product-qty">
							<p>Quantity</p>
							<Select
								className="select-input"
								id="Quantity"
								name="Quantity"
								value={selectQty}
								onChange={(e) => {
									setSelectQty(e.target.value);
								}}
							>
								{[1, 2, 3, 4, 5]
									.filter((e) => e + 1 < product.qty + 1)
									.map((e, index) => (
										<MenuItem key={index} value={e}>
											{e}
										</MenuItem>
									))}
							</Select>
						</div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setCartCount(cartCount + selectQty)}
						>
							Add to cart
						</Button>
						<Button variant="contained" color="primary" onClick={() => history.push('/checkout')}>
							Buy Now
						</Button>
					</div>
				</div>
				<div className="row product-row2 container-sm ">{product.description}</div>
			</div>
		</div>
	);
}

export default Productpage;
