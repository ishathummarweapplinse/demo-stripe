import { toast } from 'react-toastify';
import { baseUrl, baseurl1 } from '../../apiurl';
import {
  FECTCH_ADDINTERESTS_ERROR,
  FECTCH_ADDINTERESTS_SUCCESS,
  FECTCH_ADDSUBINTERESTS_ERROR,
  FECTCH_ADDSUBINTERESTS_LOADING,
  FECTCH_ADDSUBINTERESTS_SUCCESS,
  FECTCH_CATEGORY_ERROR,
  FECTCH_CATEGORY_LOADING,
  FECTCH_CATEGORY_SUCCESS,
  FECTCH_EDITINTERESTS_ERROR,
  ADD_CLUE_LOADING,
  ADD_CLUE_SUCCESS,
  ADD_CLUE_ERROR,
  FECTCH_EDITINTERESTS_LOADING,
  FECTCH_EDITINTERESTS_SUCCESS,
  FECTCH_EDITSUBINTERESTS_ERROR,
  FECTCH_EDITSUBINTERESTS_LOADING,
  FECTCH_EDITSUBINTERESTS_SUCCESS,
  FECTCH_INTERESTS_ERROR,
  FECTCH_INTERESTS_LOADING,
  FECTCH_INTERESTS_SUCCESS,
  FECTCH_SUBINTERESTS_ERROR,
  FECTCH_SUBINTERESTS_LOADING,
  FECTCH_SUBINTERESTS_SUCCESS,
  // FETCH_BLOCKSUB_ERROR,
  FETCH_BLOCKSUB_LOADING,
  FETCH_BLOCKSUB_SUCESS,
  FETCH_BLOCK_LOADING,
  FETCH_BLOCK_SUCESS,
  DELETE_CLUE_LOADING,
  DELETE_CLUE_SUCCESS,
  DELETE_CLUE_ERROR,
  EDIT_CLUE_LOADING,
  EDIT_CLUE_SUCCESS,
  EDIT_CLUE_ERROR,
  BOOKINGDATA_LOADING,
  BOOKINGDATA_SUCCESS,
  BOOKINGDATA_ERROR,
  CHATADD_LOADING,
  CHATADD_SUCCESS,
  CHATADD_ERROR,
  CHATDELETE_LOADING,
  CHATDELETE_SUCCESS,
  CHATDELETE_ERROR,
  TRASCATION_LOADING,
  TRASCATION_SUCCESS,
  TRASCATIONERROR,
  FETCH_DATA_ERROR,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_LOADING,
  BOOKINGEDIT_LOADING
} from '../constant';

export const fetch_interserdata_sucess = (data) => {
  return {
    type: FECTCH_INTERESTS_SUCCESS,
    payload: data
  };
};
export const fetch_interserdata_loading = () => {
  return {
    type: FECTCH_INTERESTS_LOADING
  };
};
export const fetch_interserdata_error = (data) => {
  return {
    type: FECTCH_INTERESTS_ERROR,
    payload: data
  };
};
export const fetch_editinterserdata_sucess = (data) => {
  return {
    type: FECTCH_EDITINTERESTS_SUCCESS,
    payload: data
  };
};
export const fetch_editinterserdata_loading = () => {
  return {
    type: FECTCH_EDITINTERESTS_LOADING
  };
};
export const fetch_editinterserdata_error = (data) => {
  return {
    type: FECTCH_EDITINTERESTS_ERROR,
    payload: data
  };
};
export const fetch_editsubinterserdata_sucess = (data) => {
  return {
    type: FECTCH_EDITSUBINTERESTS_SUCCESS,
    payload: data
  };
};
export const fetch_editsubinterserdata_loading = () => {
  return {
    type: FECTCH_EDITSUBINTERESTS_LOADING
  };
};
export const fetch_editsubinterserdata_error = (data) => {
  return {
    type: FECTCH_EDITSUBINTERESTS_ERROR,
    payload: data
  };
};
export const fetch_subinterserdata_sucess = (data) => {
  return {
    type: FECTCH_SUBINTERESTS_SUCCESS,
    payload: data
  };
};
export const fetch_subinterserdata_loading = () => {
  return {
    type: FECTCH_SUBINTERESTS_LOADING
  };
};
export const fetch_subinterserdata_error = (data) => {
  return {
    type: FECTCH_SUBINTERESTS_ERROR,
    payload: data
  };
};

export const fetch_addinterserdata_sucess = (data) => {
  return {
    type: FECTCH_ADDINTERESTS_SUCCESS,
    payload: data
  };
};
export const fetch_addinterserdata_loading = () => {
  return {
    type: FECTCH_ADDINTERESTS_SUCCESS
  };
};
export const fetch_addinterserdata_error = (data) => {
  return {
    type: FECTCH_ADDINTERESTS_ERROR,
    payload: data
  };
};

export const fetch_addsubinterserdata_sucess = (data) => {
  return {
    type: FECTCH_ADDSUBINTERESTS_SUCCESS,
    payload: data
  };
};
export const fetch_addsubinterserdata_loading = () => {
  return {
    type: FECTCH_ADDSUBINTERESTS_LOADING
  };
};
export const fetch_addsubinterserdata_error = (data) => {
  return {
    type: FECTCH_ADDSUBINTERESTS_ERROR,
    payload: data
  };
};

export const fetch_block_sucess = (data) => {
  return {
    type: FETCH_BLOCK_SUCESS,
    payload: data
  };
};

export const fetch_block_loading = () => {
  return {
    type: FETCH_BLOCK_LOADING
  };
};
export const fetch_blocksub_sucess = (data) => {
  return {
    type: FETCH_BLOCKSUB_SUCESS,
    payload: data
  };
};

export const fetch_blocksub_loading = () => {
  return {
    type: FETCH_BLOCKSUB_LOADING
  };
};

export const fetch_category_error = (data) => {
  return {
    type: FECTCH_CATEGORY_ERROR,
    payload: data
  };
};
export const fetch_category_loadig = () => {
  return {
    type: FECTCH_CATEGORY_LOADING
  };
};

export const fetch_category_success = (data) => {
  return {
    type: FECTCH_CATEGORY_SUCCESS,
    payload: data
  };
};
// Action to indicate the start of a delete request
export const deleteClueLoading = () => ({
  type: DELETE_CLUE_LOADING
});

// Action to handle successful deletion
export const deleteClueSuccess = (data) => ({
  type: DELETE_CLUE_SUCCESS,
  payload: data
});

// Action to handle errors during deletion
export const deleteClueError = (error) => ({
  type: DELETE_CLUE_ERROR,
  payload: error
});
export const editClueLoading = () => ({
  type: EDIT_CLUE_LOADING
});

// Action to handle successful deletion
export const editClueSuccess = (data) => ({
  type: EDIT_CLUE_SUCCESS,
  payload: data
});

// Action to handle errors during deletion
export const editClueError = (error) => ({
  type: EDIT_CLUE_ERROR,
  payload: error
});

export const BOOKINGDATA_loading = () => {
  return {
    type: BOOKINGDATA_LOADING
  };
};
export const BOOKINGDATA_sucess = (data) => {
  return {
    type: BOOKINGDATA_SUCCESS,
    payload: data
  };
};
export const BOOKINGDATA_error = (data) => {
  return {
    type: BOOKINGDATA_ERROR,
    payload: data
  };
};
export const chatadd_loading = () => {
  return {
    type: CHATADD_LOADING
  };
};
export const chatadd_sucess = (data) => {
  return {
    type: CHATADD_SUCCESS,
    payload: data
  };
};
export const chatadd_error = (data) => {
  return {
    type: CHATADD_ERROR,
    payload: data
  };
};
export const chatdelete_loading = () => {
  return {
    type: CHATDELETE_LOADING
  };
};
export const chatdelete_sucess = (data) => {
  return {
    type: CHATDELETE_SUCCESS,
    payload: data
  };
};
export const chatdelete_error = (data) => {
  return {
    type: CHATDELETE_ERROR,
    payload: data
  };
};
export const bookedit_loading = () => {
  return {
    type: BOOKINGEDIT_LOADING
  };
};
export const bookedit_sucess = (data) => {
  return {
    type: BOOKINGDATA_SUCCESS,
    payload: data
  };
};
export const bookedit_error = (data) => {
  return {
    type: BOOKINGDATA_ERROR,
    payload: data
  };
};
export const trasction_loading = () => {
  return {
    type: TRASCATION_LOADING
  };
};
export const trasction_sucess = (data) => {
  return {
    type: TRASCATION_SUCCESS,
    payload: data
  };
};
export const trasction_error = (data) => {
  return {
    type: TRASCATIONERROR,
    payload: data
  };
};
export const addClueLoading = () => ({ type: ADD_CLUE_LOADING });
export const addClueSuccess = (data) => ({ type: ADD_CLUE_SUCCESS, payload: data });
export const addClueError = (data) => ({ type: ADD_CLUE_ERROR, payload: data });
export const intersets_data = () => {
  return (dispatch) => {
    dispatch(fetch_interserdata_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    fetch(`${baseurl1}/categories/list_category`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_interserdata_sucess(responseData.data));
          localStorage.setItem('categories', JSON.stringify(responseData.data));
          console.log(responseData.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const subintersets_data = () => {
  return (dispatch) => {
    dispatch(fetch_subinterserdata_loading());

    fetch(`${baseurl1}/interest/getsub_interest`, {
      method: 'POST'
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_subinterserdata_sucess(responseData.data));
          console.log(responseData.data);
          // toast.success(responseData.message, {
          //   position: 'top-right',
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

export const addintersets_data = (data) => {
  return (dispatch) => {
    dispatch(fetch_addinterserdata_loading());
    console.log(data);

    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('category_name', data.categoryname);
    formdata.append('price', data.price);
    formdata.append('description', data.dec);
    formdata.append('category_image', data.imgs);
    if (data.price > 0) {
      formdata.append('is_premium', true);
    } else {
      formdata.append('is_premium', false);
    }
    fetch(`${baseurl1}/categories/add_category`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_addinterserdata_sucess(responseData.data));
          console.log(responseData.data);

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
          dispatch(fetch_addinterserdata_error(responseData.message));
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
        console.error('Error:', error.message);
        dispatch(fetch_addinterserdata_error(error.message));
        toast.error(error.message, {
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

export const addclue_data = (data, id) => {
  return (dispatch) => {
    dispatch(addClueLoading());
    console.log(data);

    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('category_id', id);
    formdata.append('clue_name', data);
    fetch(`${baseurl1}/clues/add_clue`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(addClueSuccess(responseData.data));
          console.log(responseData.data);
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
          dispatch(addClueError(responseData.message));
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
        console.error('Error:', error.message);
        dispatch(addClueError(error.message));
        toast.error(error.message, {
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

export const deleteclue_data = (id) => {
  return (dispatch) => {
    dispatch(deleteClueLoading());
    console.log(id);

    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('clue_id', id);
    // formdata.append('clue_name', data);
    fetch(`${baseurl1}/clues/delete_clue`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(deleteClueSuccess(responseData));
          console.log(responseData.data);
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
          dispatch(deleteClueError(responseData.message));
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
        console.error('Error:', error.message);
        dispatch(deleteClueError(error.message));
        toast.error(error.message, {
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

export const editclue = (editid, id, data) => {
  return (dispatch) => {
    dispatch(editClueLoading());
    console.log(editid, id);
    console.log(data);

    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('clue_id', editid);
    formdata.append('category_id', id);
    formdata.append('clue_name', data);

    // formdata.append('clue_name', data);
    fetch(`${baseurl1}/clues/edit_clue`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(editClueSuccess(responseData.data));
          console.log(responseData.data);
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
          dispatch(editClueError(responseData.message));
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
        console.error('Error:', error.message);
        dispatch(editClueError(error.message));
        toast.error(error.message, {
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
export const editintersets_data = (editid, data) => {
  return (dispatch) => {
    dispatch(fetch_editinterserdata_loading());
    console.log(data);

    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('category_id', editid);
    formdata.append('category_name', data.categoryname);
    formdata.append('price', data.price);
    formdata.append('description', data.dec);
    formdata.append('category_image', data.imgs);
    if (data.price > 0) {
      formdata.append('is_premium', true);
    } else {
      formdata.append('is_premium', false);
    }
    fetch(`${baseurl1}/categories/edit_category`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_editinterserdata_sucess(responseData.data));
          console.log(responseData.data);
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
          dispatch(fetch_editinterserdata_error(responseData.message));
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
        console.error('Error:', error.message);
        dispatch(fetch_editinterserdata_error(error.message));
        toast.error(error.message, {
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
export const editsubintersets_data = (subeditinterestid, subintresetname) => {
  return (dispatch) => {
    dispatch(fetch_editsubinterserdata_loading());

    const formdata = new FormData();
    formdata.append('subinterest_id', subeditinterestid);
    formdata.append('sub_interest', subintresetname);

    fetch(`${baseurl1}/interest/edit_subinterest`, {
      method: 'POST',
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_editsubinterserdata_sucess(responseData.data));
          console.log(responseData.data);
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
        }
      });
  };
};

export const editblockintrest = (id) => {
  return (dispatch) => {
    dispatch(fetch_block_loading());

    const formdata = new FormData();
    formdata.append('interest_id', id);

    fetch(`${baseurl1}/interest/block_interest  `, {
      method: 'POST',
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_block_sucess(responseData.data));

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
export const editsubblockintrest = (id) => {
  return (dispatch) => {
    dispatch(fetch_blocksub_loading());

    const formdata = new FormData();
    formdata.append('subinterest_id', id);

    fetch(`${baseurl1}/interest/block_sub_interest  `, {
      method: 'POST',
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_blocksub_sucess(responseData.data));

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
export const deeltefetchcategory = (id) => {
  return (dispatch) => {
    dispatch(fetch_category_loadig());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('category_id', id);

    fetch(`${baseurl1}/categories/delete_category`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(fetch_category_success(responseData));

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

export const fetchDataLoading = () => {
  return { type: FETCH_DATA_LOADING };
};

export const fetchDataSuccess = (data) => {
  return { type: FETCH_DATA_SUCCESS, payload: data };
};
export const fetchDataError = (data) => {
  return { type: FETCH_DATA_ERROR, payload: data };
};

export const fetchData = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch(fetchDataLoading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;

    const formdata = new FormData();
    formdata.append('page', currentPage);
    formdata.append('limit', itemsPerPage);
    fetch(`${baseUrl}/event/get_events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${parsedToken}`
      },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          console.log(responseData.data);
          dispatch(fetchDataSuccess(responseData.data));
        } else {
          dispatch(fetchDataError('Failed to fetch clue data'));
          toast.error(responseData.message);
        }
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message));
      });
  };
};

export const fetchbookingdata = (id) => {
  return (dispatch) => {
    dispatch(BOOKINGDATA_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const fromdata = new FormData();
    fromdata.append('user_id', id);
    fetch(`${baseUrl}/event/get_booking_list`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: fromdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(BOOKINGDATA_sucess(responseData.data));
          // localStorage.setItem('categories', JSON.stringify(responseData.data));
          // localStorage.setItem('chat', JSON.stringify(responseData.data));
          console.log(responseData.data);
        } else {
          dispatch(BOOKINGDATA_error(responseData.message));
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
        console.error('Error:', error.message);
        dispatch(BOOKINGDATA_error(error.message));
        toast.error(error.message, {
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
export const editbooking_data = () => {
  return (dispatch) => {
    dispatch(bookedit_loading());
   
    
    // const totalAmountPay = localStorage.getItem('totalAmountPay');
    // if(totalAmountPay){

    //   const data = localStorage.getItem('editdata');
    //   const bokingid = JSON.parse(data)?.actions?._id;
    //   const editpercnt = localStorage.getItem('personecnt');
    //   const paymentid = JSON.parse(data)?.actions?.payment_id[0];
    //   const is_refund = false;
    //  console.log(charge_id, transction_id);
    //   const payamt = localStorage.getItem('totalAmountPay');
    //   const datalocal = localStorage.getItem('userinfo');
    //   const token = JSON.parse(datalocal).token;
    //   // const baseamount =localStorage.getItem('baseamount');
    //   const formdata = new FormData();
    //   formdata.append('charge_id', charge_id);
    //   formdata.append('transaction_id', transction_id);
    //   formdata.append('booking_id', bokingid);
    //   formdata.append('participants_count', editpercnt);
    //   formdata.append('is_refund', is_refund);
    //   formdata.append('payment_id', paymentid);
    //   // formdata.append('event_id', evenet_id);
    // //  formdata.append('base_amount',);
    //   formdata.append('payment_amount', payamt);
    //   // formdata.append("total_transfered_amount", intentData?.amount_received);
  
    //   fetch(`${baseUrl}/event/modify_booking`, {
    //     method: 'POST',
    //     body: formdata,
    //     headers: { Authorization: `Bearer ${token}` }
    //   })
    //     .then((res) => res.json())
    //     .then((responseData) => {
    //       if (responseData.success === true) {
    //         dispatch(bookedit_sucess(responseData.data));
    //         console.log(responseData.data);
    //         toast.success(responseData.message, {
    //           position: 'top-right',
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: 'light'
    //         });
    //         localStorage.removeItem('editpercnt');
    //         localStorage.removeItem('eventid');
    //        localStorage.removeItem('personecnt')
    //         localStorage.removeItem('editdata');
    //         localStorage.removeItem('totalAmountPay');
    //       }
    //     });
    // }
  
      // const data = localStorage.getItem('editdata');
      const data = localStorage.getItem('userinfo');
      const token = JSON.parse(data).token;
      const datalocal = localStorage.getItem('editdata');
      const bokingid = JSON.parse(datalocal)?.actions?._id;
      const editpercnt = localStorage.getItem('personecnt');
      // const paymentid = JSON.parse(data)?.actions?.payment_id[0];

      const is_refund = true;
      const payamt = localStorage.getItem('refundamt');
      const formdata = new FormData();
      
      const baseamount =localStorage.getItem('baseamount');
      
   const base_refund_amount =localStorage.getItem('base_refund_amount');

      
   formdata.append('participants_count', editpercnt);
      formdata.append('is_refund', is_refund);
      formdata.append('base_refund_amount', base_refund_amount);
      // formdata.append('event_id', evenet_id);
      formdata.append('booking_id', bokingid);
      formdata.append('refund_amount',baseamount);
      // formdata.append("total_transfered_amount", intentData?.amount_received);
  if(payamt){ fetch(`${baseUrl}/event/modify_booking`, {
    method: 'POST',
    body: formdata,
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((responseData) => {
      if (responseData.success === true) {
        dispatch(bookedit_sucess(responseData.data));
        console.log(responseData.data);
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
        localStorage.removeItem('editpercnt');
        localStorage.removeItem('eventid');
        localStorage.removeItem('editdata');
        localStorage.removeItem('personecnt')
         localStorage.removeItem('baseamount');
        localStorage.removeItem('base_refund_amount');
      }
    });}
     
    
   
  };
};

export const addchat_data = (data) => {
  return (dispatch) => {
    dispatch(chatadd_loading());
    console.log(data);

    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('chat_message', data.chatmsg);

    fetch(`${baseurl1}/quickchat/create_quick_chat`, {
      method: 'POST',
      body: formdata,
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(chatadd_sucess(responseData.data));
          console.log(responseData.data);
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
        }
      });
  };
};

export const deeltebooking = (id, user_id) => {
  return (dispatch) => {
    dispatch(chatdelete_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;
    const formdata = new FormData();
    formdata.append('booking_id', id);
    formdata.append('user_id', user_id);

    fetch(`${baseUrl}/event/cancel_booking`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${parsedToken}` },
      body: formdata
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success === true) {
          dispatch(chatdelete_sucess(responseData));

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

export const fetchtrascationData = () => {
  return (dispatch) => {
    dispatch(trasction_loading());
    const auth_token = localStorage.getItem('userinfo');
    const parsedToken = JSON.parse(auth_token)?.token;

    // const formdata = new FormData();

    fetch(`${baseurl1}/transaction/transaction_list`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${parsedToken}`
      }
    })
      .then((res) => res.json())
      .then((responseData) => {
        // setTotalPage(Math.ceil(responseData.total_number_of_data / 10)); // Assuming 10 items per page
        if (responseData.success) {
          console.log(responseData.data);

          dispatch(trasction_sucess(responseData.data));
          localStorage.setItem('trasection', JSON.stringify(responseData.data));
        }
      })
      .catch((error) => {
        dispatch(trasction_error(error.message));
      });

    // toast.error(responseData.message);
  };
};
