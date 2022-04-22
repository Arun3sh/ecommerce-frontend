import Box from '@mui/material/Box';
import { BottomNavigation, Badge, BottomNavigationAction } from '@mui/material';
import { MdOutlineHome } from 'react-icons/md';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AiOutlineUser } from 'react-icons/ai';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Bottomnav() {
	const [value, setValue] = useState(0);

	return (
		<Box className="bottom-nav" sx={{ width: 500 }}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction
					className="bottomNav-text"
					label="Home"
					icon={<MdOutlineHome />}
					href="#home"
				/>
				<BottomNavigationAction
					className="bottomNav-text"
					label="User"
					icon={<AiOutlineUser />}
					href="#user"
				/>
				<BottomNavigationAction
					className="bottomNav-text"
					label="Cart"
					icon={
						<Badge className="cart-icon" color="primary" badgeContent={1}>
							<ShoppingCartIcon />{' '}
						</Badge>
					}
					href="#checkout"
				/>
			</BottomNavigation>
		</Box>
	);
}
export default Bottomnav;
