import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()
  
    return (
    <footer style={{textDecoration: 'none'}} className="footer">
        { location.pathname === '/about' && <Link to="">GitHub</Link> }
        { location.pathname === '/' ? <Link to="/about">About</Link> : 
        <Link style={{display: 'block'}}to="/">Back to Task Tracker</Link> }
    </footer>
  )
}

export default Footer