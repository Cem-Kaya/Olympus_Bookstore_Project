import '../App.css';
import logo from '../logo512.png';


const Header = () => {
  return (
    <div className="header-dark">
        <div className='container'>
            <div className='left-container'>
                <img className='image' src={logo} alt="logo" />
                <h1 className='header-item'>Olympus</h1>
            </div>

            <div className='inputWithButton'>
                <input type="text" placeholder='Search...'/>
                <button>Search</button>
            </div>
            <h3 className='header-item'>My Cart</h3>
            <h3 className='header-item'>Favourites</h3>
            <h3 className='header-item'>Log In/Sign In</h3>
        </div>
    </div>
  )
}

export default Header