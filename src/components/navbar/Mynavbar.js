import './Mynavbar.css';
import { Navbar, Nav } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Badge, Button, MenuItem, Select, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { myContext } from '../../App';

function Mynavbar() {
	const { cartCount } = useContext(myContext);

	const [selectCategory, setSelectCategory] = useState('All Categories');
	const history = useHistory();

	const textColor = { marginRight: '10px' };
	const categoryList = ['Appliances', 'Books', 'Mobile', 'Footwear'];

	// Form validation for search so that there is no api call for empty string search
	const formValidationSchema = yup.object({
		search: yup.string().required(),
	});
	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			search: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: () => history.push(`/product?category=${selectCategory}&search=${values.search}`),
	});

	return (
		<header className="nav-header">
			<Navbar className="container-sm mynav-wrapper" expand="sm">
				<Navbar.Brand className="myMenu-big" style={textColor}>
					<Link className="navbar-brand" to="/">
						eCommerce
					</Link>
				</Navbar.Brand>

				{/* For displaying menu items in big screen */}
				<Nav className="myMenu me-auto">
					{/* Only search bar will be seen in top for small screen */}
					<div className="search-bar-div">
						<form className="search-bar" onSubmit={handleSubmit}>
							<Select
								className="select-input"
								id="category"
								name="category"
								value={selectCategory}
								onChange={(e) => {
									setSelectCategory(e.target.value);
								}}
							>
								<MenuItem value={'All Categories'} selected>
									All Categories
								</MenuItem>
								{categoryList.map((e, index) => (
									<MenuItem key={index} value={e}>
										{e}
									</MenuItem>
								))}
							</Select>

							<TextField
								id="search"
								name="search"
								placeholder="Search here..."
								variant="outlined"
								className="text-field"
								value={values.search}
								onChange={handleChange}
								autoComplete="off"
							/>

							<Button type="submit" className="search-button">
								<FaSearch className="search-icon" color="primary" />
							</Button>
						</form>
					</div>

					<div className="myMenu-big">
						<Link className="nav-link" to="/login">
							Login
						</Link>

						<Link className="nav-link" to="/my-cart">
							<Badge className="cart-icon" color="primary" badgeContent={cartCount}>
								<ShoppingCartIcon />{' '}
							</Badge>
						</Link>
					</div>
				</Nav>
			</Navbar>
		</header>
	);
}
export default Mynavbar;
