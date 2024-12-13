import { Typography, IconButton, Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import headerStyles from './header.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth'
import {cartManager} from "../../../services/observer/observer";
function Header() {
  let navigate = useNavigate()
  let [number, setNumber] = useState(0)



  useEffect(() => {
    const updateCartNumber = (cart) => {
      setNumber(cart);
    };

    cartManager.subscribe(updateCartNumber);

    return () => {
      cartManager.unsubscribe(updateCartNumber);
    };
  }, []);

  const closeSession = () => {
    logout({ navigate })
  }
  return (
    <div className={headerStyles.header_container}>
      <a className={headerStyles.logo_container} href="/store">
        <img src='https://cdn-icons-png.flaticon.com/512/1040/1040254.png' alt='logo' height={30} />
        <Typography variant="span" fontSize={40} color={'#1976d2'} component="h2" marginLeft={1} fontWeight={600}>
          Store
        </Typography>
      </a>
      <nav className={headerStyles.actions}>
        <IconButton aria-label="delete" color='error' href='/store/cart' size="large">
          <Badge badgeContent={number} color="primary" >
            <ShoppingCartIcon color="primary" />
          </Badge>
        </IconButton>
        <IconButton aria-label="delete" color='error' size="large" onClick={closeSession}>
          <LogoutIcon />
        </IconButton>
      </nav>
    </div>
  )
}

export default Header