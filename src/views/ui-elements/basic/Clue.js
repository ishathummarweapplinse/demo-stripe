import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Space, Table } from 'antd';
import '../../../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { deeltefetchuser, usreblock } from '../../../services/action/user';
import persone from '../../../assets/imags/person.png';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import { fetchClueData } from '../../../services/action/interst';

const Clue = () => {
  const [currentPage] = useState(1);
  const itemsPerPage = 10;
  // const [serarch, setserch] = useState('');
  const userdata = useSelector((state) => state.userreducer?.data);
  console.log(userdata);
  const userblock = useSelector((state) => state.userblock?.data);
  const [userdatainfo, setuserdata] = useState(userdata || []);
  console.log(userdatainfo);
  console.log(userblock);
  const [totalPage, setTotalPage] = useState(1);
  const [deleteid, setdeleteid] = useState();
  const todayfun = (messageTime) => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(messageTime);
    const monthname = month[date.getMonth()];
    const day = weekday[date.getDay()];
    const year = date.getFullYear();
    const todayDay = date.getDate();

    return `${day} ${monthname} ${todayDay} ${year}`;
  };
  console.log(totalPage);
  const dispatch = useDispatch();
  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }
  const deletedatainfo = useSelector((state) => state.userdeletered);
  console.log(deletedatainfo);
  useEffect(() => {
    dispatch(
      fetchClueData(currentPage, itemsPerPage, (total) => {
        setTotalPage(total);
      })
    );
  }, [currentPage, itemsPerPage]);
  console.log(deleteid);
  const handleDelete = (deletedata) => {
    console.log(deletedata);
    setdeleteid(deletedata);
    dispatch(deeltefetchuser(deletedata));
  };
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

  // const navigate = useNavigate();
  // const handelshowprofile = (id) => {
  //   console.log(id);
  //   navigate();
  // };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userInfo',
      key: 'userInfo',
      render: (userInfo) => {
        const profileImageUrl = userInfo?.profile_picture ? userInfo?.profile_picture : userInfo?.profile_url;
        return (
          <div>
            <span>
              <img
                src={profileImageUrl}
                alt={userInfo?.name || 'default'}
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                className="mx-2"
                onError={(e) => (e.target.src = persone)}
              />
            </span>
            <span>{userInfo.name}</span>
          </div>
        );
      }
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio'
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email_address'
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDate',
      key: 'birthDate'
    },

    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        console.log(record);
        return (
          <Space size="middle">
            <a>
              <Link to={`/app/User/profile/${record.key}`}>
                <div
                  className="me-2 action-button bg-transparent"
                  style={{ border: ' 1px solid rgb(22, 119, 255)', color: 'rgb(22, 119, 255)' }}
                >
                  <span role="img" aria-label="eye" className="anticon anticon-eye px-1">
                    <svg
                      // onClick={() => {
                      //   handelshowprofile(record.key);
                      // }}
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
              </Link>
            </a>
            <a>
              <Popconfirm
                title="Are you sure to block user or unblock?"
                onConfirm={() => {
                  handleblock(record.key);
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <div
                  className="me-2  bg-transparent"
                  style={{
                    border:
                      record.actions.is_block === true
                        ? '1px solid rgb(3, 252, 36)' // Green border when either condition is true
                        : '1px solid rgb(255, 134, 0)' // Orange border otherwise
                  }}
                >
                  <span role="img" aria-label="stop" className="anticon anticon-stop px-1">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="stop"
                      width="1em"
                      fill={record.actions.is_block === true ? 'rgb(3, 252, 36)' : 'rgb(255, 134, 0)'}
                      // style={{ border: blockedItems[record.key] ? '1px solid rgb(3, 252, 36)' : '1px solid rgb(255, 134, 0)' }}
                      height="1em"
                      aria-hidden="true"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"></path>
                    </svg>
                  </span>
                </div>
              </Popconfirm>
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
  const handleblock = (itemId) => {
    dispatch(usreblock(itemId));
    setuserdata(
      userdatainfo.map((item) => {
        if (item._id === itemId) {
          return { ...item, is_block: !item.is_block };
        }
        return item;
      })
    );
  };
  const data = userdatainfo.map((item) => ({
    key: item._id,
    userInfo: {
      name: item.name,
      profile_url: item.profile_url ? item.profile_url : item.profile_picture
    },
    bio: item.bio,
    email: item.email_address,
    birthDate: todayfun(item.dob),

    actions: item
  }));
  console.log(userdatainfo);
  const handelserch = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase().trim();
    const filteredData = userdatainfo.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm);
    });

    setuserdata(filteredData);
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
              handelserch(e.target.value);
            }}
            style={{ width: '100%', backgroundColor: 'black' }}
          />
        </Col>
        <Col sm={12}>
          <div className="mt-4">
            <Table columns={columns} dataSource={data} />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Clue;
