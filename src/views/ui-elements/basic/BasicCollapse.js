import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deeltefetchuser, fetchgameData, usreblock, usredata, usregrpdata } from '../../../services/action/user';
import { Modal, Tabs } from 'antd';
import persone from '../../../assets/imags/person.png';
// import { Modal } from 'antd';
import { Empty } from 'antd';
import { Popconfirm } from 'antd';
// import { baseurl1 } from '../../../apiurl';
import { Card } from 'antd';
// import moment from 'moment/moment';
// import imgpic from '../../../assets/imags/imgpic.jpg';
import Moment from 'react-moment';
// import BasicBadges from './BasicBadges';
import { Spin } from 'antd';
const contentStyle = {
  padding: 50,
  backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
  borderRadius: 4
};
const content = <div style={contentStyle} />;
const BasicCollapse = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [userblockid, setblockid] = useState({});
  // const [verifyinfo, setVerifyinfo] = useState();
  // const userblock = useSelector((state) => state.userblock?.data);
  // console.log(userblock);

  const [open1, setOpen1] = useState(false);
  const [selectedGame, setSelectedGame] = useState([]);
  const showModal = (game) => {
    console.log(game);
    setSelectedGame(Array.isArray(game) ? game : [game]);
    setOpen1(true);
  };

  // console.log(selectedGame.leaderboard_data.user_id.name);
  const handleCancel = () => {
    setOpen1(false);
  };
  // console.log(selectedGame && selectedGame.map((item) => item.leaderboard_data.user));
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const dispatch = useDispatch();
  const userdatared = useSelector((state) => state.userreducer.data);
  const userdata = useSelector((state) => state.userdatared?.data);
  const userdataloading = useSelector((state) => state.userdatared?.loading);
  const { id } = useParams();
  console.log(id);
  const grpdatalist = useSelector((state) => state.usergrplistdata?.data);
  const adminlist = useSelector((state) => state.adminConnectionListReducer?.data);
  console.log(adminlist);
  console.log(selectedGame);
  console.log(userdata);
  // console.log(grpdatalist);
  // console.log(userdata);
  useEffect(() => {
    dispatch(usredata(id));
    dispatch(usregrpdata(id));
    dispatch(fetchgameData(id));
  }, [id]);

  const handelblock = (id) => {
    if (!userblockid[id]) {
      dispatch(usreblock(id));
      setblockid((prevState) => ({
        ...prevState,
        [id]: true
      }));
    } else {
      dispatch(usreblock(id));
      setblockid((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    }
  };
  const naviagte = useNavigate();
  const [deleteid, setdeleteid] = useState();
  console.log(userdatared);
  useEffect(() => {
    if (deleteid) {
      userdatared.filter((user) => user._id !== deleteid);
      naviagte('/app/user/default');
    }
  }, [deleteid]);
  const handleDelete = (deletedata) => {
    // console.log(deletedata);
    setdeleteid(deletedata);

    dispatch(deeltefetchuser(deletedata));
  };
  const navigate = useNavigate();

  const handelviewf = (id) => {
    console.log(id);
    navigate(`/app/User/profile/${id}`);
    dispatch(usredata(id));
    dispatch(usregrpdata(id));
    // dispatch(fetchAdminConnectionData(id));
  };
  return (
    <React.Fragment>
      <div className="Conatiner d-grid gap-3 ">
        {userdataloading ? (
          <Spin tip="Loading" size="large" style={{ backgroundColor: 'black' }}>
            {content}
          </Spin>
        ) : (
          <>
            <Row>
              <Col sm={6}>
                <div className="text-center profilec-1 ">
                  <div className="d-flex justify-content-center">
                    <div className="text-center">
                      <img
                        src={
                          userdata?.profile_url ? userdata?.profile_url : userdata?.profile_picture ? userdata?.profile_picture : persone
                        }
                        alt="profile pic"
                        style={{ width: '90px', height: '90px', borderRadius: '50%' }}
                        className="mt-5 mb-3"
                        onError={(e) => (e.target.src = persone)}
                      />
                    </div>
                  </div>
                  <h3>{userdata.name}</h3>
                  <label>Email:</label>
                  <span>{userdata.email_address}</span>
                  {/* <div>
                <label>Birth Date:</label>
                <span>{todayfun(userdata.dob)}</span>
              </div> */}
                  {/* <div>
                <label>Name Of Follower:</label>
                <span>{userdata.name_of_followers}</span>
              </div> */}
                  <div className="d-flex flex-wrap mx-auto justify-content-center mt-3">
                    <div
                      className="me-2 action-button bg-dark d-flex justify-content-center align-items-center mb-4  m-1 p-1"
                      style={{
                        border:
                          userdata.is_block === true || userblockid[userdata._id]
                            ? '1px solid rgb(3, 252, 36)'
                            : '1px solid rgb(255, 134, 0)'
                      }}
                    >
                      <span role="img" aria-label="stop" className="anticon anticon-stop">
                        <Popconfirm
                          title="Are you sure to block user or unblock?"
                          onConfirm={() => {
                            handelblock(userdata._id);
                          }}
                        >
                          <svg
                            // onClick={() => {
                            //   handelblock(userdata._id);
                            // }}
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="stop"
                            width="1em"
                            height="1em"
                            fill={userdata.is_block === true || userblockid[userdata._id] ? 'rgb(3, 252, 36)' : 'rgb(255, 134, 0)'}
                            aria-hidden="true"
                          >
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z"></path>
                          </svg>
                        </Popconfirm>
                      </span>
                    </div>
                    <div
                      className="action-button bg-dark d-flex justify-content-center align-items-center me-2 mb-4  m-1 p-1"
                      style={{ border: '1px solid rgb(255, 77, 79)', color: 'rgb(255, 77, 79)' }}
                    >
                      <span role="img" aria-label="delete" className="anticon anticon-delete">
                        <Popconfirm
                          title="Are you sure delete this task?"
                          onConfirm={() => {
                            handleDelete(userdata._id);
                          }}
                        >
                          <svg
                            // onClick={() => {
                            //   handleDelete(userdata._id);
                            // }}
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
                        </Popconfirm>
                      </span>
                    </div>
                  </div>
                  {/* <div className="d-flex flex-wrap mx-auto justify-content-center mt-3">
                <div className="mx-3">
                  <div>{userdata.follower_count}</div>
                  <p>Followers</p>
                </div>
                <div className="mx-3">
                  <div>{userdata.following_count}</div>
                  <p>Followings</p>
                </div>
                <div className="mx-3">
                  <div>{userdata.post_count}</div>
                  <p>Post</p>
                </div>
                <div className="mx-3">
                  <div>{userdata.block_list_count}</div>
                  <p>Blocked</p>
                </div>
                <div className="mx-3">
                  <div>{userdata.report_count}</div>
                  <p>Reports</p>
                </div>
              </div> */}
                </div>
              </Col>
              <Col sm={6}>
                <div className="text-center profilec-1 full-width-tabs">
                  <Tabs
                    style={{ textAlign: 'center' }}
                    className="d-flex"
                    defaultActiveKey="1"
                    items={[
                      {
                        label: 'Friends',
                        key: '1',
                        children: (
                          <div
                            style={{
                              width: '100%',
                              height: '368px',
                              overflowY: 'auto',
                              textAlign: 'center',
                              borderBottom: '1px solid rgb(62, 62, 62)'
                            }}
                          >
                            {grpdatalist.length > 0 ? (
                              grpdatalist.map((item, index) => (
                                <div key={index} style={{ borderBottom: '1px solid rgb(62, 62, 62)' }} className="p-0 d-flex">
                                  <Col sm={10}>
                                    <div className="d-flex justify-content-start align-items-center mt-2">
                                      <span>
                                        {item.friend_id.profile_picture || item.friend_id.profile_url ? (
                                          <img
                                            src={
                                              item.friend_id.profile_picture ? item.friend_id.profile_picture : item.friend_id.profile_url
                                            }
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '2px' }}
                                            className="mx-3"
                                            alt="profile"
                                          />
                                        ) : (
                                          <img
                                            src={persone}
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '2px' }}
                                            className="mx-3"
                                            alt="profile"
                                          />
                                        )}

                                        <span className="text-white">{item.friend_id.name}</span>
                                      </span>
                                    </div>
                                  </Col>
                                  <Col sm={2}>
                                    <button
                                      type="button"
                                      className="ant-btn css-2q8sxy ant-btn-primary ant-btn-sm ant-btn-background-ghost mt-3 mb-3 d-flex justify-content-center align-items-center px-3"
                                      onClick={() => {
                                        handelviewf(item?.friend_id._id);
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
                        )
                      }
                    ]}
                    tabBarStyle={{ color: 'white' }}
                    moreIcon={null}
                    size="large"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <div className="text-center profilec-2 full-width-tabs ">
                <Tabs
                  defaultActiveKey="1"
                  items={[
                    {
                      label: 'Created Games',
                      key: '1',
                      children: (
                        <div className="row">
                          {adminlist.length > 0 ? (
                            adminlist.map((item, index) => {
                              // const imageUrl = item.post_media && item.post_media.length > 0 && item.post_media[0].file_name; // Assuming only one media file per post

                              return (
                                <div className="col-md-3" key={index}>
                                  <Card
                                    style={{
                                      // width: 270,
                                      backgroundColor: 'black',
                                      color: 'white',
                                      border: 'none',
                                      marginBottom: '20px',
                                      height: 235,
                                      padding: '10px'
                                    }}
                                  >
                                    <h4 className="text-start p-0 mt-2">{item.game_name}</h4>
                                    <p style={{ color: 'gray', marginBottom: '0' }} className="text-start ">
                                      Players : <span style={{ color: 'white' }}>{item.players}</span>
                                    </p>
                                    <p style={{ color: 'gray', marginBottom: '0' }} className="text-start  ">
                                      Status : <span style={{ color: 'white' }}>{item.game_status}</span>
                                    </p>
                                    <p style={{ color: 'gray' }} className="text-start ">
                                      Rounds : <span style={{ color: 'white' }}>{item.rounds}</span>
                                    </p>

                                    <p style={{ color: 'rgb(152, 152, 152)', clear: 'both', float: 'right' }} className="text-start p-0">
                                      <Moment format="ddd MMM DD YYYY">{item.updatedAt}</Moment>
                                    </p>
                                    {/* <p>{moment().diff(moment(item.createdAt), 'days')} days</p> */}
                                    {/* <p>{moment(item.createdAt, 'YYYYMMDD').fromNow()}</p> */}

                                    <Button
                                      type="button"
                                      onClick={() => {
                                        showModal(item);
                                      }}
                                      className="ant-btn css-2q8sxy ant-btn-primary ant-btn-sm ant-btn-background-ghost d-flex align-items-center justify-content-center"
                                      style={{
                                        borderColor: ' rgb(205, 50, 234)',
                                        color: 'rgb(205, 50, 234)',
                                        width: '100%',
                                        height: '45px',
                                        fontSize: '15px'
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
                                      <span className="mx-1"> View Game Details</span>
                                    </Button>
                                  </Card>
                                </div>
                              );
                            })
                          ) : (
                            <Empty></Empty>
                          )}
                        </div>
                      )
                    }
                  ]}
                ></Tabs>
                <Modal open={open1} title="Game Details" onCancel={handleCancel} footer={null}>
                  {Array.isArray(selectedGame) && selectedGame.length > 0 ? (
                    selectedGame.map((item) => (
                      <div key={item._id}>
                        <h6>Created By</h6>
                        <div className="p-0 d-flex">
                          <Col sm={9}>
                            <div className="d-flex justify-content-start align-items-center mt-1">
                              <img
                                src={
                                  item.user_id?.profile_url
                                    ? item.user_id.profile_url
                                    : item.user_id?.profile_picture
                                    ? item.user_id.profile_picture
                                    : persone
                                }
                                alt="profile pic"
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                className="mt-3 mb-3"
                              />
                              <span className="text-white text-center mx-1"> {item.user_id?.name}</span>
                            </div>
                          </Col>
                          <Col sm={3}>
                            <button
                              type="button"
                              className="ant-btn css-2q8sxy ant-btn-primary ant-btn-sm ant-btn-background-ghost mt-4 mb-3 d-flex justify-content-center align-items-center px-3"
                              onClick={() => {
                                handelviewf(item?.user_id?._id);
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
                          {Array.isArray(item.leaderboard_data) && item.leaderboard_data.length > 0 ? (
                            item.leaderboard_data.map((player) => (
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
                                      handelviewf(player.user_id._id);
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
                                    <span> View</span>
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
              </div>
            </Row>
          </>
        )}
      </div>
      {/* <BasicBadges deleteid={deleteid}></BasicBadges> */}
    </React.Fragment>
  );
};

export default BasicCollapse;
