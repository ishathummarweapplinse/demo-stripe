import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button, Empty, Modal, Space, Table } from 'antd';
import '../../../index.css';
import persone from '../../../assets/imags/person.png';
import { useDispatch, useSelector } from 'react-redux';

import { Popconfirm } from 'antd';
import Search from 'antd/es/transfer/search';
import { useNavigate, useParams } from 'react-router-dom';
// import TextArea from 'antd/es/input/TextArea';
import { deletegamelist_data, fetchgamelist, usredata, usregrpdata } from '../../../services/action/user';
import Moment from 'react-moment';
// import { Spin } from 'antd';
// const contentStyle = {
//   padding: 50,
//   backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
//   borderRadius: 4
// };
// const content = <div style={contentStyle} />;
const BasicTypography = () => {
  const [open1, setOpen1] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const showModal = (game) => {
    console.log(game);
    setSelectedGame(Array.isArray(game) ? game : [game]);
    setOpen1(true);
  };
  // console.log(selectedGame.map((item) => item.user_id?.name));
  const { id } = useParams();
  const [selectedGameType, setSelectedGameType] = useState('private');
  // const [serarch, setserch] = useState('');
  const gameloading = useSelector((state) => state.gamelistred.loading);
  console.log(gameloading);
  const gamedatapublic = useSelector((state) => state.gamelistred?.datapublic);
  console.log(gamedatapublic);
  const gamedataprivate = useSelector((state) => state.gamelistred?.dataprivate);
  console.log(gamedataprivate);
  const useradddata = useSelector((state) => state.clueaddred.data);
  console.log(useradddata);
  const clueedit = useSelector((state) => state.clueeditred?.data);

  console.log(clueedit);
  useEffect(() => {
    const datapublic = localStorage.getItem('gamelistpublic');
    const dataprivate = localStorage.getItem('gamelistprivate');
    if (datapublic && selectedGameType === 'public') {
      console.log(JSON.parse(datapublic));
      setuserdata(JSON.parse(datapublic));
    }
    if (dataprivate && selectedGameType === 'private') {
      setuserdata(JSON.parse(dataprivate));
    }
  }, [selectedGameType]);

  const [userdatainfo, setuserdata] = useState([]);
  // const [totalPage, setTotalPage] = useState(1);
  const [deleteid, setdeleteid] = useState();
  // const [editid, seteditid] = useState();
  // console.log(totalPage);
  const dispatch = useDispatch();
  function cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }
  console.log(selectedGame);
  const handleGames = (type) => {
    setSelectedGameType(type);
  };
  const navigate = useNavigate();
  const handelviewf = (id) => {
    console.log(id);
    navigate(`/app/User/profile/${id}`);
    dispatch(usredata(id));
    dispatch(usregrpdata(id));
    // dispatch(fetchAdminConnectionData(id));
  };
  const deletedatainfo = useSelector((state) => state.gamedeletelistred);
  console.log(deletedatainfo);
  console.log(id, 'id');
  useEffect(() => {
    dispatch(fetchgamelist(selectedGameType));
  }, [id, selectedGameType]);
  // console.log('page', totalPage);
  console.log(deleteid);
  const handleDelete = (deletedata) => {
    console.log('clueid', deletedata);
    setdeleteid(deletedata);
    dispatch(deletegamelist_data(deletedata));
  };
  useEffect(() => {
    console.log(deleteid);
    if (deletedatainfo.data.success) {
      setuserdata((items) => items.filter((item) => item._id !== deleteid));
    }
  }, [deletedatainfo, deleteid]);

  // useEffect(() => {
  //   if (userdatainfo.length > 0 && selectedGameType === 'public') {
  //     localStorage.setItem('gamelistpublic', JSON.stringify(userdatainfo));
  //   }
  //   if (userdatainfo.length > 0 && selectedGameType === 'private') {
  //     localStorage.setItem('gamelistprivate', JSON.stringify(userdatainfo));
  //   }
  // }, [userdatainfo]);
  useEffect(() => {
    if (gamedatapublic && selectedGameType === 'public') {
      console.log(gamedatapublic);
      setuserdata(gamedatapublic);
    } else {
      console.log(gamedataprivate);
      setuserdata(gamedataprivate);
    }
  }, [gamedatapublic, gamedataprivate]);
  // useEffect(() => {
  //   if (useradddata) {
  //     setuserdata((prevData) => [...prevData, { _id: useradddata._id, clue_name: useradddata.clue_name }]);
  //   }
  // }, [useradddata]);

  const handleCancel = () => {
    setOpen1(false);
  };

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'game_name',
      key: 'game_name'
    },
    {
      title: 'Players',
      dataIndex: 'players',
      key: 'players'
    },

    {
      title: 'Rounds',
      dataIndex: 'rounds',
      key: 'rounds'
    },
    {
      title: 'Status',
      dataIndex: 'game_status',
      key: 'game_status'
    },
    {
      title: 'Create Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const handelserch = (value) => {
    const searchTerm = value.toLowerCase().trim();
    const filteredData = userdatainfo.filter((item) => {
      return item.game_name.toLowerCase().includes(searchTerm);
    });

    setSearchItems(filteredData);
    setSearchTerm(value);
  };
  const data = searchTerm
    ? searchItems
    : userdatainfo &&
      userdatainfo.length > 0 &&
      userdatainfo?.map((item) => ({
        key: item._id,
        game_name: item.game_name,
        players: item.players,
        rounds: item.rounds,
        game_status: item.game_status,
        updatedAt: todayfun(item.updatedAt),
        actions: item
      }));
  console.log(userdatainfo);

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
        <Col className="d-flex justify-content-end p-0 mb-4" sm={4}>
          <Button
            className={` mx-2 ${selectedGameType === 'private' ? 'active' : ''}`}
            onClick={() => handleGames('private')}
            style={{
              backgroundColor: selectedGameType === 'private' ? 'pink' : '#f0f0f0'
              // color: selectedGameType === 'private' ? 'white' : 'black'
            }}
          >
            Private Games
          </Button>
          <Button
            className={`${selectedGameType === 'public' ? 'active' : ''}`}
            onClick={() => handleGames('public')}
            style={{
              backgroundColor: selectedGameType === 'public' ? 'pink' : '#f0f0f0'
              // color: selectedGameType === 'public' ? 'white' : 'black'
            }}
          >
            Public Games
          </Button>
        </Col>
        <Col sm={12}>
          <div className="mt-4">
            <Table columns={columns} dataSource={data} />
          </div>
        </Col>
      </Row>
      {/* <Modal title="Edit Interest" open={openedit} onCancel={handleCancel} footer={null} style={{ backgroundColor: 'black' }}>
        <Row>
          <Col sm={12}>
            <div className="d-flex">
              <Col sm={12}>
                <TextArea
                  cols={20}
                  rows={5}
                  placeholder="Clue Name"
                  value={input.cluename}
                  required
                  name="caluename"
                  className="custom-placeholder textarea"
                  onChange={(e) => setInput({ ...input, cluename: e.target.value })}
                />
              </Col>
            </div>
            <Col sm={12} className="d-flex justify-content-center">
              <Button
                className="border-0 p-1 mt-2 theme-bg w-100"
                onClick={(e) => {
                  handleModaledit(e, editid);
                }}
              >
                confrim
              </Button>
            </Col>
          </Col>
        </Row>
      </Modal>{' '} */}
      <Modal open={open1} title="Game Details" onCancel={handleCancel} footer={null}>
        {Array.isArray(selectedGame) && selectedGame.length > 0 ? (
          selectedGame.map((item) => (
            <div key={item._id}>
              <h6>Created By</h6>
              <div className="p-0 d-flex">
                <Col sm={9}>
                  <div className="d-flex justify-content-start align-items-center mt-1 ">
                    <span>
                      <img
                        src={
                          item.actions.user_id?.profile_url
                            ? item.actions.user_id.profile_url
                            : item.actions.user_id?.profile_picture
                            ? item.actions.user_id.profile_picture
                            : persone
                        }
                        onError={(e) => (e.target.src = persone)}
                        alt="profile pic"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '2px' }}
                        className="mt-1 mb-3"
                      />
                      <span className="text-white mx-2"> {item.actions.user_id?.name}</span>
                    </span>
                  </div>
                </Col>
                <Col sm={3}>
                  <button
                    type="button"
                    className="ant-btn css-2q8sxy ant-btn-primary ant-btn-sm ant-btn-background-ghost mt-4 mb-3 d-flex justify-content-center align-items-center px-3"
                    onClick={() => {
                      handelviewf(item?.actions.user_id?._id);
                    }}
                  >
                    <span role="img" aria-label="eye" className="anticon anticon-eye">
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
                    <span className="mx-1"> View</span>
                  </button>
                </Col>
              </div>
              <p style={{ color: 'white' }}>Details</p>
              <div className="p-0 mb-2 px-0 d-flex ">
                <p className="m-0 col-lg-12" style={{ color: ' rgb(218, 218, 218)' }}>
                  Name <span style={{ color: 'gray', marginLeft: '100px' }}>{item.game_name}</span>
                </p>
              </div>
              <div className="p-0 mb-2 px-0 d-flex ">
                <p className="m-0 col-lg-12" style={{ color: ' rgb(218, 218, 218)' }}>
                  Players <span style={{ color: 'gray', marginLeft: '100px' }}>{item.players}</span>
                </p>
              </div>
              <div className="p-0 mb-2 px-0 d-flex ">
                <p className="m-0 col-lg-12" style={{ color: ' rgb(218, 218, 218)' }}>
                  Status <span style={{ color: 'gray', marginLeft: '100px' }}>{item.game_status}</span>
                </p>
              </div>
              <div className="p-0 mb-2 px-0 d-flex ">
                {' '}
                <p className="m-0 col-lg-12" style={{ color: ' rgb(218, 218, 218)' }}>
                  Rounds <span style={{ color: 'gray', marginLeft: '100px' }}>{item.rounds}</span>
                </p>
              </div>
              <div className="p-0 mb-2 px-0 d-flex ">
                <p className="m-0 col-lg-12" style={{ color: ' rgb(218, 218, 218)' }}>
                  Created Date{' '}
                  <span style={{ color: 'gray', marginLeft: '50px' }}>
                    <Moment format="ddd MMM DD YYYY">{item.updatedAt}</Moment>
                  </span>
                </p>
              </div>
              <div style={{ borderRadius: '10px' }}>
                <h6>Players</h6>
                {Array.isArray(item.actions.leaderboard_data) && item.actions.leaderboard_data.length > 0 ? (
                  item.actions.leaderboard_data.map((player) => (
                    <div
                      key={player._id}
                      className="p-0 d-flex"
                      style={{ borderBottom: '1px solid rgb(62, 62, 62)', backgroundColor: '#1b1b1b ' }}
                    >
                      <Col sm={9}>
                        <div className="d-flex justify-content-start align-items-center ">
                          <img
                            src={
                              player.user_id?.profile_url
                                ? player.user_id.profile_url
                                : player.user_id?.profile_picture
                                ? player.user_id.profile_picture
                                : persone
                            }
                            alt="profile pic"
                            style={{ width: '40px', height: '40px', borderRadius: '40%' }}
                            className="mt-3 mb-3  mx-2"
                          />
                          <div className="text-white">
                            <span className="p-0" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                              {player.user_id?.name}
                            </span>

                            <p style={{ margin: 0, color: 'gray' }}>Wining Count: {player.win_count}</p>
                          </div>
                        </div>
                      </Col>
                      <Col sm={3}>
                        <button
                          type="button"
                          className="ant-btn css-2q8sxy ant-btn-primary ant-btn-sm ant-btn-background-ghost mt-4 mb-3 d-flex justify-content-center align-items-center px-3"
                          onClick={() => {
                            handelviewf(player.user_id?._id);
                          }}
                        >
                          <span role="img" aria-label="eye" className="anticon anticon-eye">
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
                          <span className="mx-1"> View</span>
                        </button>
                      </Col>
                    </div>
                  ))
                ) : (
                  <Empty />
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </Modal>
    </React.Fragment>
  );
};

export default BasicTypography;
