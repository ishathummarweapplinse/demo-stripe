import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Input, Modal, Space, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import {
  addintersets_data,
  // addsubintersets_data,
  deeltefetchcategory,
  // editblockintrest,
  // editblockintrest,
  editintersets_data,
  // editsubblockintrest,
  // editsubblockintrest,
  // editsubintersets_data,
  intersets_data
  // subintersets_data
} from '../../../services/action/interst';
import Search from 'antd/es/transfer/search';
import camero from '../../../assets/imags/camero-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import person from '../../../assets/imags/person.png';
const BasicButton = () => {
  const dispatch = useDispatch();
  const data = localStorage.getItem('categories');
  let ids = JSON.parse(data);
  console.log(ids && ids.map((item) => item._id));

  // const [colorHex, setColorHex] = useState('#1677ff');
  // const [formatHex, setFormatHex] = useState('hex');
  const subadata = useSelector((state) => state.interestred?.data);

  const [interests, setInterests] = useState(subadata || []);
  const [input, setInput] = useState({ price: '0', dec: '', imgs: '', categoryname: '' });
  const [editid, seteditid] = useState();
  // const [subaddinterestid, setSubaddinterestid] = useState();
  // const [subeditinterestid, seteditinterestid] = useState();
  // const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  // const [localdata, setlocaldata] = useState();
  const [subintresetname, setSubintrestname] = useState('');
  const [openadd, setOpenADD] = useState(false);
  const [openedit, setopenedit] = useState(false);
  // const hexString = useMemo(() => (typeof colorHex === 'string' ? colorHex : colorHex?.toHexString()), [colorHex]);
  const addinterestt = useSelector((state) => state.addinterest?.data);
  const dataadd = useSelector((state) => state.addsubinterest?.data);
  const editdata = useSelector((state) => state.editinterest?.data);
  const editsubdata = useSelector((state) => state.editsubintersetreducer?.data);
  // const blockdata = useSelector((state) => state.blockreducer?.data);
  // const blocksubdata = useSelector((state) => state.blocksubreducer?.data);
  // console.log(blockdata);
  console.log(editdata);
  console.log(dataadd);
  console.log(addinterestt);
  console.log('editsub', editsubdata);
  useEffect(() => {
    if (subadata) {
      setInterests(subadata);
    }
  }, [subadata]);
  useEffect(() => {
    const data = localStorage.getItem('categories');
    console.log(data);
    if (data) {
      setInterests(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    if (interests?.length > 0) {
      localStorage.setItem('categories', JSON.stringify(interests));
    }
  }, [interests]);
  useEffect(() => {
    if (addinterestt && addinterestt._id) {
      setInterests((prevInterests) => [
        ...prevInterests,
        {
          _id: addinterestt?._id,
          category_name: addinterestt?.category_name,
          category_image: addinterestt?.category_image,
          description: addinterestt?.description,
          price: addinterestt?.price
        }
      ]);
      // const data = JSON.parse(localStorage.getItem('categories'));
      // localStorage.setItem('categories', {
      //   ...data,
      //   _id: addinterestt?._id,
      //   category_name: addinterestt?.category_name,
      //   category_image: addinterestt?.category_image,
      //   description: addinterestt?.description,
      //   price: addinterestt?.price
      // });
    }
  }, [addinterestt]);

  useEffect(() => {
    if (editdata && editdata._id) {
      setInterests((prevInterests) =>
        prevInterests.map((interest) =>
          interest._id === editdata._id
            ? {
                ...interest,
                category_name: editdata.category_name,
                category_image: editdata.category_image,
                description: editdata.description,
                price: editdata.price
              }
            : interest
        )
      );
    }
  }, [editdata]);
  useEffect(() => {
    if (editsubdata?._id && editsubdata?.sub_interest) {
      setInterests((prevInterests) => {
        return prevInterests.map((interest) => {
          if (interest._id === editsubdata.interest_id) {
            const updatedSubInterestData = interest.category_name.map((subInterest) =>
              subInterest._id === editsubdata._id ? { ...subInterest, sub_interest: editsubdata.sub_interest } : subInterest
            );

            return {
              ...interest,
              category_name: updatedSubInterestData
            };
          }
          return interest;
        });
      });
    }
  }, [editsubdata]);

  const handleCancel = () => {
    // setOpen(false);
    setOpenADD(false);
    setOpen1(false);

    setopenedit(false);
    setInputimg(null);
    setInput({ price: '0', dec: '', imgs: '', categoryname: '' });
  };
  useEffect(() => {
    const data = localStorage.getItem('categories');
    setInterests(JSON.parse(data));
    dispatch(intersets_data());
  }, []);

  const [Inputimg, setInputimg] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    if (file.name) {
      const reader = new FileReader();
      reader.onload = () => {
        setInput({ ...input, imgs: file });
        setInputimg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const pic = useRef();

  const clickpic = () => {
    pic.current.click();
  };
  const handleModal = () => {
    console.log(input);
    const inputValues = Object.values(input);
    if (inputValues.every((value) => value)) {
      const inputData = { ...input };
      dispatch(addintersets_data(inputData));
      setOpenADD(false);
    } else {
      console.log('One or more input fields are empty or invalid');
      setOpenADD(true);
      // Optionally, set an error state here to display a message to the user
    }
    // dispatch(addintersets_data(input));
    // dispatch(editintersets_data(id, input));
    // setOpen(false);
    setInput({ price: '0', dec: '', imgs: '', categoryname: '' });
    setInputimg(null);
    setOpenADD(false);
  };
  const handleModaledit = (e) => {
    e.preventDefault();
    console.log(editid);
    dispatch(editintersets_data(editid, input));
    setInput({ price: '0', dec: '', imgs: '', categoryname: '' });
    setInputimg('');
    setopenedit(false);
    // setOpen(false);
  };

  const showModaledit = (item) => {
    setopenedit(true);
    console.log(item);
    setInput({ price: item.price, dec: item.description, imgs: item.category_image, categoryname: item.category_name });
    setInputimg(item.category_image);
    seteditid(item._id);
    console.log(item._id);
    // setSubintrestname(item.sub_interest);
    // seteditinterestid(item._id);
    // console.log(subintresetname, subeditinterestid);
  };
  const handleModal1 = (e) => {
    e.preventDefault();
    if (subintresetname.trim()) {
      // dispatch(addsubintersets_data(subintresetname, subaddinterestid));
      setSubintrestname('');
      setOpen1(false);
    }
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
      const interest = item?.category_name.toLowerCase().includes(searchTerm);

      return interest;
    });
    // console.log(searchData);
    setSearchItems(searchData);
    // console.log(searchItems);
    setSearchTerm(value);
  };
  console.log(interests);

  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }

  const handledelete = (itemId) => {
    dispatch(deeltefetchcategory(itemId));
    setInterests((prevInterests) => prevInterests.filter((item) => item._id !== itemId));
  };
  console.log('interests', interests, 'searchItems', searchItems);

  // console.log(blockedItems);
  // console.log(blockedItemsSub);
  const navigate = useNavigate();
  const handelclue = (id) => {
    navigate(`/app/category/clue/${id}`);
  };
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
            + Add Category
          </Button>
        </Col>
      </Row>
      <Row>
        {searchTerm && searchItems.length === 0 ? (
          <tr>
            <td colSpan="8">No Data...</td>
          </tr>
        ) : (
          (searchTerm ? searchItems : interests)?.map((item, index) => (
            <>
              <Col className="d-flex justify-space-between  flex-nowrap p-2 col-4" key={index} sm={3}>
                <Card
                  style={{ backgroundColor: 'black', color: 'white', width: '350px', border: '1px solid gray' }}
                  className="m-1 p-2  rounded"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={item?.category_image}
                        alt="profile pic"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        className="mx-2"
                        onError={(e) => (e.target.src = person)}
                      />
                      <div>
                        <div>{item?.category_name}</div>
                      </div>
                    </div>
                    <div>{item?.price > 0 && <span style={{ color: 'rgb(255, 183, 86)' }}>$ {item.price}</span>}</div>
                  </div>
                  <div style={{ color: 'rgb(186, 186, 186)', paddingLeft: '9px', margin: '2px' }}>{item.description}</div>

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
                      <button
                        onClick={() => {
                          handelclue(item._id);
                        }}
                        type="button"
                        className="px-2 ant-btn css-2q8sxy ant-btn-primary ant-btn-sm ant-btn-background-ghost d-flex align-items-center category-small-button"
                        style={{ borderColor: 'rgb(205, 50, 234)', color: 'rgb(205, 50, 234)' }}
                      >
                        <span role="img" aria-label="eye" className="anticon anticon-eye ">
                          <svg
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
                        <span className="mx-1"> View Clues</span>
                      </button>
                    </span>
                    <span className="p-2">
                      {' '}
                      <button
                        className="btn-outline-primary border border-primary px-2"
                        onClick={() => {
                          showModaledit(item);
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
            </>
          ))
        )}
      </Row>
      {/* <Modal open={openedit} title="Edit Sub-Interest" onCancel={handleCancel} footer={null} style={{ backgroundColor: 'black' }}>
        <Row>
          <Col sm={8}>
            <Input
              placeholder="Edit Sub-Interest"
              value={subintresetname}
              required
              name="subintresetname"
              onChange={(e) => setSubintrestname(e.target.value)}
            />
          </Col>
          <Col sm={3}>
            <Button
              className="border-0 p-1 theme-bg"
              // style={{ backgroundColor: 'grey' }}
              onClick={(e) => {
                handelmodelsubedit(e);
              }}
            >
              + Edit
            </Button>
          </Col>
        </Row>
      </Modal> */}
      <Modal title="Edit Interest" open={openedit} onCancel={handleCancel} footer={null}>
        <Row>
          <Col sm={3}>
            <Space>
              <div className="mb-1 px-2 col-12 edit">
                <div className="editprofile">
                  {Inputimg ? (
                    <img
                      src={Inputimg}
                      className="rounded-circle"
                      alt="User Avatar"
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        background: ' #3d3d3d'
                      }}
                      onError={(e) => (e.target.src = person)}
                    />
                  ) : (
                    <img src={camero} height={'50px'} alt="Default Avatar" />
                  )}
                </div>
                <div className="gim">
                  <input ref={pic} type="file" name="imgs" size="large" onChange={handleImageChange} style={{ display: 'none' }} />
                  <svg
                    onClick={clickpic}
                    className="gimg"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#A4A3A3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                      <path d="m9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2" />
                      <path d="m2 12.89v2.11c0 5 2 7 7 7h6c5 0 7-2 7-7v-5" />
                      <path d="m13 2h-4c-5 0-7 2-7 7" />
                      <path
                        d="m19.1409 2.58991-3.63 3.63c-.14.14-.28.41-.3.61l-.2 1.39c-.07.5.28.85.78.78l1.39-.2c.19-.03.47-.16.61-.3l3.63-3.63c.63-.63.92-1.35 0-2.27-.93-.94-1.65-.64-2.28-.01z"
                        strokeMiterlimit="10"
                      />
                      <path d="m18.6191 3.11011c.31 1.1 1.17 1.96 2.27 2.27" strokeMiterlimit="10" />
                      <path d="m2.66992 18.9501 4.93-3.31c.79-.53 1.93-.47 2.63998.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0l1.63 1.4" />
                    </g>
                  </svg>
                </div>
              </div>
            </Space>
          </Col>
          <Col sm={8}>
            <div className="d-flex">
              <Col sm={8}>
                <Input
                  placeholder="Category Name"
                  value={input.categoryname}
                  required
                  name="categoryname"
                  className="custom-placeholder"
                  onChange={(e) => setInput({ ...input, categoryname: e.target.value })}
                />
              </Col>
              <Col sm={1}></Col>
              <Col sm={3}>
                <Input
                  placeholder="Price"
                  max="10000"
                  name="price"
                  type="number"
                  value={input.price}
                  className="custom-placeholder"
                  onChange={(e) => setInput({ ...input, price: e.target.value })}
                ></Input>
              </Col>
            </div>
            <Col sm={12} className="mt-2">
              <Input
                placeholder="Description"
                required
                name="dec"
                value={input.dec}
                className="custom-placeholder"
                onChange={(e) => setInput({ ...input, dec: e.target.value })}
              />
            </Col>
            <Col sm={12} className="d-flex justify-content-end">
              {input.categoryname !== '' && input.dec !== '' && input.imgs !== '' && input.price !== '' ? (
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
                >
                  + Edit
                </Button>
              )}
            </Col>
          </Col>
        </Row>
      </Modal>{' '}
      <Modal title="Add Interest" open={openadd} onCancel={handleCancel} footer={null}>
        <Row>
          <Col sm={3}>
            <Space>
              <div className="mb-1 px-2 col-12 edit">
                <div className="editprofile">
                  {Inputimg ? (
                    <img
                      src={Inputimg}
                      className="rounded-circle"
                      alt="User Avatar"
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        background: ' #3d3d3d'
                      }}
                    />
                  ) : (
                    <img src={camero} height={'50px'} alt="Default Avatar" />
                  )}
                </div>
                <div className="gim">
                  <input ref={pic} type="file" name="imgs" size="large" onChange={handleImageChange} style={{ display: 'none' }} />
                  <svg
                    onClick={clickpic}
                    className="gimg"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#A4A3A3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                      <path d="m9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2" />
                      <path d="m2 12.89v2.11c0 5 2 7 7 7h6c5 0 7-2 7-7v-5" />
                      <path d="m13 2h-4c-5 0-7 2-7 7" />
                      <path
                        d="m19.1409 2.58991-3.63 3.63c-.14.14-.28.41-.3.61l-.2 1.39c-.07.5.28.85.78.78l1.39-.2c.19-.03.47-.16.61-.3l3.63-3.63c.63-.63.92-1.35 0-2.27-.93-.94-1.65-.64-2.28-.01z"
                        strokeMiterlimit="10"
                      />
                      <path d="m18.6191 3.11011c.31 1.1 1.17 1.96 2.27 2.27" strokeMiterlimit="10" />
                      <path d="m2.66992 18.9501 4.93-3.31c.79-.53 1.93-.47 2.63998.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0l1.63 1.4" />
                    </g>
                  </svg>
                </div>
              </div>
            </Space>
          </Col>
          <Col sm={8}>
            <div className="d-flex">
              <Col sm={8}>
                <Input
                  placeholder="Category Name"
                  value={input.categoryname}
                  required
                  name="categoryname"
                  className="custom-placeholder"
                  onChange={(e) => setInput({ ...input, categoryname: e.target.value })}
                />
              </Col>
              <Col sm={1}></Col>
              <Col sm={3}>
                <Input
                  placeholder="Price"
                  max="10000"
                  name="price"
                  type="number"
                  value={input.price}
                  className="custom-placeholder"
                  onChange={(e) => setInput({ ...input, price: e.target.value })}
                ></Input>
              </Col>
            </div>
            <Col sm={12} className="mt-2">
              <Input
                placeholder="Description"
                required
                name="dec"
                value={input.dec}
                className="custom-placeholder"
                onChange={(e) => setInput({ ...input, dec: e.target.value })}
              />
            </Col>
            <Col sm={12} className="d-flex justify-content-end">
              {input.categoryname !== '' && input.dec !== '' && input.imgs !== '' && input.price !== '' ? (
                <Button className="border-0 p-1 mt-2 theme-bg" onClick={handleModal}>
                  + Add
                </Button>
              ) : (
                <Button className="border-0 p-1 mt-2 " style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleModal} disabled>
                  + Add
                </Button>
              )}
            </Col>
          </Col>
        </Row>
      </Modal>
      <Modal open={open1} title="Add Sub-Interest" onCancel={handleCancel} footer={null}>
        <Row style={{ width: '500px' }}>
          <Col sm={8}>
            <Input
              placeholder="Sub-Interest Name"
              value={subintresetname}
              required
              name="subintresetname"
              onChange={(e) => setSubintrestname(e.target.value)}
            />
          </Col>
          <Col sm={3}>
            <Button className="border-0 p-1 theme-bg" onClick={handleModal1}>
              + Add
            </Button>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
};

export default BasicButton;
