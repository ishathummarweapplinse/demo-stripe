import { toast } from 'react-toastify';
import { baseUrl, baseurl1 } from '../../apiurl';
import {
  ADMIN_CONNECTION_LIST_ERROR,
  ADMIN_CONNECTION_LIST_LOADING,
  ADMIN_CONNECTION_LIST_SUCCESS,
  FETCHDELETE_USER_ERROR,
  FETCHDELETE_USER_LOADING,
  FETCHDELETE_USER_SUCESS,
  FETCHUSER_BLOCK_ERROR,
  FETCHUSER_BLOCK_LOADING,
  FETCHUSER_BLOCK_SUCESS,
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCESS,
  GAMELISTDELETE_ERROR,
  GAMELISTDELETE_LOADING,
  GAMELISTDELETE_SUCCESS,
  GAMELIST_ERROR,
  GAMELIST_LOADING,
  GAMELIST_SUCCESSPRIVATE,
  GAMELIST_SUCCESSPUBLIC,
  GAME_ERROR,
  GAME_LOADING,
  GAME_SUCCESS,
  USERBANK_DATA_ERROR,
  USERBANK_DATA_LOADING,
  USERBANK_DATA_SUCESS,
  USER_DATA_ERROR,
  USER_DATA_LOADING,
  USER_DATA_SUCESS,
  USER_GRPLIST_ERROR,
  USER_GRPLIST_LOADING,
  USER_GRPLIST_SUCCESS
} from '../constant';

export const fetch_user_loading = () => {
  return {
    type: FETCH_USER_LOADING
  };
};
export const fetch_user_sucess = (data) => {
  return {
    type: FETCH_USER_SUCESS,
    payload: data
  };
};
export const fetch_user_error = (data) => {
  return {
    type: FETCH_USER_ERROR,
    payload: data
  };
};

export const game_loading = () => {
  return {
    type: GAME_LOADING
  };
};
export const game_sucess = (data) => {
  return {
    type: GAME_SUCCESS,
    payload: data
  };
};
export const game_error = (data) => {
  return {
    type: GAME_ERROR,
    payload: data
  };
};

export const gamelist_loading = () => {
  return {
    type: GAMELIST_LOADING
  };
};
export const gamelist_sucessprivate = (data) => {
  return {
    type: GAMELIST_SUCCESSPRIVATE,
    payload: data
  };
};
export const gamelist_sucesspublic = (data) => {
  return {
    type: GAMELIST_SUCCESSPUBLIC,
    payload: data
  };
};
export const gamelist_error = (data) => {
  return {
    type: GAMELIST_ERROR,
    payload: data
  };
};
export const gamelistdelete_loading = () => {
  return {
    type: GAMELISTDELETE_LOADING
  };
};
export const gamelistdelete_sucess = (data) => {
  return {
    type: GAMELISTDELETE_SUCCESS,
    payload: data
  };
};
export const gamelistdelete_error = (data) => {
  return {
    type: GAMELISTDELETE_ERROR,
    payload: data
  };
};

export const fetchdelete_user_loading = () => {
  return {
    type: FETCHDELETE_USER_LOADING
  };
};
export const fetchdelete_user_sucess = (data) => {
  return {
    type: FETCHDELETE_USER_SUCESS,
    payload: data
  };
};
export const fetchdelete_user_error = (data) => {
  return {
    type: FETCHDELETE_USER_ERROR,
    payload: data
  };
};

export const fetchuser_block_sucess = (data) => {
  return {
    type: FETCHUSER_BLOCK_SUCESS,
    payload: data
  };
};

export const fetchuser_block_loading = () => {
  return {
    type: FETCHUSER_BLOCK_LOADING
  };
};
export const fetchuser_blocksub_sucess = (data) => {
  return {
    type: FETCHUSER_BLOCK_ERROR,
    payload: data
  };
};
export const fetchuser_data_loading = () => {
  return {
    type: USER_DATA_LOADING
  };
};

export const fetchuser_data_sucess = (data) => {
  return {
    type: USER_DATA_SUCESS,
    payload: data
  };
};
export const fetchuser_data_error = (data) => {
  return {
    type: USER_DATA_ERROR,
    payload: data
  };
};

export const fetchuserbank_data_loading = () => {
  return {
    type: USERBANK_DATA_LOADING,
  };
};

export const fetchuserbank_data_sucess = (data) => {
  return {
    type: USERBANK_DATA_SUCESS,
    payload: data
  };
};
export const fetchuserbank_data_error = (data) => {
  return {
    type: USERBANK_DATA_ERROR,
    payload: data
  };
};


export const user_grp_loading = () => {
  return {
    type: USER_GRPLIST_LOADING
  };
};

export const user_grp_sucess = (data) => {
  return {
    type: USER_GRPLIST_SUCCESS,
    payload: data
  };
};
export const user_grp_error = (data) => {
  return {
    type: USER_GRPLIST_ERROR,
    payload: data
  };
};

export const admin_connection_list_loading = () => {
  return {
    type: ADMIN_CONNECTION_LIST_LOADING
  };
};

export const admin_connection_list_success = (data) => {
  return {
    type: ADMIN_CONNECTION_LIST_SUCCESS,
    payload: data
  };
};

export const admin_connection_list_error = (error) => {
  return {
    type: ADMIN_CONNECTION_LIST_ERROR,
    payload: error
  };
};

export const fetchuser = (Cuurentpage) => {
  return (dispatch) => {
    dispatch(fetch_user_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('limit', 10);
    formdata.append('page', Cuurentpage);
    fetch(`${baseurl1}/user_details/user_list`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_user_sucess(responseData.data));
          localStorage.setItem('userlist', JSON.stringify(responseData.data));
          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'bottom-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'light'
          // });
        }
      });
  };
};

export const fetchgamelist = (selectedGameType) => {
  return (dispatch) => {
    dispatch(gamelist_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('game_type', selectedGameType);
    // formdata.append('limit', 10);
    // formdata.append('page', Cuurentpage);
    fetch(`${baseurl1}/game/game_list`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          // console.log(responseData.data?.game_type);
          if (selectedGameType === 'private') {
            dispatch(gamelist_sucessprivate(responseData.data));
            localStorage.setItem('gamelistprivate', JSON.stringify(responseData.data));
          } else {
            dispatch(gamelist_sucesspublic(responseData.data));
            localStorage.setItem('gamelistpublic', JSON.stringify(responseData.data));
          }

          console.log(responseData.data);
        }
      });
  };
};
export const deletegamelist_data = (selectedGameType) => {
  return (dispatch) => {
    dispatch(gamelistdelete_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('game_id', selectedGameType);
    // formdata.append('limit', 10);
    // formdata.append('page', Cuurentpage);
    fetch(`${baseurl1}/game/delete_game`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(gamelistdelete_sucess(responseData));

          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'bottom-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'light'
          // });
        }
      });
  };
};
export const deeltefetchuser = (id) => {
  return (dispatch) => {
    dispatch(fetchdelete_user_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('user_id', id);

    fetch(`${baseurl1}/user_details/delete_user`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetchdelete_user_sucess(responseData));

          console.log(responseData.data);
          toast.success(responseData.message, {
            position: 'bottom-right',
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
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
      });
  };
};

export const usreblock = (id) => {
  return (dispatch) => {
    dispatch(fetchuser_block_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('user_id', id);

    fetch(`${baseurl1}/user_details/block_user  `, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetchuser_block_sucess(responseData.data));

          console.log(responseData.data);
          toast.success(responseData.message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
      });
  };
};


export const usredatabank = (data) => {
  return (dispatch) => {
    dispatch(fetchuserbank_data_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
console.log(data.date);
const d=new Date(data.date);
const day= d.getDate();
    const month=d.getMonth()+1;
    const year=d.getFullYear();
    formdata.append('email', data.email);
    formdata.append('first_name', data.fname);
    formdata.append('last_name', data.lname);
    formdata.append('mobile_number', data.mobno);
    formdata.append('dob_day',day);
    formdata.append('dob_month',month);
    formdata.append('dob_year', year);
    formdata.append('address_line1', data.address);
    formdata.append('address_city', data.city);
    formdata.append('address_state', data.state);
   formdata.append('address_postal_code',data.postalcode);
   formdata.append('account_number', data.acnumber);
   formdata.append('govt_id_number', data.govtid);
   formdata.append('ssn_last_4', data.ssnno);
     formdata.append('routing_number', data.routingno);

    fetch(`${baseUrl}/account/create_account`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetchuserbank_data_sucess(responseData.data));

          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'bottom-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'light'
          // });
        }
      });
  };
};

export const usredata = (data) => {
  return (dispatch) => {
    dispatch(fetchuser_data_loading());
    // const auth_token = localStorage.getItem('userinfo');
    // const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
console.log(data.date);
const d=data.date;
const day= d.getDay();
    const month=d.getMonth()+1;
    const year=d.getFullYear();
    formdata.append('email', data.email);
    formdata.append('first_name', data.fname);
    formdata.append('last_name', data.lname);
    formdata.append('moblie_number', data.mobno);
    formdata.append('dob_day',day);
    formdata.append('dob_month',month);
    formdata.append('dob_year', year);
    formdata.append('address_line1', data.address);
    formdata.append('address_city', data.city);
    formdata.append('address_state', data.state);
   formdata.append('address_postal_code',data.postal_code);
   formdata.append('account_number', data.acnumber);
   formdata.append('govt_id_number', data.govtid);
   formdata.append('ssn_last_4', data.ssnno);
     formdata.append('routing_number', data.routingno);

    fetch(`${baseUrl}/account/create_account  `, {
      method: 'POST',
      body: formdata,
    
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetchuser_data_sucess(responseData.data));

          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'bottom-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'light'
          // });
        }
      });
  };
};

export const usregrpdata = (id) => {
  return (dispatch) => {
    dispatch(user_grp_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('user_id', id);

    fetch(`${baseurl1}/user_details/friends_list`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(user_grp_sucess(responseData.data));

          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'bottom-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'light'
          // });
        }
      });
  };
};

export const fetchgameData = (id) => {
  return (dispatch) => {
    dispatch(admin_connection_list_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();

    formdata.append('user_id', id);

    fetch(`${baseurl1}/game/user_game_list`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(admin_connection_list_success(responseData.data));

          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'bottom-right',
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'light'
          // });
        } else {
          dispatch(admin_connection_list_error(responseData.message));
          console.error('Error:', responseData.message);
          toast.error(responseData.message, {
            position: 'bottom-right',
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
        dispatch(admin_connection_list_error(error.message));
        console.error('Error:', error);
        toast.error('An error occurred while fetching admin connection data', {
          position: 'bottom-right',
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
