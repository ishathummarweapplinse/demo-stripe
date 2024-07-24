import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../apiurl';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';

function Widthdrw() {
//   const dispatch = useDispatch();
const [data,setdata]=useState();
const[withdrwamt,setwithdrwamt]=useState();
const datalocal = localStorage.getItem('userinfo');
const token = JSON.parse(datalocal).token;
  useEffect(() => {
    fetch(`${baseUrl}/event/get_amounts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => res.json())
      .then((response) => {
        if(response.success) {
            // toast.success(response.message);
        setdata(response.data);}

      });
  },[]);

  const handelwithdrw=()=>{
    fetch(`${baseUrl}/event/withdraw_amount`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => res.json())
        .then((response) => {
            if(response.success) {
                toast.success(response.message);
            setwithdrwamt(response.data);
            }
        });
  }
  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col className=" d-flex  p-0 mb-4   " sm={4}>
        <Button className="theme-bg text-white">total_amount : {data?.total_amount}</Button>
        <Button className="theme-bg mx-2  text-white">total_available_amount : {data?.total_available_amount}</Button>
          <Button className="theme-bg2 text-white" onClick={()=>{handelwithdrw()}}>Withdraw</Button>
     
          {/* <Button className="theme-bg2 mx-2  text-white">total_available_amount</Button> */}
        </Col>
      </Row>
       <div> {withdrwamt}</div>
    </React.Fragment>
  );
}

export default Widthdrw;
