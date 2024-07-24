import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Input, Modal, Space, Divider, Empty, ColorPicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import {
  addintersets_data,
  addsubintersets_data,
  editblockintrest,
  editintersets_data,
  editsubblockintrest,
  editsubintersets_data,
  intersets_data,
  subintersets_data
} from '../../../services/action/interst';
import Search from 'antd/es/transfer/search';

const BasicButton = () => {
  const dispatch = useDispatch();
  const data = localStorage.getItem('interest');
  let ids = JSON.parse(data);
  console.log(ids && ids.map((item) => item._id));

  const [colorHex, setColorHex] = useState('#1677ff');
  const [formatHex, setFormatHex] = useState('hex');
  const subadata = useSelector((state) => state.subinterset?.data);
  const [interests, setInterests] = useState(subadata || []);
  const [input, setInput] = useState({ interestd: '', color: '' });
  const [editid, seteditid] = useState();
  const [subaddinterestid, setSubaddinterestid] = useState();
  const [subeditinterestid, seteditinterestid] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [subintresetname, setSubintrestname] = useState('');
  const [openadd, setOpenADD] = useState(false);
  const [openedit, setopenedit] = useState(false);
  const hexString = useMemo(() => (typeof colorHex === 'string' ? colorHex : colorHex?.toHexString()), [colorHex]);
  const addinterest = useSelector((state) => state.addinterest?.data);
  const dataadd = useSelector((state) => state.addsubinterest?.data);
  const editdata = useSelector((state) => state.editinterest?.data);
  const editsubdata = useSelector((state) => state.editsubintersetreducer?.data);
  // const blockdata = useSelector((state) => state.blockreducer?.data);
  // const blocksubdata = useSelector((state) => state.blocksubreducer?.data);
  // console.log(blockdata);
  console.log(editdata);
  console.log(dataadd);
  console.log(addinterest);
  console.log('editsub', editsubdata);
  useEffect(() => {
    if (subadata) {
      setInterests(subadata);
    }
  }, [subadata]);
  useEffect(() => {
    if (addinterest && addinterest._id && addinterest.interest) {
      setInterests((prevInterests) => [
        ...prevInterests,
        { _id: addinterest._id, interest: addinterest.interest, color_code: addinterest.color_code, sub_interest_data: [] }
      ]);
    }
  }, [addinterest]);

  useEffect(() => {
    if (editdata && editdata._id && editdata.interest) {
      setInterests((prevInterests) =>
        prevInterests.map((interest) =>
          interest._id === editdata._id
            ? {
                ...interest,
                interest: editdata.interest,
                color_code: editdata.color_code,
                sub_interest_data: []
              }
            : interest
        )
      );
    }
  }, [editdata, setInterests]);
  useEffect(() => {
    if (editsubdata?._id && editsubdata?.sub_interest) {
      setInterests((prevInterests) => {
        return prevInterests.map((interest) => {
          if (interest._id === editsubdata.interest_id) {
            const updatedSubInterestData = interest.sub_interest_data.map((subInterest) =>
              subInterest._id === editsubdata._id ? { ...subInterest, sub_interest: editsubdata.sub_interest } : subInterest
            );

            return {
              ...interest,
              sub_interest_data: updatedSubInterestData
            };
          }
          return interest;
        });
      });
    }
  }, [editsubdata, setInterests]);

  useEffect(() => {
    if (dataadd) {
      setInterests((prevInterests) => {
        const updatedInterests = prevInterests.map((interest) => {
          if (interest._id === dataadd.interest_id) {
            return {
              ...interest,
              sub_interest_data: [...interest.sub_interest_data, { sub_interest: dataadd.sub_interest }]
            };
          }
          return interest;
        });
        return updatedInterests;
      });
    }
  }, [dataadd]);

  useEffect(() => {
    setInput((prevInput) => ({ ...prevInput, color: hexString }));
  }, [hexString]);

  const handleCancel = () => {
    setOpen(false);
    setOpenADD(false);
    setOpen1(false);
    setopenedit(false);
  };
  useEffect(() => {
    dispatch(intersets_data());
    // dispatch(addsubintersets_data(subintresetname, subaddinterestid));
    dispatch(addintersets_data(input));
    dispatch(intersets_data());
    dispatch(subintersets_data());
  }, []);

  const handleModal = () => {
    if (input.interestd.trim()) {
      dispatch(addintersets_data(input));
      // setInput({ interestd: '', color: hexString });
      // dispatch(editintersets_data(id, input));
      setOpen(false);
    }
  };
  const handleModaledit = (e) => {
    e.preventDefault();
    console.log(editid);
    dispatch(editintersets_data(editid, input));
    setOpen(false);
  };
  const handelmodelsubedit = (e) => {
    e.preventDefault();
    console.log(subintresetname, subeditinterestid);
    dispatch(editsubintersets_data(subeditinterestid, subintresetname));
  };
  const showModaledit = (item) => {
    setopenedit(true);
    console.log(item);
    setSubintrestname(item.sub_interest);
    seteditinterestid(item._id);
    // console.log(subintresetname, subeditinterestid);
  };
  const handleModal1 = (e) => {
    e.preventDefault();
    if (subintresetname.trim()) {
      dispatch(addsubintersets_data(subintresetname, subaddinterestid));
      // setSubintrestname('');
      setOpen1(false);
    }
  };

  const showModal = (item) => {
    setOpen(true);
    setInput({ interestd: item.interest, color: item.color_code });
    seteditid(item._id);
    console.log(item._id);
  };
  const showModaladd = () => {
    setOpenADD(true);
  };
  const showModal1 = (id) => {
    setSubaddinterestid(id);
    setOpen1(true);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  console.log(interests);
  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase().trim();

    const searchData = interests.filter((item) => {
      const interest = item.sub_interest_data.map((subItem) => subItem.sub_interest.toLowerCase());

      return interest.some((subInterest) => subInterest.includes(searchTerm));
    });
    console.log(searchData);
    setSearchItems(searchData);
    console.log(searchItems);
    setSearchTerm(value);
  };
  console.log(interests);
  // const handelblock = (id) => {
  //   dispatch(editblockintrest(id));
  // };
  // function confirm(e, id) {
  //   console.log(e);
  //   dispatch(editblockintrest(id));
  // }

  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }
  const [blockedItems, setBlockedItems] = useState({});
  const [blockedItemsSub, setBlockedItemsSub] = useState({});
  const handleBlock = (itemId) => {
    if (!blockedItems[itemId]) {
      dispatch(editblockintrest(itemId));
      setBlockedItems((prevState) => ({
        ...prevState,
        [itemId]: true
      }));
    } else {
      dispatch(editblockintrest(itemId));
      setBlockedItems((prevState) => {
        const newState = { ...prevState };
        delete newState[itemId];
        return newState;
      });
    }
  };
  const handleBlocksub = (itemId) => {
    if (!blockedItemsSub[itemId]) {
      dispatch(editsubblockintrest(itemId));
      setBlockedItemsSub((prevState) => ({
        ...prevState,
        [itemId]: true
      }));
    } else {
      dispatch(editsubblockintrest(itemId));
      setBlockedItemsSub((prevState) => {
        const newStatesub = { ...prevState };
        delete newStatesub[itemId];
        return newStatesub;
      });
    }
  };
  console.log(searchItems);
  console.log(blockedItems);
  console.log(blockedItemsSub);
  return (
    <React.Fragment>
      <Row>
        <Col sm={8}>
          <Search
            placeholder="input search text"
            size="large"
            className="ms-1 mb-4 custom-search"
            allowClear
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            style={{ width: '100%' }}
          />
        </Col>
        <Col className=" d-flex  justify-content-end p-0" sm={4}>
          <Button className="shadow-2" variant="success" onClick={showModaladd}>
            + Add Interest
          </Button>
          <Modal title="Add Interest" open={openadd} onCancel={handleCancel} footer={null}>
            <Row>
              <Col sm={1}>
                <Space>
                  <ColorPicker format={formatHex} value={colorHex} onChange={setColorHex} onFormatChange={setFormatHex} />
                </Space>
              </Col>
              <Col sm={8}>
                <Input
                  placeholder="Interest Name"
                  value={input.interestd}
                  name="intname"
                  onChange={(e) => setInput({ ...input, interestd: e.target.value })}
                />
              </Col>
              <Col sm={3}>
                <Button className="border-0 p-1" style={{ backgroundColor: 'grey' }} onClick={handleModal}>
                  + add
                </Button>
              </Col>
            </Row>
          </Modal>
        </Col>
      </Row>
      {searchTerm && searchItems.length === 0 ? (
        <tr>
          <td colSpan="8">No Data...</td>
        </tr>
      ) : (
        (searchTerm ? searchItems : interests).map((item, index) => (
          <>
            <Card key={index} className=" rounded" style={{ border: '1px solid gray' }}>
              <Row className="mt-2 mx-3">
                <Col className="d-flex justify-content-start px-3 p-0" sm={6}>
                  <Button
                    className="shadow-2 border-0 m-1"
                    style={{ backgroundColor: `${item.color_code}30`, color: `${item.color_code}` }}
                  >
                    {item.interest}
                  </Button>
                </Col>
                <Col className=" d-flex  justify-content-end p-0 pe-3" sm={6}>
                  <span className="p-2">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      className="btn-outline-primary border border-primary"
                      data-icon="edit"
                      width="1.5rem"
                      height="1.5rem"
                      fill="#1677ff"
                      aria-hidden="true"
                      onClick={() => {
                        showModal(item);
                      }}
                    >
                      <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                    </svg>
                  </span>
                  <Modal title="Edit Interest" open={open} onCancel={handleCancel} footer={null}>
                    <Row>
                      <Col sm={1}>
                        <Space>
                          <ColorPicker format={formatHex} value={input.color} onChange={setColorHex} onFormatChange={setFormatHex} />
                        </Space>
                      </Col>
                      <Col sm={8}>
                        <Input
                          placeholder="Interest Name"
                          value={input.interestd}
                          name="intname"
                          onChange={(e) => setInput({ ...input, interestd: e.target.value })}
                        />
                      </Col>
                      <Col sm={3}>
                        <Button
                          className="border-0 p-1"
                          style={{ backgroundColor: 'grey' }}
                          onClick={(e) => {
                            handleModaledit(e, item._id);
                          }}
                        >
                          + Edit
                        </Button>
                      </Col>
                    </Row>
                  </Modal>
                  <span className="p-2">
                    <Popconfirm
                      title="Are you sure delete this task?"
                      onConfirm={() => {
                        handleBlock(item._id);
                      }}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="stop"
                        className=""
                        style={{ border: blockedItems[item._id] ? '1px solid rgb(3, 252, 36)' : '1px solid rgb(255, 134, 0)' }}
                        width="1.5rem"
                        height="1.5rem"
                        fill={blockedItems[item._id] ? 'rgb(3, 252, 36)' : 'rgb(255, 134, 0)'}
                        aria-hidden="true"
                        // onClick={() => {
                        //   handelblock(item._id);
                        // }}
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm234.8 736.5L223.5 277.2c16-19.7 34-37.7 53.7-53.7l523.3 523.3c-16 19.6-34 37.7-53.7 53.7z"></path>
                      </svg>
                    </Popconfirm>
                  </span>
                  <Button className="btn btn-outline-warning m-0" variant="success" onClick={() => showModal1(item._id)}>
                    + Add Sub-Interest
                  </Button>
                  <Modal open={open1} title="Add Sub-Interest" onCancel={handleCancel} footer={null}>
                    <Row>
                      <Col sm={8}>
                        <Input
                          placeholder="Sub-Interest Name"
                          value={subintresetname}
                          name="subintresetname"
                          onChange={(e) => setSubintrestname(e.target.value)}
                        />
                      </Col>
                      <Col sm={3}>
                        <Button className="border-0 p-1" style={{ backgroundColor: 'grey' }} onClick={handleModal1}>
                          + add
                        </Button>
                      </Col>
                    </Row>
                  </Modal>
                </Col>
              </Row>
              <Row className="mx-3 ">
                {item.sub_interest_data && item.sub_interest_data.length > 0 ? (
                  (searchTerm
                    ? item.sub_interest_data.filter((subItem) => subItem.sub_interest.toLowerCase().includes(searchTerm.toLowerCase()))
                    : item.sub_interest_data
                  ).map((subItem, subIndex) => (
                    <Col className="d-flex justify-space-between  flex-nowrap p-0 m-3 col-4" key={subIndex} sm={3}>
                      <Card
                        style={{ backgroundColor: 'black', color: 'white', width: '350px', border: '1px solid gray' }}
                        className="m-1  rounded"
                      >
                        <div className="m-3">{subItem.sub_interest}</div>
                        <Divider
                          orientation="left"
                          plain
                          className="text-white ant-divider-horizontal ant-divider-with-text"
                          style={{ color: 'white' }}
                        >
                          Action
                        </Divider>
                        <Col className=" d-flex  p-0 pe-3">
                          <span className="p-2">
                            {/* <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                className="btn-outline-primary border border-primary"
                                data-icon="edit"
                                width="1.5rem"
                                height="1.5rem"
                                // title="edit"
                                fill="#1677ff"
                                aria-hidden="true"
                              >
                                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                              </svg> */}
                            <button
                              className="btn-outline-primary border border-primary"
                              onClick={() => {
                                showModaledit(subItem);
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
                              <span> Edit</span>
                            </button>
                          </span>
                          <span className="p-2">
                            <Popconfirm
                              title="Are you sure delete this task?"
                              onConfirm={() => {
                                handleBlocksub(subItem._id);
                              }}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <button
                                className="ant-btn css-2q8sxy ant-btn-default ant-btn-sm ant-btn-background-ghost d-flex align-items-center category-small-button ms-2 btnorg"
                                style={{
                                  border: blockedItemsSub[subItem._id] ? '1px solid rgb(3, 252, 36)' : '1px solid rgb(255, 134, 0)'
                                }}
                              >
                                <span role="img" aria-label="stop" className="anticon anticon-stop">
                                  <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    data-icon="stop"
                                    width="1em"
                                    height="1em"
                                    fill={blockedItemsSub[subItem._id] ? 'rgb(3, 252, 36)' : 'rgb(255, 134, 0)'}
                                    aria-hidden="true"
                                  >
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm234.8 736.5L223.5 277.2c16-19.7 34-37.7 53.7-53.7l523.3 523.3c-16 19.6-34 37.7-53.7 53.7z"></path>
                                  </svg>
                                </span>
                                <span
                                  style={{ color: blockedItemsSub[subItem._id] ? 'rgb(3, 252, 36)' : 'rgb(255, 134, 0)' }}
                                  className="px-1"
                                >
                                  Block
                                </span>
                              </button>
                            </Popconfirm>

                            <Modal open={openedit} title="Edit Sub-Interest" onCancel={handleCancel} footer={null}>
                              <Row>
                                <Col sm={8}>
                                  <Input
                                    placeholder="Edit Sub-Interest"
                                    value={subintresetname}
                                    name="subintresetname"
                                    onChange={(e) => setSubintrestname(e.target.value)}
                                  />
                                </Col>
                                <Col sm={3}>
                                  <Button
                                    className="border-0 p-1"
                                    style={{ backgroundColor: 'grey' }}
                                    onClick={(e) => {
                                      handelmodelsubedit(e);
                                    }}
                                  >
                                    + Edit
                                  </Button>
                                </Col>
                              </Row>
                            </Modal>
                            {/* <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                data-icon="stop"
                                className=""
                                style={{ border: '1px solid rgb(255, 134, 0)' }}
                                width="1.5rem"
                                height="1.5rem"
                                fill=" rgb(255, 134, 0)"
                                aria-hidden="true"
                              >
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm234.8 736.5L223.5 277.2c16-19.7 34-37.7 53.7-53.7l523.3 523.3c-16 19.6-34 37.7-53.7 53.7z"></path>
                              </svg> */}
                          </span>
                          {/* <Button className="btn btn-outline-warning m-0" variant="success" onClick={showModal1}>
                              <span className="btn-text">+ Add Interest</span>
                            </Button> */}
                        </Col>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Empty />
                )}
              </Row>
            </Card>
          </>
        ))
      )}
    </React.Fragment>
  );
};

export default BasicButton;
