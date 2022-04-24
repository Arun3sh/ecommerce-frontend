import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import Mynavbar from './components/navbar/Mynavbar';
import Bottomnav from './components/navbar/Bottomnav';
import Login from './components/userpage/Login';
import Register from './components/userpage/Register';
import Home from './components/main/Home';

function App() {
	return (
		<div className="App">
			<Mynavbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
			</Switch>
			<Bottomnav />
		</div>
	);
}

export default App;
