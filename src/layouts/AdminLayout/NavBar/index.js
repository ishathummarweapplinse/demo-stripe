import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgpic from '../../../assets/imags/download-removebg-preview.png';
import NavLeft from './NavLeft';
import NavRight from './NavRight';

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';

const NavBar = () => {
  const [moreToggle, setMoreToggle] = useState(false);
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerFixedLayout, layout } = configContext.state;
  const { dispatch } = configContext;

  let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg'];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass = [...headerClass, 'headerpos-fixed'];
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  let moreClass = ['mob-toggler'];

  let collapseClass = ['collapse navbar-collapse'];
  if (moreToggle) {
    moreClass = [...moreClass, 'on'];
    collapseClass = [...collapseClass, 'show'];
  }
  const data = localStorage.getItem('userinfo');
  const token = JSON.parse(data);
  const navigate = useNavigate();
  if (!token?.token) {
    navigate('/login');
  }

  let navBar = (
    <React.Fragment>
      <div className="m-header">
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
          <span />
        </Link>

        <div className="b-bg d-flex justify-content-center">
          <img src={bgpic} alt="bg" height={'25px'} width={'50px'}></img>
        </div>

        <Link to="#" className={moreClass.join(' ')} onClick={() => setMoreToggle(!moreToggle)}>
          <i className="feather icon-more-vertical" />
        </Link>
      </div>
      <div style={{ justifyContent: 'space-between' }} className={collapseClass.join(' ')}>
        <NavLeft />
        <NavRight />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <header className={headerClass.join(' ')}>{navBar}</header>
    </React.Fragment>
  );
};

export default NavBar;
