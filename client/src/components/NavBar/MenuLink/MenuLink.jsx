import { NavLink } from 'react-router-dom'
import styles from './MenuLink.module.css'

export default function MenuLink(props) {
  return <NavLink to={props.to} exact="true" className={({ isActive }) => `${styles.link} ${isActive && styles.activeLink}`}>{props.children}</NavLink>
}