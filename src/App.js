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

export const myContext = createContext(null);

function App() {
	const location = useLocation();
	const [query, setQuery] = useState('');
	const myValue = {
		query: query,
		setQuery: setQuery,
	};
	console.log(query);
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
				</Switch>
				{location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
				<Bottomnav />
			</div>
		</myContext.Provider>
	);
}

export default App;
