import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../services/action/interst';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Modal, Space, Table } from 'antd';
import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import persone from '../../../assets/imags/person.png';
import { baseUrl } from '../../../apiurl';
import { useNavigate } from 'react-router-dom';

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
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: 'http://localhost:3000/app/Events/default'
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

const Event = () => {
  const [currentPage] = useState(1);
  const userdata = useSelector((state) => state.cluereducer?.data);
  const [selectedEvent, setselectedEvent] = useState();
  const [input, setInput] = useState(1);
const [eventdata,setevntdta]=useState(userdata || []);
  const [payamount, setpayamount] = useState();
  const [openadd, setOpenADD] = useState(false);
  const [openpay, setOpenPay] = useState(false);
  const showModaladd = (record) => {
    setselectedEvent(record);

    localStorage.setItem('eventid', record.key);
    setOpenADD(true);
  };

  useEffect(()=>{
    if(userdata){
      setevntdta(userdata);
    }
  },[userdata])
  const showModalpay = (amount) => {

    const baseamount =
      input * selectedEvent?.actions?.price - (input * selectedEvent?.actions?.price * selectedEvent?.disc_percentage) / 100;
    console.log(baseamount);
    localStorage.setItem('baseamount', baseamount);
    setpayamount(amount);
    setOpenPay(true);
  };
  console.log(userdata);
  const itemsPerPage = 10;
  const [totalPage, setTotalPage] = useState(1);
  console.log(totalPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchData(currentPage, itemsPerPage, (total) => {
        setTotalPage(total);
      })
    );
  }, [currentPage, itemsPerPage]);
  const todayfun = (messageTime) => {
    const d = moment(messageTime).format('hh:mm:ss A');

    return `${d} `;
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
            <Button className='theme-bg2'
              onClick={() => {
                showModaladd(record);
              }}
            >
              Book Now
            </Button>
          </Space>
        );
      }
    }
  ];
  //  console.log(userdata?.map((item)=>item.event_media.file_name[0]));
  const data = eventdata?.map((item) => ({
    key: item._id,
    event_name: item.event_name,
    event_media: item.event_media.map((item) => item.file_name),
    price: item.price,
    disc_percentage: item.disc_percentage,
    start_date: todayfun(item.start_date),
    end_date: todayfun(item.end_date),
    actions: item
  }));
  const handleModal = () => {

    localStorage.setItem('personecnt', input);
    // dispatch(addclue_data(input.cluename, id));
    // dispatch(editintersets_data(id, input));
    // setOpen(false);
    // setInput(1);

    setOpenADD(false);
  };

  const handleCancel = () => {
    // setOpen(false);
    setInput(1);
    setOpenADD(false);
    setOpenPay(false);
  };

// const [tax,settax]=useState(0);
const [discount,setdiscount]=useState(0);
const [total_amount,set_amount]=useState(0);
  useEffect(() => {
    console.log(input);
    console.log(selectedEvent);
   console.log( selectedEvent?.actions?.price);
    // settax(tax);
    const discount = input * selectedEvent?.price * selectedEvent?.disc_percentage / 100;
    console.log(discount);
    setdiscount(discount);
    const total = input * selectedEvent?.price - discount;
    const tax = total * 10 / 100;
    console.log(total);
    const total_amount = total+tax;
    set_amount(total_amount);
    console.log(total_amount);
  }, [input,selectedEvent]);

  const options = {
    mode: 'payment',
    amount: payamount,
    currency: 'usd',

    appearance: {}
  };
  const navigate = useNavigate();
  useEffect(() => {
    const iddata = localStorage.getItem('eventid');
    const total_amout = localStorage.getItem('total_amout');
    const personcnt = localStorage.getItem('personecnt');
    if (iddata && personcnt && total_amout) {
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
                console.log(response);
                if(response.status ==="succeeded"){
                  console.log(response?.balance_transaction);
                  // const  charge_id =response?.balance_transaction;
                  const datalocal = localStorage.getItem('userinfo');
                  const userid = JSON.parse(datalocal)._id;
                  const token = JSON.parse(datalocal).token;
                  const base = localStorage.getItem('baseamount');
                  const baseamount = JSON.parse(base);
                  console.log(iddata);
                  const formdata = new FormData();
                  formdata.append('payment_id', myParam);
                  formdata.append('event_id', iddata);
                  formdata.append('user_id', userid);
                  // formdata.append('transaction_id', charge_id);
                  formdata.append('participants_count', personcnt);
                  formdata.append('total_amount', total_amout);
                  formdata.append('base_amount', baseamount);
                  // formdata.append("total_transfered_amount", intentData?.amount_received);
                  formdata.append('charge_id', intentData?.latest_charge);
                  // formdata.append("payment_status",intentData?.status):
                  fetch(`${baseUrl}/event/book_event`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formdata
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      navigate('/app/Events/default');
                      localStorage.removeItem('personecnt');
                      localStorage.removeItem('eventid');
                      localStorage.removeItem('baseamount');
                      localStorage.removeItem('total_amout');
  
                      // window.history.replaceState(`https://api.stripe.com/v1/payment_intents/${myParam}`, 'https:3000/app/Events/default');});
                    });
                }
               
              });
          }
        });
    }

    // return ()=>{
    //   params.delete("myParam");
    // }
  }, []);
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
                <h3>{selectedEvent?.event_name}</h3>
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

         
       
                    <label>Total participate :{selectedEvent?.actions.participate_count}</label>
                    <div>
                      <label>Price :{selectedEvent?.actions?.price}</label>
                    </div>
                    <div>
                      <label>Starting Time :{selectedEvent?.start_date}</label>
                    </div>
                    <div>
                      <label>Ending Time :{selectedEvent?.end_date}</label>
                    </div>
                    <div className="w-50">
                    <label>   Select persone :
                      <Form.Select aria-label="Default select example" onChange={(e) => setInput(e.target.value)} value={input}>
                        {(() => {
                          const options = [];
                          console.log(selectedEvent);
                          for (let i = 1; i <= selectedEvent?.actions?.participate_count; i++) {
                            options.push(<option value={i}>{i}</option>);
                          }

                          return options;
                        })()}
                      </Form.Select>  </label>
                    </div>
                    <div></div>
                    <div className=" theme-bg    w-100 border-rounded"  >
                      <div className="mx-3">
                        <label>Total Amount :{input * selectedEvent?.actions?.price}</label>
                      </div>
                      <div className="mx-3">
                        <label>Discount :{selectedEvent?.disc_percentage}%</label>
                      </div>
                      <div className="mx-3">
                        <label>Offer Discount price:{discount}</label>
                      </div>
                      <div className="mx-3">
                        <label>Total Tax: 10%</label>
                      </div>
                      <div className="mx-3">
                        <label>Paid Amount:{total_amount}</label>
                      </div>
                    </div>
                    <Col sm={12}>
              <Col sm={12} className=" justify-content-end">
                {input !== '' ? (
                  <Button
                    className="border-0 p-1 mt-2 w-100 theme-bg2"
                    onClick={() => {
                      handleModal();
                      showModalpay(total_amount);
                      localStorage.setItem('total_amout', total_amount);
                    }}
                  >
                    pay
                  </Button>
                ) : (
                  <Button
                    className="border-0 p-1 mt-2 w-100 "
                    disabled
                    style={{ backgroundColor: 'gray', color: 'white' }}
                    onClick={handleModal}
                  >
                    pay
                  </Button>
                )}
              </Col>
            </Col>
                  </div>
          
    
            </Col>
        
          </Row>
        </Modal>
        <Modal title="Payment" open={openpay} onCancel={handleCancel} footer={null}>
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
      {/* <PaymentFrom amounts={total_amout}></PaymentFrom> */}
    </div>
  );
};

export default Event;
