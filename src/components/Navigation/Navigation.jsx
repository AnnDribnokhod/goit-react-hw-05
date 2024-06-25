import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import styles from './Navigation.module.css';
import clsx from 'clsx';


const Navigation = () => {

  const buildLinkClass = ({ isActive }) => {
      return clsx(styles.link, isActive && styles.active);
    };
  const location = useLocation();  

  

return (  <nav className={styles.nav}>
    <NavLink to="/" state={location} className={buildLinkClass} >Home</NavLink>
    <NavLink to="/movies" state={location} className={buildLinkClass} >Movies</NavLink>
  </nav>
)};

export default Navigation;
