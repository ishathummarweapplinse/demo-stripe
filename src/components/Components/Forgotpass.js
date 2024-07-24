import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import { fetchLogin } from "../Services/action";

import { forgotemail } from './validation';
import { forgetemail } from '../../services/action/index';

function Forgotpass() {
  // const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const dispatch = useDispatch();
  const initialValues = { email: '' };
  const {
    values,
    handleChange,
    handleSubmit,

    handleBlur,

    errors,
    touched
  } = useFormik({
    initialValues: initialValues,
    validationSchema: forgotemail,
    onSubmit: (values) => {
      // console.log(values);
      submitFrom(values);
    }
  });
  // const submitPasswordChangeForm = (formValues) => {
  //   // dispatch(change_password(formValues));
  //   console.log(formValues);
  //   handleClose();
  // };
  const navigate = useNavigate();
  const submitFrom = (formvalues) => {
    dispatch(
      forgetemail(formvalues, () => {
        navigate('/fpotp');
      })
    );
  };

  // const handleClose = () => {
  //   setShowChangePasswordModal(false);
  //   resetForm();
  // };
  // const handleShowChangePasswordModal = () => {
  //   setShowChangePasswordModal(true);
  // };
  // const hasErrors = Object.keys(errors).length > 0;
  return (
    <div className="bg">
      <div className="container  ">
        <div className=" bContainer">
          <div className="d-flex justify-content-center  align-items-center ">
            <div className="row  login border  d-flex justify-content-center  align-items-center " style={{ width: '580px' }}>
              <h1 className="text-center mt-3 text-white">Forgot Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="regfiled row">
                      <div className="col-lg-12 mt-3 px-5">
                        <label>Email</label>

                        <Input
                          placeholder="Enter email"
                          prefix={<UserOutlined style={{ color: 'white' }} />}
                          name="email"
                          size="large"
                          className="Inputall"
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email ? <p className="form-error text-wrap text-danger">{errors.email}</p> : <p></p>}
                      </div>
                      {/* <div className="regfiled mb-1 px-5 col-12">
                        <label style={{ color: "black" }}> Old Password</label>
                        <Input.Password
                          placeholder="Enter password"
                          onBlur={handleBlur}
                          name="password"
                          size="large"
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                          <p className="form-error text-wrap text-danger">
                            {errors.password}
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="  mb-1 px-5 col-12">
                        <label style={{ color: "black" }}>New Password</label>
                        <Input
                          name="newPassword"
                          onBlur={handleBlur}
                          size="large"
                          type="password"
                          placeholder="Enter New password"
                          value={values.newPassword}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                          <p className="form-error text-wrap text-danger">
                            {errors.password}
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="  mb-1 px-5 col-12">
                        <label style={{ color: "black" }}>
                          Confirm Password
                        </label>
                        <Input
                          name="cPassword"
                          onBlur={handleBlur}
                          size="large"
                          type="password"
                          placeholder="Enter Confirm password"
                          value={values.cPassword}
                          onChange={handleChange}
                        />
                        {errors.cPassword && touched.cPassword ? (
                          <p className="form-error text-wrap text-danger">
                            {errors.cPassword}
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </div> */}
                      <div className="mt-2  mb-4 px-5 col-12 ">
                        <Button
                          onClick={handleSubmit}
                          type="submit"
                          className={`btnlogin w-100 ${Object.keys(errors).length > 0 ? 'form-error' : ''}`}
                        >
                          Send OtP
                        </Button>
                      </div>
                      <div className="mt-2  mb-4 px-5 col-12 ">
                        <Link
                          to={'/login'}
                          style={{ textDecorationLine: 'none' }}
                          className="text-center d-flex  justify-content-center align-item-center text-white"
                        >
                          Back To login {/* Sign up */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpass;
