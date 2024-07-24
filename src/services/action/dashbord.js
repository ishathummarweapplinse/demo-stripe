import { baseUrl } from '../../apiurl';
import { FECTCH_DASHDATA_ERROR, FECTCH_DASHDATA_LOADING, FECTCH_DASHDATA_SUCCESS } from '../constant';

export const fetch_dashdata_sucess = (data) => {
  return {
    type: FECTCH_DASHDATA_SUCCESS,
    payload: data
  };
};
export const fetch_dashdata_loading = () => {
  return {
    type: FECTCH_DASHDATA_LOADING
  };
};
export const fetch_dashdata_error = (data) => {
  return {
    type: FECTCH_DASHDATA_ERROR,
    payload: data
  };
};

export const dashboard_data = (Cuurentpage, totalpage) => {
  return (dispatch) => {
    dispatch(fetch_dashdata_loading());
    // const fromdata = new FormData();
    const data = localStorage.getItem('userinfo');
    if (data) {
      const parsedData = JSON.parse(data);
      const parsedToken = parsedData.token;
      // console.log(token);
      // fromdata.append('token', token);

      fetch(`${baseUrl}/dashboard`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${parsedToken}` }
        // body: fromdata
      })
        .then((res) => res.json())
        .then((responseData) => {
          totalpage(Math.ceil(responseData.total_number_of_data));
          if (responseData.success === true) {
            dispatch(fetch_dashdata_sucess(responseData.data));
            localStorage.setItem('dashboard', JSON.stringify(responseData.data));
            console.log(responseData.data);
          }
        });
    } else {
      console.error('No userinfo found in localStorage');
    }
  };
};
