import React from 'react';
// import { Input, Button } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { otpvalidation } from './validation';
import { useDispatch } from 'react-redux';
import { fetchotp } from '../../services/action/index';

function Forgotpasswordotp() {
  const navigate = useNavigate();
  const initialValues = { otp1: '', otp2: '', otp3: '', otp4: '' };
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: otpvalidation,
    onSubmit: (values) => {
      submitFrom(values);
    }
  });

  const submitFrom = (formValues) => {
    const otpValue = Object.values(formValues).join('');
    console.log('OTP Value:', otpValue);
    dispatch(
      fetchotp(otpValue, () => {
        navigate('/fppwd');
      })
    );
    // resetForm();
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      document.getElementById(`otp${index - 1}`)?.focus();
    }
    if (e.key === 'Enter' && e.target.value && index < 4) {
      document.getElementById(`otp${index + 1}`)?.focus();
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="bg">
      <div className="container">
        <div className="bContainerotp">
          <div className="d-flex justify-content-center align-items-center">
            <div className="row login border d-flex justify-content-center align-items-center" style={{ width: '580px' }}>
              <h1 className="text-center mt-3 text-white">Forgot Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 col-12">
                    <div className="regfiled row">
                      <div className="col-lg-12 col-sm-12 mt-3 px-5">
                        <h5 className="text-white">Please enter OTP</h5>
                        <div className="form-group mt-3 mb-3">
                          {[1, 2, 3, 4].map((index) => (
                            <input
                              key={index}
                              id={`otp${index}`}
                              autoComplete="off"
                              type="number"
                              className="rx-input otp-input"
                              maxLength="1"
                              value={values[`otp${index}`]}
                              onChange={(e) => {
                                handleChange(e);

                                if (e.target.value && index < 4) {
                                  document.getElementById(`otp${index + 1}`).focus();
                                }
                              }}
                              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 mb-4 px-5 col-12 ">
                        <button type="submit" onClick={handleSubmit} className={`btnlogin w-100 ${hasErrors ? 'form-error' : ''}`}>
                          Submit
                        </button>
                      </div>
                      <div className="mt-2 mb-4 px-5 col-12 ">
                        <Link
                          to={'/login'}
                          style={{ textDecorationLine: 'none' }}
                          className="text-center d-flex justify-content-center align-item-center text-white"
                        >
                          Back To login
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

export default Forgotpasswordotp;
