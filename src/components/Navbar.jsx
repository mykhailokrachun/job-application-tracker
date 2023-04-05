import Wrapper from '../assets/wrappers/Navbar';
import { FaUserCircle, FaCaretDown, FaAlignLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { useState } from 'react';
import { toggleSidebar, clearStore } from '../features/user/userSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => dispatch(clearStore('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
