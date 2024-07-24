import React from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logoutpage } from '../../../../services/action';
// import { Link } from 'react-router-dom';
// import LogoutIcon from '@mui/icons-material/Logout';
const NavRight = () => {
  const navigation = useNavigate();
  const toekn = useSelector((state) => state.login?.data);
  console.log(toekn);
  const dispatch = useDispatch();
  console.log(toekn, 'token');
  if (!toekn?.token) {
    navigation('/login');
  }
  // const [LogIn, setLogIn] = useState(false);
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want be logout !',
      customClass: 'swal-wide',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign Out!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutpage());
        localStorage.clear('userinfo');
        // setLogIn(false);
        navigation('/login');
      }
    });
  };
  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start">
            {/* <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic"> */}
            <h6 className="d-inline-block m-b-0">
              <button onClick={logout} style={{ backgroundColor: 'black', border: 'gray' }}>
                <i className="fas fa-sign-out-alt" style={{ fontSize: '20px', color: 'white' }}></i>
                <span style={{ fontSize: '20px', color: 'white' }} className="mx-3">
                  Logout
                </span>
              </button>
            </h6>
            {/* <LogoutIcon></LogoutIcon> */}
            {/* </Dropdown.Toggle> */}
            {/* <Dropdown.Menu>
              <h6 className="d-inline-block m-b-0" style={{ color: 'black' }}>
                Logout
              </h6>
            </Dropdown.Menu> */}
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;
