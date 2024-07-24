// import { formatCountdown } from 'antd/es/statistic/utils';
import { baseUrl } from '../../apiurl';
import {
  FORGETEMAIL_ERROR,
  FORGETEMAIL_SUCESS,
  FORGETOTP_SUCESS,
  FORGETPASSWORD_SUCESS,
  LOGIN_ERROR,
  LOGIN_LOADNG,
  LOGIN_SUCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REG_LOADNG,
  REG_SUCESS,
  REG_ERROR
} from '../constant';
import { toast } from 'react-toastify';

export const login_loading = () => {
  return {
    type: LOGIN_LOADNG
  };
};
export const login_sucess = (data) => {
  return {
    type: LOGIN_SUCESS,
    payload: data
  };
};
export const login_error = (data) => {
  return {
    type: LOGIN_ERROR,
    payload: data
  };
};
export const reg_loading = () => {
  return {
    type: REG_LOADNG,
  };
};
export const reg_sucess = (data) => {
  return {
    type: REG_SUCESS,
    payload: data
  };
};
export const reg_error = (data) => {
  return {
    type: REG_ERROR   ,
    payload: data
  };
};

export const forgetemail_success = (data) => {
  return {
    type: FORGETEMAIL_SUCESS,
    payload: data
  };
};
export const forgetemail_error = (data) => {
  return {
    type: FORGETEMAIL_ERROR,
    payload: data
  };
};

export const forgetotp_success = (data) => {
  return {
    type: FORGETOTP_SUCESS,
    payload: data
  };
};

export const forgetpassword_sucess = (data) => {
  return {
    type: FORGETPASSWORD_SUCESS,
    payload: data
  };
};

export const fetchlogin = (data, successRedirect) => {
  return (dispatch) => {
    dispatch(login_sucess);
   
    const fromdata = new FormData();
    fromdata.append('email', data.email);
    fromdata.append('password', data.password);
   

    fetch(`${baseUrl}/user/sign_in`, {
      method: 'POST',
      body: fromdata
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === true) {
          dispatch(login_sucess(response.data));

          localStorage.setItem('userinfo', JSON.stringify(response.data));
          successRedirect();
          // toast.success(response.message, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          // localStorage.setItem("userinfo", response.data);
        } else if (response.success === false) {
          toast.error(response.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
      })
      .catch((error) => {
        dispatch(login_error(error.message));
      });
  };
};



export const fetchreg = (data, successRedirect) => {
  return (dispatch) => {
    dispatch(reg_sucess);
   
    const fromdata = new FormData();
    fromdata.append('email', data.email);
    fromdata.append('password', data.password);
   
    fromdata.append('user_name', data.name);
    fetch(`${baseUrl}/user/sign_up`, {
      method: 'POST',
      body: fromdata
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === true) {
          dispatch(reg_sucess(response.data));

          localStorage.setItem('userinfo', JSON.stringify(response.data));
          successRedirect();
          // toast.success(response.message, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          // localStorage.setItem("userinfo", response.data);
        } else if (response.success === false) {
          toast.error(response.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
      })
      .catch((error) => {
        dispatch(reg_error(error.message));
      });
  };
};


export const logout_success = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
export const logout_error = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const forgetemail = (data, successRedirect) => {
  return (dispatch) => {
    // dispatch(login_sucess);
    // const html = "it's work";

    const fromdata = new FormData();
    fromdata.append('email_address', data.email);
    // fromdata.append('html', html);

    fetch(`${baseUrl}/send_otp`, {
      method: 'POST',
      body: fromdata
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(forgetemail_success(response.data));
        console.log(response.data);

        const userInfo = { ...response.data, email: data.email };
        localStorage.setItem('userinfo', JSON.stringify(userInfo));
        successRedirect();
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      })

      .catch((error) => {
        dispatch(forgetemail_error(error.message));
      });
  };
};
export const fetchotp = (data, successRedirect) => {
  return (dispatch) => {
    const userinfoString = localStorage.getItem('userinfo');
    if (!userinfoString) {
      toast.error('User info not found in localStorage', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }

    const userinfo = JSON.parse(userinfoString);
    const email = userinfo.email;
    console.log(email);

    const otp = parseInt(data);
    if (isNaN(otp)) {
      toast.error('Invalid OTP', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }
    console.log(typeof otp);

    const formData = new FormData();
    formData.append('email_address', email);
    formData.append('otp', otp);

    fetch(`${baseUrl}/verify_otp`, {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(forgetotp_success(responseData.data));
          successRedirect();
          toast.success(responseData.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        } else {
          toast.error(responseData.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      });
  };
};
export const fetchpassword = (data, successRedirect) => {
  return (dispatch) => {
    // dispatch(login_sucess);

    // const html = "it's work";
    const userinfoString = localStorage.getItem('userinfo');
    const userinfo = JSON.parse(userinfoString);
    const email = userinfo.email;
    // console.log(typeof data);
    // const otp = parseInt(data);
    // console.log(typeof otp);
    const fromdata = new FormData();
    fromdata.append('email_address', email);
    fromdata.append('password', data.newPassword);

    fetch(`${baseUrl}/reset_password`, {
      method: 'POST',
      body: fromdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(forgetotp_success(responseData.data));
          successRedirect();
          toast.success(responseData.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        } else {
          toast.error(responseData.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
        //  localStorage.setItem("userinfo", response.data);
      })
      .catch((error) => {
        console.error('error failed:', error);
      });
  };
};

export const logoutpage = () => {
  return (dispatch) => {
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
  
    console.log(parsedToken);
    if (parsedToken) {
      fetch(`${baseUrl}/user/logout`, {
        method: 'POST',
       
        headers: { Authorization: `Bearer ${parsedToken}` }
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success === true) {
            dispatch(logout_success());
          }
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    } else {
      console.log('token is not found');
    }
  };
};
