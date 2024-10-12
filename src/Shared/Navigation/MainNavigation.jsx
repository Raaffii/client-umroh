import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Shared/Context/auth-context";
import { useContext } from "react";

export default function MainNavigation() {
  const auth = useContext(AuthContext);

  const submitHandler = () => {
    auth.logout();
  };

  return (
    <>
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <div className='user-profile'>
          <div className='user-name'>Welocome Back</div>
          <div className='user-designation'>Admin</div>
        </div>
        <ul className='nav navilink'>
          <li className='nav-item'>
            <NavLink to='/jamaah' className='nav-link navilink'>
              <i className='icon-file menu-icon'></i>
              <span className='menu-title'>Data Jamaah</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/logout' className='nav-link navilink' onClick={submitHandler}>
              <i className='icon-arrow-left menu-icon'></i>

              <span className='menu-title'>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
