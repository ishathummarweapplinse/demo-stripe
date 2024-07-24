import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import bgpic from '../../../../assets/imags/download-removebg-preview.png';
const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      {/* <div className="navbar-brand header-logo"> */}
      {/* <Link to="#" className="b-brand"> */}
      <div className="d-flex justify-content-center">
        <img src={bgpic} style={{ height: '25px', width: '50px', marginTop: '20px' }} alt="bg"></img>
      </div>
      {/* </Link> */}
      <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
        <span />
      </Link>
      {/* </div> */}
    </React.Fragment>
  );
};

export default NavLogo;
