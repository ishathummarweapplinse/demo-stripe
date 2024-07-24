import React from 'react';
// import { UserOutlined } from "@ant-design/icons";
import { Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import { fetchLogin } from "../Services/action";

import { newpasswordvalidation } from './validation';
import { fetchpassword } from '../../services/action/index';

function Forgotpasspwd() {
  // const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const dispatch = useDispatch();
  const initialValues = { newPassword: '', cPassword: '' };
  const {
    values,
    handleChange,
    handleSubmit,

    handleBlur,

    errors,
    touched
  } = useFormik({
    initialValues: initialValues,
    validationSchema: newpasswordvalidation,
    onSubmit: (values) => {
      console.log(values);
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
      fetchpassword(formvalues, () => {
        navigate('/admin');
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
                      <div className="  mb-1 px-5 col-12">
                        <label style={{ color: 'white' }}>New Password</label>
                        <Input
                          name="newPassword"
                          onBlur={handleBlur}
                          size="large"
                          className="Inputall"
                          type="password"
                          placeholder="New password"
                          value={values.newPassword}
                          onChange={handleChange}
                        />
                        {errors.newPassword && touched.newPassword ? (
                          <p className="form-error text-wrap text-danger">{errors.newPassword}</p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="  mb-1 px-5 col-12">
                        <label style={{ color: 'white' }}>Confirm Password</label>
                        <Input
                          name="cPassword"
                          onBlur={handleBlur}
                          className="Inputall"
                          size="large"
                          type="password"
                          placeholder="Confirm password"
                          value={values.cPassword}
                          onChange={handleChange}
                        />
                        {errors.cPassword && touched.cPassword ? (
                          <p className="form-error text-wrap text-danger">{errors.cPassword}</p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div className="mt-2  mb-4 px-5 col-12 ">
                        <Button
                          onClick={handleSubmit}
                          type="submit"
                          className={`btnlogin w-100 ${Object.keys(errors).length > 0 ? 'form-error' : ''}`}
                        >
                          Change Password
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

export default Forgotpasspwd;
