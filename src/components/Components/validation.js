import * as Yup from 'yup';

// const phoneRegExp = /^\d{10}$/;
// const passwordRegExp = /^(?=.*[0-9])(?=.*[A-Za-z]).{6}$/;
const passwordloginExp = /^\d{6}$/;

export const forgotemail = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Enter email please')

  // phoneNo: Yup.string()
  //   .matches(phoneRegExp, "Phone number is not  valid enter 10 digit")

  //   .required("Enter phone number"),
  // password: Yup.string()
  //   .matches(passwordRegExp, "Password must be  6 characters  ")
  //   // .min(6, "Password must be at least 6 characters")
  //   .required("Enter password"),
  // cpassword: Yup.string()
  //   .required("Enter password")
  //   .matches(
  //     passwordRegExp,
  //     "Password must be at least 6 characters one special charator  "
  //   )
  //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

// export const Loginvalidation = Yup.object().shape({
//   password: Yup.string()
//     .min(
//       6,
//       "Password must be at least 6 to 8 characters one special charator  "
//     )
//     .required("Enter password"),
//   email: Yup.string()
//     .email("Enter a valid email")
//     .required("Enter email please"),
// });

export const updatevalue = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be at most 30 characters')
    .required('Enter name please'),
  email: Yup.string().email('Enter a valid email').required('Enter email please')
});
export const login = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Enter email please'),
  password: Yup.string()
    .matches(/^\d{6}$/, 'Password must be  6 digits')
    .required('Enter password')
});
export const newpasswordvalidation = Yup.object().shape({
  newPassword: Yup.string()
    .matches(passwordloginExp, 'Password must be 6  characters  ')

    .required('Enter password'),
  cPassword: Yup.string()
    .required('Enter password')
    .matches(passwordloginExp, 'Password must be 6  characters  ')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});
export const otpvalidation = Yup.object().shape({
  otp1: Yup.string().required('please Enter valid OTP'),
  otp2: Yup.string().required('please Enter valid OTP'),

  otp3: Yup.string().required('please Enter valid OTP'),

  otp4: Yup.string().required('please Enter valid OTP')
});



export const reg = Yup.object().shape({
  name:Yup.string().required('Enter name please'),
  email: Yup.string().email('Enter a valid email').required('Enter email please'),
  password: Yup.string()
    .matches(/^\d{6}$/, 'Password must be  6 digits')
    .required('Enter password')
});



export const bankform=Yup.object().shape({
  email: Yup.string().email('Enter a  email').required('Enter email please'),
  fname: Yup.string().required('Enter a  first name') ,
  lname: Yup.string().required('Enter a  last name') ,
  acnumber: Yup.string().required('Enter a  account number') ,
  routingno: Yup.string().required('Enter a  routing number') ,
 state: Yup.string().required('Enter a  state'),
 date: Yup.string().required('Enter a  date'),
 city: Yup.string().required('Enter a city'),
 ssnno: Yup.string().required('Enter a  ssn number'),
 govtid: Yup.string().required('Enter a goverment id number'),  
 postalcode: Yup.string().required('Enter a postalcode'),

 mobno: Yup.string().required('Enter a  phone number'),
 address:Yup.string().required('Enter a  address'),
});