import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import Mynavbar from './components/navbar/Mynavbar';
import Bottomnav from './components/navbar/Bottomnav';
import Login from './components/userpage/Login';
import Register from './components/userpage/Register';
import Home from './components/main/Home';
import Footer from './components/main/Footer';
import { useLocation } from 'react-router-dom';
import { useState, createContext } from 'react';
import Productlist from './components/main/Productlist';
import Productpage from './components/main/Productpage';
import Mycart from './components/main/Mycart';
import Checkoutpage from './components/main/Checkoutpage';
import Myorder from './components/main/Myorder';
import error_404 from './assets/error-404.jpg';

export const myContext = createContext(null);

function App() {
	const location = useLocation();
	const [query, setQuery] = useState('');
	const [cartCount, setCartCount] = useState(0);
	const [localCart, setLocalCart] = useState([]);
	// let localCart = [];
	const [isAuth, setIsAuth] = useState(false);

	// myValue is to give values through out the Component
	const myValue = {
		query: query,
		setQuery: setQuery,
		cartCount: cartCount,
		setCartCount: setCartCount,
		localCart: localCart,
		setLocalCart: setLocalCart,
		isAuth: isAuth,
		setIsAuth: setIsAuth,
	};
	return (
		<myContext.Provider value={myValue}>
			<div className="App">
				{location.pathname !== '/login' && location.pathname !== '/register' && <Mynavbar />}

				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/product">
						<Productlist />
					</Route>
					<Route path="/view-product/:id">
						<Productpage />
					</Route>
					<Route path="/my-cart/:id">
						<Mycart />
					</Route>
					<Route path="/checkout/:id">
						<Checkoutpage />
					</Route>
					<Route path="/my-orders">
						<Myorder />
					</Route>
					<Route path="**">
						<img src={error_404} style={{ width: '100%' }} alt="404" aria-label="page not found" />
					</Route>
				</Switch>
				{location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
				<Bottomnav />
			</div>
		</myContext.Provider>
	);
}

export default App;
