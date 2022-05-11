import React, {useEffect} from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Navbar = (props) => {
    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        }, [location]);
    return (

        <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TimeNews</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="/about">About</Link></li>
                        <Link className={`nav-link ${location.pathname==="/business"?"active":""}`} to="/business">Business</Link>
                        <Link className={`nav-link ${location.pathname==="/entertainment"?"active":""}`} to="/entertainment">Entertainment</Link>
                        <Link className={`nav-link ${location.pathname==="/health"?"active":""}`} to="/health">Health</Link>
                        <Link className={`nav-link ${location.pathname==="/science"?"active":""}`} to="/science">Science</Link>
                        <Link className={`nav-link ${location.pathname==="/sports"?"active":""}`} to="/sports">Sports</Link>
                        <Link className={`nav-link ${location.pathname==="/technology"?"active":""}`} to="/technology">Technology</Link>
                        <Link className={`nav-link ${location.pathname==="/article"?"active":""}`} to="/article">Write An Article</Link>
                        <Link className={`nav-link ${location.pathname==="/article_news"?"active":""}`} to="/article_news">Latest Article</Link>
                    </ul>
                    </div>
                    <div className={`form-check form-switch  text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                        <input className="form-check-input" type="checkbox" onClick={props.togglemode} id="flexSwitchCheckDefault" />
                        <label className="form-check-label" for="flexSwitchCheckDefault">Enable Dark mode</label>
                    </div>

                    {!localStorage.getItem('token')?<form className='d-flex'>
                        <Link className='btn btn-primary mx-2' to="/login"  role="button">Login</Link>
                        <Link className='btn btn-primary' to="/signup" role="button">SignUp</Link>

                        </form>: <button className='btn btn-primary  mx-2' onClick={handleLogout}>Logout</button>}

                </div>

            
        </nav>

    )
}


export default Navbar
