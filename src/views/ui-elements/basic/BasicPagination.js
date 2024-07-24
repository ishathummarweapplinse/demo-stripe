import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Input, Modal, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import { addchat_data } from '../../../services/action/interst';
import Search from 'antd/es/transfer/search';
// import camero from '../../../assets/imags/camero-removebg-preview.png';

const BasicBreadcrumbPagination = () => {
  const dispatch = useDispatch();
  const data = localStorage.getItem('categories');
  let ids = JSON.parse(data);
  console.log(ids && ids.map((item) => item._id));

  // const subadata = useSelector((state) => state.chatred?.data);
  // console.log(subadata);
  const [interests, setInterests] = useState(subadata || []);
  const [input, setInput] = useState({ chatmsg: '' });
  const [editid, seteditid] = useState();
  console.log(interests);

  const [openadd, setOpenADD] = useState(false);
  const [openedit, setopenedit] = useState(false);
  // const hexString = useMemo(() => (typeof colorHex === 'string' ? colorHex : colorHex?.toHexString()), [colorHex]);
  const dataadd = useSelector((state) => state.chataddred?.data);

  const editdata = useSelector((state) => state.chateditred?.data);
  const editsubdata = useSelector((state) => state.editsubintersetreducer?.data);

  console.log(editdata);
  console.log(dataadd);
  //  console.log(addinterest);
  console.log('editsub', editsubdata);
  useEffect(() => {
    const data = localStorage.getItem('chat');
    if (data) {
      console.log(JSON.parse(data));
      setInterests(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    if (interests?.length > 0) {
      localStorage.setItem('chat', JSON.stringify(interests));
    }
  }, [interests]);
  useEffect(() => {
    if (subadata) {
      setInterests(subadata);
    }
  }, [subadata]);
  useEffect(() => {
    console.log(dataadd);
    if (dataadd) {
      setInterests([...interests, dataadd]);
    }
  }, [dataadd]);

  useEffect(() => {
    if (editdata && editdata._id) {
      setInterests((prevInterests) =>
        prevInterests.map((interest) =>
          interest._id === editdata._id
            ? {
                ...interest,
                chat_message: editdata.chat_message
              }
            : interest
        )
      );
    }
  }, [editdata]);

  const handleCancel = () => {
    setOpenADD(false);
    setInput({ chatmsg: '' });
    setopenedit(false);
  };
  useEffect(() => {
    const data = localStorage.getItem('chat');
    setInterests(JSON.parse(data));

    // dispatch(chat_data());
  }, []);

  const handleModal = () => {
    console.log(input);
    dispatch(addchat_data(input));

    setInput({ chatmsg: '' });

    setOpenADD(false);
  };
  const handleModaledit = (e) => {
    e.preventDefault();
    console.log(editid);
    dispatch(editchat_data(editid, input));
    setInput({ chatmsg: '' });
    setopenedit(false);
  };

  const showModaledit = (item) => {
    // setopenedit(true);
    console.log(item);
    setInput({ chatmsg: item.chat_message });

    seteditid(item._id);
    console.log(item._id);
  };

  const showModaladd = () => {
    setOpenADD(true);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  // console.log(interests);
  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase().trim();

    const searchData = interests.filter((item) => {
      const interest = item.chat_message.toLowerCase().includes(searchTerm);

      return interest;
    });
    console.log('serchdata', searchData);
    setSearchItems(searchData);
    console.log('serchitems', searchTerm);
    setSearchTerm(searchTerm);
  };
  console.log(interests);

  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }

  const handledelete = (itemId) => {
    // dispatch(deeltechat(itemId));
    setInterests((prevInterests) => prevInterests.filter((item) => item._id !== itemId));
  };

  console.log(searchItems);
  // console.log(blockedItems);
  // console.log(blockedItemsSub);

  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col sm={8}>
          <Search
            placeholder="input search text"
            className="ms-1 mb-4 custom-search"
            allowClear
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            style={{ width: '100%', height: '80px' }}
          />
        </Col>
        <Col className=" d-flex  justify-content-end p-0 mb-4   " sm={4}>
          <Button className="theme-bg" onClick={showModaladd}>
            + Add Suggestions
          </Button>
        </Col>
      </Row>
      <Row>
        {/* {searchTerm && searchItems.length === 0 ? (
          <tr>
            <td colSpan="8">No Data...</td>
          </tr>
        ) : (
          (searchTerm ? searchItems : interests).map((item, index) => (
            <Col className="d-flex justify-space-between  flex-nowrap p-2 col-4" key={index} sm={3}>
              <Card
                style={{ backgroundColor: 'black', color: 'white', width: '350px', border: '1px solid gray' }}
                className="m-1 p-2  rounded"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>{item.chat_message}</div>
                </div>

                <Divider
                  orientation="left"
                  plain
                  className="text-white ant-divider-horizontal ant-divider-with-text"
                  style={{ color: 'gray', height: '8px' }}
                >
                  Action
                </Divider>
                <Col className=" d-flex">
                  <span className="p-2">
                    {' '}
                    <button
                      className="btn-outline-primary border border-primary px-2"
                      onClick={() => {
                        showModaledit(item);
                      }}
                    >
                      <span role="img" aria-label="edit" className="anticon anticon-edit">
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
                  <span className="p-2">
                    <Popconfirm
                      title="Are you sure want to delete?"
                      onConfirm={() => {
                        handledelete(item._id);
                      }}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        type="button"
                        className="ant-btn px-2  css-2q8sxy ant-btn-default ant-btn-sm ant-btn-dangerous d-flex align-items-center "
                        style={{ backgroundColor: 'transparent' }}
                      >
                        <span role="img" aria-label="delete" className="anticon anticon-delete">
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="delete"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                          </svg>
                        </span>
                      </button>
                    </Popconfirm>
                  </span>
                </Col>
              </Card>
            </Col>
          ))
        )} */}
        {searchTerm && searchItems?.length === 0 ? (
          <tr>
            <td colSpan="8">No Data...</td>
          </tr>
        ) : (
          <>
            {(searchTerm ? searchItems : interests)?.map((item, index) => (
              <Col className="d-flex justify-space-between flex-nowrap p-2 col-4" key={index} sm={3}>
                <Card
                  style={{ backgroundColor: 'black', color: 'white', width: '350px', border: '1px solid gray' }}
                  className="m-1 p-2 rounded"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>{item.chat_message}</div>
                  </div>
                  <Divider
                    orientation="left"
                    plain
                    className="text-white ant-divider-horizontal ant-divider-with-text"
                    style={{ color: 'gray', height: '8px' }}
                  >
                    Action
                  </Divider>
                  <Col className="d-flex">
                    <span className="p-2">
                      <button className="btn-outline-primary border border-primary px-2" onClick={() => showModaledit(item)}>
                        <span role="img" aria-label="edit" className="anticon anticon-edit">
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
                    <span className="p-2">
                      <Popconfirm
                        title="Are you sure want to delete?"
                        onConfirm={() => handledelete(item._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button
                          type="button"
                          className="ant-btn px-2 css-2q8sxy ant-btn-default ant-btn-sm ant-btn-dangerous d-flex align-items-center"
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <span role="img" aria-label="delete" className="anticon anticon-delete">
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="delete"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                            </svg>
                          </span>
                        </button>
                      </Popconfirm>
                    </span>
                  </Col>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
      <Modal title="Edit Suggestion" open={openedit} onCancel={handleCancel} footer={null} style={{ backgroundColor: 'black' }}>
        <Row>
          <Col sm={12}>
            <div className="d-flex">
              <Col sm={12}>
                <Input
                  placeholder="Enter Suggestion"
                  value={input.chatmsg}
                  required
                  name="categoryname"
                  className="custom-placeholder"
                  onChange={(e) => setInput({ ...input, chatmsg: e.target.value })}
                />
              </Col>
            </div>

            <Col sm={12} className="d-flex justify-content-end">
              {input.chatmsg !== '' ? (
                <Button
                  className="border-0 p-1 mt-2 theme-bg"
                  onClick={(e) => {
                    handleModaledit(e, editid);
                  }}
                >
                  + Edit
                </Button>
              ) : (
                <Button
                  className="border-0 p-1 mt-2 "
                  onClick={(e) => {
                    handleModaledit(e, editid);
                  }}
                  style={{ backgroundColor: 'gray', color: 'white' }}
                  disabled
                >
                  + Edit
                </Button>
              )}
            </Col>
          </Col>
        </Row>
      </Modal>{' '}
      <Modal title="Add Suggestion" open={openadd} onCancel={handleCancel} footer={null}>
        <Row>
          <Col sm={12}>
            <div className="d-flex">
              <Col sm={12}>
                <Input
                  placeholder="Enter Suggestion"
                  value={input.chatmsg}
                  required
                  name="chatmsg"
                  className="custom-placeholder"
                  onChange={(e) => setInput({ ...input, chatmsg: e.target.value })}
                />
              </Col>
            </div>

            <Col sm={12} className="d-flex justify-content-end">
              {input.chatmsg !== '' ? (
                <Button className="border-0 p-1 mt-2 theme-bg" onClick={handleModal}>
                  + Add
                </Button>
              ) : (
                <Button className="border-0 p-1 mt-2 " onClick={handleModal} style={{ backgroundColor: 'gray', color: 'white' }} disabled>
                  + Add
                </Button>
              )}
            </Col>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
};

export default BasicBreadcrumbPagination;
