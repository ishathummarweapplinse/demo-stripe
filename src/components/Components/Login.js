import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { fetchLogin } from "../Services/action";

import { useFormik } from 'formik';
import { login } from './validation';
import { fetchlogin } from '../../services/action/index';

function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: login,
    onSubmit: (values) => {
      submitFrom(values);
    }
  });
  console.log(values);
  const navigate = useNavigate();
  const submitFrom = (formvalues) => {
    dispatch(
      fetchlogin(formvalues, () => {
        navigate('/app/bankinfo/default');
      })
    );
  };
  // const handelonchange = (e) => {
  //   const { name, value } = e.target;
  //   setinput({ ...input, [name]: value });
  // };

  // const handelonclick = () => {

  //   // navigate("/chat");
  // };
  // const hasErrors = Object.keys(errors).length > 0;
  return (
    <div className="bg">
      <div className="container  ">
        <div className=" bContainer">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center  align-items-center ">
              <div className="row  login  border  d-flex justify-content-center  align-items-center " style={{ width: '580px' }}>
                <h1 className="text-center mt-3 text-white">Login</h1>
                <div className="col-lg-12">
                  <div className="col-lg-12 mt-3">
                    <label style={{ color: 'white' }}>Email</label>

                    <Input
                      name="email"
                      size="large"
                      className="Inputall "
                      
                      prefix={<UserOutlined />}
                      placeholder="Enter email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email ? <p className="form-error text-wrap text-danger">{errors.email}</p> : <p></p>}
                  </div>
                  <div className="col-12 mt-3">
                    <label>Password</label>
                    <Input
                      className="Inputall pcolor"
                      type="password"
                      placeholder="Password"
                      name="password"
                      size="large"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password ? <p className="form-error text-wrap text-danger">{errors.password}</p> : <p></p>}
                  </div>
                  <div className="col-lg-12 mt-4 mb-3">
                    <button
                      type="submit"
                      style={{ height: '50px' }}
                      // onClick={handleSubmit}
                      className={` btnlogin w-100 `}
                    >
                      Sign In
                    </button>
                    {/* <p className="mt-3 px-5 d-flex justify-content-end align-item-end">
                      <Link to={'/forgetpassword'} style={{ textDecorationLine: 'none' }} className="text-end">
                        Forgot password? Sign up
                      </Link>
                    </p> */}
                  </div>
                  <div className="mt-2 mb-4 px-5 col-12 ">
                        <Link
                          to={'/registration'}
                          style={{ textDecorationLine: 'none' }}
                          className="text-center d-flex justify-content-end align-item-end text-white"
                        >
                          Sign Up
                        </Link>
                      </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
