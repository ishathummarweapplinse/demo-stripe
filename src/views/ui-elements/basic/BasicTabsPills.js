import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Input, Modal, Space, Table } from 'antd';
import '../../../index.css';
import { useDispatch, useSelector } from 'react-redux';
// import { deeltefetchuser } from '../../../services/action/user';
// import persone from '../../../assets/imags/person.png';
import { Popconfirm } from 'antd';
import { useParams } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import { addclue_data, deleteclue_data, editclue } from '../../../services/action/interst';
import { Spin } from 'antd';
const contentStyle = {
  padding: 50,
  backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
  borderRadius: 4
};
const content = <div style={contentStyle} />;
const BasicTabsPills = () => {
  const [currentPage] = useState(1);
  const itemsPerPage = 10;
  const [openadd, setOpenADD] = useState(false);
  const showModaladd = () => {
    setOpenADD(true);
  };
  const [editid, seteditid] = useState();
  const { id } = useParams();
  console.log(id);
  const [input, setInput] = useState({ cluename: '' });
  // const [serarch, setserch] = useState('');
  const userdata = useSelector((state) => state.cluereducer?.data);
  const userdataloding = useSelector((state) => state.cluereducer?.loading);
  console.log(userdataloding);
  console.log(userdata);
  const addclue = useSelector((state) => state.clueaddred?.data);
  const [userdatainfo, setuserdata] = useState(userdata || []);
  console.log(userdatainfo);
  const editdata = useSelector((state) => state.clueeditred?.data);
  console.log(editdata);
  const [totalPage, setTotalPage] = useState(1);
  const [deleteid, setdeleteid] = useState();
  const [openedit, setopenedit] = useState(false);
  console.log(totalPage);
  const dispatch = useDispatch();
  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }

  const deletedatainfo = useSelector((state) => state.cluedeletered);
  console.log(deletedatainfo);
  useEffect(() => {
    dispatch(
      fetchClueData(currentPage, itemsPerPage, id, (total) => {
        setTotalPage(total);
      })
    );
  }, [currentPage, itemsPerPage]);
  console.log(deleteid);
  const handleDelete = (deletedata) => {
    console.log(deletedata);
    setdeleteid(deletedata);
    dispatch(deleteclue_data(deletedata));
  };

  useEffect(() => {
    if (editdata && editdata._id) {
      setuserdata((prevInterests) =>
        prevInterests.map((interest) =>
          interest._id === editdata._id
            ? {
                ...interest,
                clue_name: editdata.clue_name
              }
            : interest
        )
      );
    }
  }, [editdata]);
  useEffect(() => {
    if (deletedatainfo.data.success) {
      setuserdata((item) => item.filter((item) => item._id !== deleteid));
    }
  }, [deletedatainfo, deleteid]);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);
  const showModaledit = (item) => {
    setopenedit(true);
    console.log(item);
    setInput({ cluename: item.clue_name });

    seteditid(item.key);
    console.log(item._id);
    // setSubintrestname(item.sub_interest);
    // seteditinterestid(item._id);
    // console.log(subintresetname, subeditinterestid);
  };
  // const navigate = useNavigate();
  // const handelshowprofile = (id) => {
  //   console.log(id);
  //   navigate();
  // };
  const handleModaledit = (e) => {
    e.preventDefault();
    console.log(editid);
    dispatch(editclue(editid, id, input.cluename));
    setInput({ cluename: '' });
    setopenedit(false);
  };
  const columns = [
    {
      title: 'Clues Name',
      dataIndex: 'clue_name',
      key: 'clue_name'
    },

    {
      title: 'Action',
      dataIndex: 'actions',
      className: 'd-flex justify-content-center',
      width: '10.33%',
      key: 'actions',
      render: (_, record) => {
        console.log(record);
        return (
          <Space size="middle d-flex justify-content-center">
            <a>
              <div
                className="me-2 action-button bg-transparent"
                // style={{ border: ' 1px solid rgb(22, 119, 255)', color: 'rgb(22, 119, 255)' }}
              >
                <span className="p-2">
                  {' '}
                  <button
                    className="btn-outline-primary border border-primary px-2"
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
                {/* <span role="img" aria-label="eye" className="anticon anticon-eye px-1">
                  <svg
                    onClick={() => {
                      showModaledit(record);
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
                </span> */}
              </div>
            </a>

            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => {
                handleDelete(record.key);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button
                className="action-button bg-transparent px-1"
                style={{ border: '1px solid rgb(255, 77, 79)', color: 'rgb(255, 77, 79)' }}
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
          </Space>
        );
      }
    }
  ];
  // const [blockedItems, setBlockedItems] = useState({});
  //
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  // console.log(interests);
  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase().trim();

    const searchData = userdatainfo.filter((item) => {
      const interest = item.clue_name.toLowerCase().includes(searchTerm);

      return interest;
    });
    // console.log(searchData);
    setSearchItems(searchData);
    // console.log(searchItems);
    setSearchTerm(value);
  };
  useEffect(() => {
    if (addclue) {
      setuserdata((prevInterests) => [
        ...prevInterests,
        {
          _id: addclue._id,
          clue_name: addclue.clue_name
        }
      ]);
    }
  }, [addclue]);
  const data = searchTerm
    ? searchItems
    : userdatainfo.map((item) => ({
        key: item._id,
        clue_name: item.clue_name,

        actions: item
      }));
  console.log(userdatainfo);

  const handleModal = () => {
    console.log(input);
    dispatch(addclue_data(input.cluename, id));
    // dispatch(editintersets_data(id, input));
    // setOpen(false);
    setInput({ cluename: '' });

    setOpenADD(false);
  };
  const handleCancel = () => {
    // setOpen(false);
    setInput({ cluename: '' });
    setOpenADD(false);
    setInput({ cluename: '' });
    setopenedit(false);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={8}>
          {' '}
          <Search
            placeholder="input search text"
            // size="large"
            className="ms-1 mb-4 "
            allowClear
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            style={{ width: '100%', backgroundColor: 'black' }}
          />
        </Col>
        <Col className=" d-flex  justify-content-end p-0 mb-4   " sm={4}>
          <Button className="theme-bg" onClick={showModaladd}>
            + Add Category
          </Button>
        </Col>
        <Col sm={12}>
          <div className="mt-4">
            {userdataloding ? (
              <Spin tip="Loading" size="large" style={{ backgroundColor: 'black' }}>
                {content}
              </Spin>
            ) : (
              <Table columns={columns} dataSource={data} />
            )}
          </div>
        </Col>
        <Modal title="Add Clue" open={openadd} onCancel={handleCancel} footer={null}>
          <Row>
            <Col sm={12}>
              <div className="d-flex">
                <Col sm={12}>
                  <Input
                    placeholder="Clue Name"
                    value={input.cluename}
                    required
                    name="cluename"
                    className="custom-placeholder"
                    onChange={(e) => setInput({ ...input, cluename: e.target.value })}
                  />
                </Col>
              </div>

              <Col sm={12} className=" justify-content-end">
                {input.cluename !== '' ? (
                  <Button className="border-0 p-1 mt-2 w-100 theme-bg" onClick={handleModal}>
                    + Add
                  </Button>
                ) : (
                  <Button
                    className="border-0 p-1 mt-2 w-100 "
                    disabled
                    style={{ backgroundColor: 'gray', color: 'white' }}
                    onClick={handleModal}
                  >
                    + Add
                  </Button>
                )}
              </Col>
            </Col>
          </Row>
        </Modal>
        <Modal title="Edit clue" open={openedit} onCancel={handleCancel} footer={null}>
          <Row>
            <Col sm={12}>
              <div className="d-flex">
                <Col sm={12}>
                  <Input
                    placeholder="clue Name"
                    value={input.cluename}
                    required
                    name="cluename"
                    className="custom-placeholder"
                    onChange={(e) => setInput({ ...input, cluename: e.target.value })}
                  />
                </Col>
              </div>

              <Col sm={12} className=" justify-content-end">
                {input.cluename !== '' ? (
                  <Button
                    className="border-0 p-1 mt-2 theme-bg w-100"
                    onClick={(e) => {
                      handleModaledit(e, editid);
                    }}
                  >
                    + Edit
                  </Button>
                ) : (
                  <Button
                    className="border-0 p-1 mt-2  w-100 "
                    onClick={(e) => {
                      handleModaledit(e, editid);
                    }}
                    disabled
                    style={{ backgroundColor: 'gray', color: 'white' }}
                  >
                    + Edit
                  </Button>
                )}
              </Col>
            </Col>
          </Row>
        </Modal>{' '}
      </Row>
    </React.Fragment>
  );
};

export default BasicTabsPills;
