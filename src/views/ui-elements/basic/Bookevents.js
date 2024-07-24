import { Modal, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { deeltebooking, editbooking_data, fetchbookingdata } from '../../../services/action/interst';
import { useDispatch, useSelector } from 'react-redux';

import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';
import persone from '../../../assets/imags/person.png';
import { PaymentElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../apiurl';
import { toast } from 'react-toastify';

const CheckoutForm = (props) => {
  console.log(props.amount);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
    const datalocal = localStorage.getItem('userinfo');

    const customers_id = JSON.parse(datalocal).customer_id;
    console.log(customers_id);
    const paymentBody = {
      amount: props.amount * 100,

      currency: 'usd',
      'automatic_payment_methods[enabled]': 'true',

      transfer_group: 'balance_transfer',
      // application_fee_amount: Math.round(details?.booking_payment_info?.total_paid_amount - details?.booking_payment_info?.total_transfered_amount),
      // application_fee_amount: 200,
      // "transfer_data[destination]": paymentDetails?.bank_account_id,
      customer: customers_id
      // 'transfer_data[destination]': 'acct_1OHNb22U4piPbSws',
    };
    const authToken = 'sk_test_51PdAbWGBEEOtN0xibpePGPEicP0UfTL8Y7ChUBHLtpgqmFuEBAKkQQs5pDE9Rn9vktG0qHn5p3PjmOa10eUmbBh500B1eBMRjJ';

    const res = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(paymentBody)
    });

    if (res.ok) {
      const { client_secret } = await res.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: 'http://localhost:3000/app/bookevent'
        }
      });
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="text-white">
        <PaymentElement className="text-white" />
        <Button type="submit" disabled={!stripe || !elements} className="w-100">
          Pay
        </Button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </>
  );
};
CheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired
  // customer_id: PropTypes.string.isRequired
};
const stripePromise = loadStripe(
  'pk_test_51PdAbWGBEEOtN0xiQSC9OW24URRXM5kKYHR8F4ZusisJvIf9tOp5KxgWpSc0OHCoyYXSW1Bmo1Gwg0iX6YesRsXh00xc29gbow'
);

function Bookevents() {
  const navigate = useNavigate();
  const [payamount, setpayamount] = useState();

  const datalocal = localStorage.getItem('userinfo');
  const [selectedEvent, setselectedEvent] = useState();
  const [input, setInput] = useState(1);
  const [openadd, setOpenADD] = useState(false);
  const [tax, settax] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [discountpersona, setdiscountpersona] = useState(0);
  const [amount, setamount] = useState(0);
  const [totalPayamt, settotalPayamt] = useState(0);
  const [refund, setrefund] = useState(0);
  const [openpay, setOpenPay] = useState(false);
  const [personetotalamt, setpersonetotalamt] = useState(0);
  const [openedit, setOpenEDIT] = useState(false);
  const [periously, setperiously] = useState();
  const [baseamount, setbaseamount] = useState(0);
  const [base_amount, setbase_amount] = useState(0);

  useEffect(() => {
    if (selectedEvent) {
      setInput(selectedEvent.actions?.participants_count);
      setperiously(selectedEvent?.actions?.participants_count);
    }
  }, [selectedEvent]);
  useEffect(() => {
    const total_amount = periously * selectedEvent?.price;
    setamount(total_amount);
    console.log(total_amount);
    console.log(periously, input);
    const discountnumber = (total_amount * selectedEvent?.disc_percentage) / 100;
    console.log(discountnumber);
    if (selectedEvent?.disc_percentage === 0) {
      setdiscount(0);
    } else {
      setdiscount(discountnumber);
    }

    console.log(discountnumber);
    const taxamt = (total_amount - discountnumber * 10) / 100;
    settax(taxamt);
    console.log(taxamt);

    const persone = Math.abs(input - periously);
    console.log(persone);
    const discountnumberpersone = (persone * selectedEvent?.price * selectedEvent?.disc_percentage) / 100;
    console.log(discountnumberpersone);
    const taxamtpersone = ((persone * selectedEvent?.price - discountnumberpersone) * 10) / 100;
    console.log(taxamtpersone);
    if (selectedEvent?.disc_percentage === 0) {
      setdiscountpersona(0);
    } else {
      setdiscountpersona(discountnumberpersone);
    }
    console.log(taxamtpersone);
    setbaseamount(taxamtpersone);
    console.log(discountnumberpersone);
    if (periously === input) {
      // const amoutnumner = total_amount - discountnumber + taxamt;

      // console.log(amoutnumner);
      settotalPayamt(selectedEvent?.actions?.total_amount);
      // setpersonetotalamt(amoutnumner);

      setrefund(0);
    }
    if (periously < input) {
      const total_amountpersone = persone * selectedEvent?.price - discountnumberpersone + taxamtpersone;
      setpersonetotalamt(total_amountpersone);
      setrefund(0);
      const baseamt = persone * selectedEvent?.price - discountnumberpersone;
      setbase_amount(baseamt);
      console.log(baseamt);
      localStorage.setItem('paybaseamt', baseamt);
      console.log(total_amountpersone);
      const totalamt = selectedEvent?.actions?.total_amount;
      console.log(tax, discount, amount, personetotalamt);
      const amt = totalamt + total_amountpersone;
      // const amoutnumner = amt - total_amountpersone;

      // console.log(amoutnumner, total_amountpersone);
      settotalPayamt(amt);
      // const refundnumber = amoutnumner - total_amount;
      setrefund(0);
      // console.log(refundnumber);

      // console.log(amoutnumner, total_amount);
      console.log(totalPayamt);
      localStorage.setItem('editpercnt', input);
    } else {
      const total_amountpersone = persone * selectedEvent?.price - discountnumberpersone + taxamtpersone;
      const totalamt = selectedEvent?.actions?.total_amount;
      const amt = totalamt - total_amountpersone;
      settotalPayamt(amt);
      setrefund(total_amountpersone);
      if (periously > input) {
        localStorage.setItem('refundamt', total_amountpersone);
      }
      // setpersonetotalamt(0);
    }
  }, [input, selectedEvent, periously]);

  const showModal = (record) => {
    setselectedEvent(record);

    setOpenADD(true);
  };
  console.log(discountpersona);
  const showModalpay = (amount) => {
    if (refund) {
      setOpenPay(false);
      console.log(amount);

      setpayamount(amount);
    } else {
      setOpenPay(true);
      setpayamount(amount);
    }
  };
  const showModaledit = (record) => {
    setselectedEvent(record);
    console.log(record);
    setOpenPay(false);
    localStorage.setItem('editdata', JSON.stringify(record));
    setOpenEDIT(true);
  };
  const handleModal = (amount) => {
    console.log(input);
    localStorage.setItem('personecnt', input);
    localStorage.setItem('totalAmountPay', amount);
    //  dispatch(editbooking_data())
    // dispatch(addclue_data(input.cluename, id));
    // dispatch(editintersets_data(id, input));
    // setOpen(false);
    console.log(base_amount);
    setOpenADD(false);
  };
  const handleModaledit = (amount) => {
    console.log(input);
    localStorage.setItem('personecnt', input);
    console.log('dg');

    const base_refund_amount = amount - baseamount;
    const baseamt = base_refund_amount + baseamount;
    console.log(base_refund_amount, baseamount);
    localStorage.setItem('base_refund_amount', base_refund_amount);
    localStorage.setItem('baseamount', baseamt);
    dispatch(editbooking_data());
    // dispatch(addclue_data(input.cluename, id));
    // dispatch(editintersets_data(id, input));
    // setOpen(false);

    setOpenADD(false);
  };

  // const payamt = total_amt - selectedEvent?.actions?.total_amount;
  const options = {
    mode: 'payment',
    amount: payamount,
    currency: 'usd',

    appearance: {}
  };

  const datalocal2 = localStorage.getItem('editdata');
  // const refund = JSON.parse(datalocal2)?.actions?.
  // is_refunded;
  useEffect(() => {
    const iddata = JSON.parse(datalocal2)?.actions?._id;
    console.log(iddata);
    // const total_amout = localStorage.getItem('totalAmountPay');
    const personcnt = localStorage.getItem('personecnt');
    const totalAmountPay = localStorage.getItem('totalAmountPay');
    if (personcnt && totalAmountPay) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('payment_intent');
      console.log(myParam);
      const authToken = 'sk_test_51PdAbWGBEEOtN0xibpePGPEicP0UfTL8Y7ChUBHLtpgqmFuEBAKkQQs5pDE9Rn9vktG0qHn5p3PjmOa10eUmbBh500B1eBMRjJ';
      fetch(`https://api.stripe.com/v1/payment_intents/${myParam}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => res.json())
        .then((intentData) => {
          console.log(intentData);
          if (intentData) {
            fetch(`https://api.stripe.com/v1/charges/${intentData?.latest_charge}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then((res) => res.json())
              .then((response) => {
                console.log({ response });
                console.log(response?.balance_transaction);
                if (response.status === 'succeeded') {
                  console.log(response?.balance_transaction);
                  const charge_id = intentData?.latest_charge;
                  // const transction_id = response?.balance_transaction;

                  const data = localStorage.getItem('editdata');
                  const bokingid = JSON.parse(data)?.actions?._id;
                  const editpercnt = localStorage.getItem('personecnt');

                  const is_refund = false;
                  // console.log(charge_id, transction_id);
                  const payamt = localStorage.getItem('totalAmountPay');
                  const paybaseamt = localStorage.getItem('paybaseamt');
                  const datalocal = localStorage.getItem('userinfo');
                  const token = JSON.parse(datalocal).token;
                  // const baseamount =localStorage.getItem('baseamount');
                  const formdata = new FormData();
                  formdata.append('charge_id', charge_id);
                  // formdata.append('transaction_id', transction_id);
                  formdata.append('booking_id', bokingid);
                  formdata.append('participants_count', editpercnt);
                  formdata.append('is_refund', is_refund);
                  formdata.append('payment_id', myParam);
                  // formdata.append('event_id', evenet_id);
                  formdata.append('base_amount', paybaseamt);
                  formdata.append('payment_amount', payamt);
                  // formdata.append("total_transfered_amount", intentData?.amount_received);

                  fetch(`${baseUrl}/event/modify_booking`, {
                    method: 'POST',
                    body: formdata,
                    headers: { Authorization: `Bearer ${token}` }
                  })
                    .then((res) => res.json())
                    .then((responseData) => {
                      if (responseData.success === true) {
                        toast.success(responseData.message);
                        // dispatch(bookedit_sucess(responseData.data));
                        console.log(responseData.data);
                        localStorage.removeItem('paybaseamt');
                        localStorage.removeItem('editpercnt');
                        localStorage.removeItem('eventid');
                        localStorage.removeItem('personecnt');
                        localStorage.removeItem('editdata');
                        localStorage.removeItem('totalAmountPay');
                      }
                    });
                  // console.log(charge_id, transction_id);

                  navigate('/app/bookevent');
                }
              });
          }
        });
    } else {
      const data = localStorage.getItem('userinfo');
      const token = JSON.parse(data).token;
      const datalocal = localStorage.getItem('editdata');
      const bokingid = JSON.parse(datalocal)?.actions?._id;
      const editpercnt = localStorage.getItem('personecnt');
      // const paymentid = JSON.parse(data)?.actions?.payment_id[0];

      const is_refund = true;
      const payamt = localStorage.getItem('refundamt');
      const formdata = new FormData();

      const baseamount = localStorage.getItem('baseamount');

      const base_refund_amount = localStorage.getItem('base_refund_amount');

      formdata.append('participants_count', editpercnt);
      formdata.append('is_refund', is_refund);
      formdata.append('base_refund_amount', base_refund_amount);
      // formdata.append('event_id', evenet_id);
      formdata.append('booking_id', bokingid);
      formdata.append('refund_amount', baseamount);
      // formdata.append("total_transfered_amount", intentData?.amount_received);
      if (payamt) {
        fetch(`${baseUrl}/event/modify_booking`, {
          method: 'POST',
          body: formdata,
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => res.json())
          .then((responseData) => {
            if (responseData.success === true) {
              navigate('/app/bookevent');
              // dispatch(bookedit_sucess(responseData.data));
              console.log(responseData.data);
              toast.success(responseData.message);
              localStorage.removeItem('editpercnt');
              localStorage.removeItem('eventid');
              localStorage.removeItem('editdata');
              localStorage.removeItem('personecnt');
              localStorage.removeItem('refundamt');
              localStorage.removeItem('baseamount');
              localStorage.removeItem('base_refund_amount');
            }
          });
      }

      //  dispatch(editbooking_data());
    }

    // return ()=>{
    //   params.delete("myParam");
    // }
  }, []);
  console.log(selectedEvent);
  const handleCancel = () => {
    // setOpen(false);
    // setInput({ personecnt: '' });
    setOpenADD(false);
    setOpenEDIT(false);
  };
  const handleCancel2 = () => {
    // setOpen(false);
    // setInput({ personecnt: '' });
    setOpenADD(false);
    setOpenEDIT(false);
    setOpenPay(false);
  };
  const user_id = JSON.parse(datalocal)._id;
  console.log(user_id);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.bookdata?.data);

  const [Eventdata, setEventdata] = useState(userdata || []);
  // const itemsPerPage = 10;
  useEffect(() => {
    if (userdata) {
      setEventdata(userdata);
    }
  }, [userdata]);
  useEffect(() => {
    dispatch(fetchbookingdata(user_id));
  }, [input]);
  const todayfun = (messageTime) => {
    const d = moment(messageTime).format('hh:mm:ss A');

    return `${d} `;
  };

  const handeldeleteevent = (id) => {
    console.log(id);
    dispatch(deeltebooking(id, user_id));

    setEventdata((item) => item.filter((item) => item._id !== id));
    // console.log(id);
    // dispatch(deeltebooking_data(id));
  };
  const generateOptions = () => {
    const options = [];
    for (let i = 1; i <= selectedEvent?.actions?.event_details?.participate_count; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  const columns = [
    {
      title: 'Event_Name',
      dataIndex: 'event_name',
      key: 'event_name'
    },
    {
      title: 'imgs',
      dataIndex: 'event_media',
      key: 'event_media',
      render: (event_media) => {
        return (
          <div>
            <span>
              <img
                src={event_media[0]}
                alt="imgspic"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                className="mx-2"
                onError={(e) => (e.target.src = persone)}
              />
            </span>
          </div>
        );
      }
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'dicount',
      dataIndex: 'disc_percentage',
      key: 'disc_percentage'
    },
    {
      title: 'Start time',
      dataIndex: 'start_date',
      key: 'start_date'
    },
    {
      title: 'End Time',
      dataIndex: 'end_date',
      key: 'end_date'
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return (
          <Space size="middle">
            <a>
              <div
                className="me-2 action-button bg-transparent"
                style={{ border: ' 1px solid rgb(22, 119, 255)', color: 'rgb(22, 119, 255)' }}
              >
                <span role="img" aria-label="eye" className="anticon anticon-eye px-1">
                  <svg
                    onClick={() => {
                      showModal(record);
                    }}
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="eye"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                  </svg>
                </span>
              </div>
            </a>
            <a>
              <span className="p-2">
                <button className=" action-button bg-transparent " style={{ border: ' 1px solid rgb(251 8 28)', color: 'rgb(251 8 28)' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="rgb(251 8 28)"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      handeldeleteevent(record?.key);
                      console.log(record?.key);
                    }}
                  >
                    <path
                      d="M15.182 15.818L8.81802 9.45406M8.81802 15.818L15.182 9.45406"
                      stroke="rgb(251, 8, 28)"
                      fill="rgb(251 8 28)"
                      strokeWidth="1.85615"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            </a>
            <a>
              <span className="p-2">
                <button
                  className="btn-outline-primary border border-primary px-1"
                  onClick={() => {
                    showModaledit(record);
                  }}
                >
                  <span role="img" aria-label="edit" className="anticon anticon-edit ">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="edit"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                    </svg>
                  </span>
                </button>
              </span>
            </a>
          </Space>
        );
      }
    }
  ];
  const data =
    Eventdata.length > 0 &&
    Eventdata?.map((item) => ({
      key: item?._id,
      event_name: item?.event_details?.event_name,
      event_media: item?.event_details?.event_media.map((item) => item?.image_url),
      price: item?.event_details?.price,
      disc_percentage: item?.event_details?.disc_percentage,
      start_date: todayfun(item?.event_details?.start_date),
      end_date: todayfun(item?.end_date),
      actions: item
    }));
  return (
    <div>
      <Col sm={12}>
        <div className="mt-4">
          <Table columns={columns} dataSource={data} />
        </div>
        <Modal title="book event" open={openadd} onCancel={handleCancel} footer={null}>
          <Row>
            <Col sm={12}>
              <div className="border mx-1 px-1">
                <h3 className="d-flex justify-content-center text-center">{selectedEvent?.actions?.event_details?.event_name}</h3>
                <div className="d-flex justify-content-center text-center">
                  {selectedEvent?.event_media.map((imgs, index) => (
                    <img
                      key={index}
                      src={imgs}
                      alt="imgspic"
                      style={{ width: '50px', height: '50px', border: '1px solid' }}
                      className="mx-2 mb-2"
                      onError={(e) => (e.target.src = persone)}
                    />
                  ))}
                </div>
                <div className="w-70  text-center'">
                  <div>
                    <label>Total participate :{selectedEvent?.actions?.event_details?.participate_count}</label>
                    <div>
                      <label>Price :{selectedEvent?.actions?.event_details?.price}</label>
                    </div>
                    <div>
                      <label>Starting Time :{selectedEvent?.start_date}</label>
                    </div>
                    <div>
                      <label>Ending Time :{selectedEvent?.end_date}</label>
                    </div>
                    <div className="d-flex">Select persone :{selectedEvent?.actions?.participants_count}</div>
                    <div></div>
                    <div className=" theme-bg    w-100 border-rounded mt-1">
                      <div className="mx-2">
                        <label>Total Tax: 10%</label>
                      </div>
                      <div className="mx-2">
                        <label>Discount :{selectedEvent?.disc_percentage}%</label>
                      </div>

                      <div className="mx-2">
                        <label>Total Amount :{selectedEvent?.actions?.total_amount}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
        <Modal title="book edit event" open={openedit} onCancel={handleCancel} footer={null}>
          <Row>
            <div className="border mx-1 px-1">
              <h3 className="d-flex justify-content-center text-center">{selectedEvent?.actions?.event_details?.event_name}</h3>
              <div className="d-flex justify-content-center text-center">
                {selectedEvent?.event_media.map((imgs, index) => (
                  <img
                    key={index}
                    src={imgs}
                    alt="imgspic"
                    style={{ width: '50px', height: '50px', border: '1px solid' }}
                    className="mx-2 mb-2"
                    onError={(e) => (e.target.src = persone)}
                  />
                ))}
              </div>

              <div>
                <label>Total participate :{selectedEvent?.actions?.event_details?.participate_count}</label>
                <div>
                  <label>Price :{selectedEvent?.actions?.event_details?.price}</label>
                </div>
                <div>
                  <label>Starting Time :{selectedEvent?.start_date}</label>
                </div>
                <div>
                  <label>Ending Time :{selectedEvent?.end_date}</label>
                </div>

                <div> total amount :{selectedEvent?.actions?.total_amount}</div>
                <div className="w-50 d-flex">
                  <label>
                    Select persone :
                  </label>
                    <Form.Select  onChange={(e) => setInput(e.target.value)} value={input}>
                      {generateOptions()}
                    </Form.Select>
                </div>
                <div className=" theme-bg    w-100 border-rounded">
                  <div className="mx-3">
                    <label>Total Tax: 10%</label>
                  </div>
                  <div className="mx-3">
                    <label>Discount :{selectedEvent?.disc_percentage}%</label>
                  </div>

                  <div className="mx-3">
                    <label> Amount :{totalPayamt}</label>
                  </div>

                  <div className="mx-3">
                    <label>Total Amount Pay :{personetotalamt}</label>
                  </div>
                  <div className="mx-3">
                    <label>Total Amount refund : {refund}</label>
                  </div>
                </div>
                <Col sm={12}>
                  <Col sm={12} className=" justify-content-end">
                    {periously === input ? null : periously > input ? (
                      <Button
                        className="border-0 p-1 mt-2 w-100 theme-bg2"
                        onClick={() => {
                          handleModaledit(refund);
                          showModalpay(refund);
                        }}
                      >
                        Pay Refund
                      </Button>
                    ) : (
                      <Button
                        className="border-0 p-1 mt-2 w-100 theme-bg2"
                        onClick={() => {
                          handleModal(personetotalamt);
                          showModalpay(personetotalamt);
                        }}
                      >
                        Pay
                      </Button>
                    )}
                  </Col>
                </Col>
              </div>
            </div>
          </Row>
        </Modal>
        <Modal title="Payment" open={openpay} onCancel={handleCancel2} footer={null}>
          <Elements
            stripe={stripePromise}
            options={options}
            style={{
              backgroundColor: 'white',
              color: 'black'
            }}
          >
            <CheckoutForm amount={payamount} />
          </Elements>
        </Modal>
      </Col>
    </div>
  );
}

export default Bookevents;
