import Box from '@mui/material/Box';
import { BottomNavigation, Badge, BottomNavigationAction } from '@mui/material';
import { MdOutlineHome } from 'react-icons/md';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AiOutlineUser } from 'react-icons/ai';
import { useState } from 'react';
import { useContext } from 'react';
import { myContext } from '../../App';
import { Link } from 'react-router-dom';

function Bottomnav() {
	const { cartCount } = useContext(myContext);
	const [value, setValue] = useState(0);

	return (
		<Box className="bottom-nav" sx={{ width: 500 }}>
			<BottomNavigation
				showLabels
				value={value}
				style={{ height: '70px' }}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction
					className="bottomNav-text"
					label="Home"
					icon={
						<Link to="/">
							<MdOutlineHome />
						</Link>
					}
				/>
				<BottomNavigationAction
					className="bottomNav-text"
					label="User"
					icon={
						<Link to="/user">
							<AiOutlineUser />
						</Link>
					}
				/>
				<BottomNavigationAction
					className="bottomNav-text"
					label="Cart"
					icon={
						<Link to="/my-cart">
							<Badge className="cart-icon" color="primary" badgeContent={cartCount}>
								<ShoppingCartIcon />{' '}
							</Badge>
						</Link>
					}
				/>
			</BottomNavigation>
		</Box>
	);
}
export default Bottomnav;
