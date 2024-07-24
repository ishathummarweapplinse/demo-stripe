import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Login from '../src/components/Components/Login';
// import Forgotpass from '../src/components/Components/Forgotpass';
// import Forgotpasswordotp from '../src/components/Components/Forgotpasswordotp';
// import Forgotpasspwd from '../src/components/Components/Forgotpasspwd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Admin from '../src/components/Components/Admin';
import './index.css';
// auth provider

import routes, { renderRoutes } from './routes';

// import BasicCollapse from './views/ui-elements/basic/BasicCollapse';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <ToastContainer />
        {renderRoutes(routes)}
        {/* <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/forgetpassword" element={<Forgotpass></Forgotpass>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route path="/fpotp" element={<Forgotpasswordotp></Forgotpasswordotp>}></Route>
          <Route path="/fppwd" element={<Forgotpasspwd />}></Route>
          {/* <Route path="/profile/:id" element={<BasicCollapse></BasicCollapse>}></Route> */}
        {/* </Routes> */}
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
