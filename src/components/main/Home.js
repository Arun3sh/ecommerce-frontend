import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { productApi } from './../../global';

function Home() {
	const [categories, setCategories] = useState([]);
	const [other, setOther] = useState([]);
	const imgData = [
		'https://m.media-amazon.com/images/I/713l-IgDaXL._SX3000_.jpg',
		'https://m.media-amazon.com/images/I/6113jhUvaoL._SX3000_.jpg',
	];

	// To set the index value for slider
	const [index, setIndex] = useState(0);

	// Next func to move the image
	const next = () => {
		setIndex((i) => (i + 1) % imgData.length);
	};

	// Next func to move the image
	const prev = () => {
		setIndex((i) => (i !== 0 ? (i - 1) % imgData.length : (i + 2) % imgData.length));
	};

	// Use effect to call the interval timer and slide the image
	useEffect(() => {
		const timer = setInterval(() => {
			next();
		}, 8000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		axios
			.get(`${productApi}/homepage`)
			.then((data) => setCategories(data.data[0].categories) & setOther(data.data[0].other))
			.catch((err) => alert(err));
	}, []);

	return (
		<div className="home-wrapper container-sm">
			<div className="home-container">
				<div className="promo-wrapper">
					{/* Promo advertisement comes here */}
					<div className="promo-container">
						<img className="promo-img" src={imgData[index]} alt="broken" aria-label="promo" />
					</div>
				</div>

				<section className="other-section">
					<div className="category-wrapper">
						{categories.map(({ cat_name, cat_img }, index) => (
							<div className="category-div" key={index}>
								<img src={cat_img} alt={cat_name} aria-label={cat_name} />
								<h5 className="category-heading">{cat_name}</h5>
							</div>
						))}
					</div>
					{other.map(({ cat_name, cat_img, price }, index) => (
						<div className="other-wrapper" key={index}>
							<img src={cat_img} alt={cat_name} aria-label={cat_name} />
							<h5 className="other-heading">
								{cat_name} {price}
							</h5>
						</div>
					))}
				</section>
			</div>
		</div>
	);
}

export default Home;
