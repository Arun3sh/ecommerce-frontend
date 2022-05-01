import './Mynavbar.css';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Badge, Button, MenuItem, Select, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { myContext } from '../../App';
import { userApi } from '../../global';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HashLink } from 'react-router-hash-link';

function Mynavbar() {
	const { isAuth, setIsAuth, cartCount, setCartCount, localCart, setLocalCart } =
		useContext(myContext);

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

	const userLogout = async () => {
		// To add items to cart in db only on logout
		await axios({
			url: `${userApi}/add-to-cart/${localStorage.getItem('user_id')}`,
			method: 'PUT',
			headers: {
				'x-auth-token': localStorage.getItem('token'),
			},
			data: localCart,
		}).catch((err) => toast.error(err));
		setIsAuth(false);
		setCartCount(0);
		localStorage.clear();
		setLocalCart([]);
	};

	return (
		<header className="nav-header">
			<Navbar className="container-sm mynav-wrapper" expand="sm">
				<Navbar.Brand className="myMenu-brand" style={textColor}>
					<Link className="navbar-brand" to="/">
						eCommerce
					</Link>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="offcanvasNavbar" />

				{/* OffCanvas is used to display side menu for small screens */}
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id="offcanvasNavbarLabel">eCommerce</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<HashLink className="nav-link" to="/#">
								Home
							</HashLink>
							{isAuth ? (
								<Link className="nav-link" to="/my-orders">
									Orders
								</Link>
							) : (
								''
							)}

							{!isAuth ? (
								<Link className="nav-link" to="/login">
									Login
								</Link>
							) : (
								<HashLink className="nav-link" to="/#" onClick={() => userLogout()}>
									Logout
								</HashLink>
							)}
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>

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
						{/* User authentication based menu feature */}
						{isAuth ? (
							<Link className="nav-link" to="/my-orders">
								Orders
							</Link>
						) : (
							''
						)}

						{!isAuth ? (
							<Link className="nav-link" to="/login">
								Login
							</Link>
						) : (
							<HashLink className="nav-link" to="/#" onClick={() => userLogout()}>
								Logout
							</HashLink>
						)}

						<Link
							className="nav-link"
							to={isAuth ? '/my-cart/' + localStorage.getItem('user_id') : '/my-cart/0'}
						>
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
