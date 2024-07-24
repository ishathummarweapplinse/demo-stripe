import React from 'react';

// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { fetchLogin } from "../Services/action";
import { Input, Divider } from 'antd';
import { useFormik } from 'formik';
import { bankform } from '../../../components/Components/validation';
import {  usredatabank } from '../../../services/action/user';

// import { fetchlogin } from '../../services/action/index';

function Bankinfo() {
  const dispatch = useDispatch();
  const initialValues = {
    fname: '',
    lname: '',
    acnumber: '',
    routingno: '',
    date: '',
    address: '',
    city: '',
    // country: '',
    state: '',
    email: '',
    postalcode: '',
    mobno: '',
    ssnno:'',
    govtid:"",

  };

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: bankform,
    onSubmit: (values) => {
      console.log(values);
      submitFrom(values);
    }
  });
 console.log(errors);
  // const navigate = useNavigate();
  const submitFrom = (formvalues) => {
     console.log(formvalues);
    dispatch(
      usredatabank(formvalues),
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row login border d-flex justify-content-center align-items-center" style={{ width: '580px' }}>
          <div className="col-lg-12">
            <Divider orientation="left" className="text-center mt-3 text-white">
              Banking Information
            </Divider>

            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                placeholder="Enter first name"
                onChange={handleChange}
                name="fname"
                value={values.fname}
              />

              {errors.fname && touched.fname && <p className="form-error text-wrap text-danger">{errors.fname}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                placeholder="Enter last name"
                onChange={handleChange}
                name="lname"
                value={values.lname}
              />

              {errors.lname && touched.lname && <p className="form-error text-wrap text-danger">{errors.lname}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                maxLength={12}
                placeholder="Enter account number"
                onChange={handleChange}
                name="acnumber"
                value={values.acnumber}
              />

              {errors.acnumber && touched.acnumber && <p className="form-error text-wrap text-danger">{errors.acnumber}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="number"
                maxLength={4}
                placeholder="Enter ssl number "
                onChange={handleChange}
                name="ssnno"
                value={values.ssnno}
              />

              {errors.ssnno && touched.ssnno && <p className="form-error text-wrap text-danger">{errors.ssnno}</p>}
            </div>

            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="number"
                maxLength={9}
                placeholder="Enter goverment id number..."
                onChange={handleChange}
                name="govtid"
                value={values.govtid}
              />

              {errors.govtid && touched.govtid && <p className="form-error text-wrap text-danger">{errors.govtid}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                maxLength={9}
                placeholder="Enter routing number"
                onChange={handleChange}
                name="routingno"
                value={values.routingno}
              />

              {errors.routingno && touched.routingno && <p className="form-error text-wrap text-danger">{errors.routingno}</p>}
            </div>
            <div className="col-lg-12 mt-3">
            
              <Input
                className="Inputall "
                placeholder="Select date of birth"
                style={{ width: '100%' }}
                type="date"
                value={values.date}
                onChange={handleChange}
                name="date"
              />

              {errors.date && touched.date && <p className="form-error text-wrap text-danger">{errors.date}</p>}
            </div>
            <Divider orientation="left" className="text-center mt-3 text-white">
              Contact Information
            </Divider>

            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                placeholder="Enter address"
                onChange={handleChange}
                name="address"
                value={values.address}
              />

              {errors.address && touched.address && <p className="form-error text-wrap text-danger">{errors.address}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input className="Inputall " type="text" placeholder="Enter city" onChange={handleChange} name="city" value={values.city} />

              {errors.city && touched.city && <p className="form-error text-wrap text-danger">{errors.city}</p>}
            </div>

            {/* <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                placeholder="Enter country"
                onChange={handleChange}
                name="country"
                value={values.country}
              />
              {errors.country && touched.country && <p className="form-error text-wrap text-danger">{errors.country}</p>}
            </div> */}
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="text"
                placeholder="Enter state"
                onChange={handleChange}
                name="state"
                value={values.state}
              />

              {errors.state && touched.state && <p className="form-error text-wrap text-danger">{errors.state}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="number"
                placeholder="Enter postal code"
                onChange={handleChange}
                name="postalcode"
                value={values.postalcode}
              />

              {errors.postalcode && touched.postalcode && <p className="form-error text-wrap text-danger">{errors.postalcode}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                name="email"
                value={values.email}
              />
              {errors.email && touched.email && <p className="form-error text-wrap text-danger">{errors.email}</p>}
            </div>
            <div className="col-lg-12 mt-3">
              <Input
                className="Inputall "
                type="number"
                placeholder="Enter phone number"
                onChange={handleChange}
                name="mobno"
                value={values.mobno}
              />

              {errors.mobno && touched.mobno && <p className="form-error text-wrap text-danger">{errors.mobno}</p>}
            </div>

            <div className="col-lg-12 mt-4 mb-3">
              <button
                type="submit"
                style={{ height: '50px' }}
                // onClick={handleSubmit}
                className={` btnlogin w-100 `}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Bankinfo;
