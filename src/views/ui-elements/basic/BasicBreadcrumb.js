import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Table } from 'antd';
import '../../../index.css';
import { useDispatch, useSelector } from 'react-redux';
// import { deeltefetchuser, usreblock } from '../../../services/action/user';
import persone from '../../../assets/imags/person.png';
import Search from 'antd/es/transfer/search';
import { fetchtrascationData } from '../../../services/action/interst';

const BasicBreadcrumbPagination = () => {
  // const [serarch, setserch] = useState('');
  const userdata = useSelector((state) => state.tractionred?.data);
  console.log(userdata);
  const userblock = useSelector((state) => state.userblock?.data);
  const [userdatainfo, setuserdata] = useState(userdata || []);
  console.log(userdatainfo);
  console.log(userblock);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);
  // const [deleteid, setdeleteid] = useState();
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
  // console.log(totalPage);
  const dispatch = useDispatch();

  const deletedatainfo = useSelector((state) => state.userdeletered);
  console.log(deletedatainfo);
  useEffect(() => {
    const data = localStorage.getItem('userlist');
    if (data) {
      console.log(JSON.parse(data));
      setuserdata(JSON.parse(data));
    }
  }, []);
  // useEffect(() => {
  //   if (userdatainfo.length > 0) {
  //     localStorage.setItem('trasection', JSON.stringify(userdatainfo));
  //   }
  // }, [userdatainfo]);
  useEffect(() => {
    const data = localStorage.getItem('trasection');
    setuserdata(JSON.parse(data));
    dispatch(fetchtrascationData());
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  // console.log(interests);
  console.log(userdatainfo);

  const handelserch = (value) => {
    const searchTerm = value.toLowerCase().trim();

    const searchData = userdatainfo
      .filter((item) => {
        const id = item.payment_id?.toLowerCase().includes(searchTerm);
        const name = item.user_id?.name.toLowerCase().includes(searchTerm);
        return id || name;
      })
      .map((item) => ({
        key: item._id,
        payment_id: item.payment_id,
        userInfo: {
          name: item.user_id.name,
          profile_url: item.user_id.profile_url ? item.user_id.profile_url : item.user_id.profile_picture
        },
        // name: item.user_id.name,
        payment_status: item.payment_status,
        updatedAt: todayfun(item.updatedAt),

        amount: item.amount
      }));

    console.log(searchData);
    setSearchItems(searchData);
    setSearchTerm(value);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'payment_id',
      key: 'payment_id'
    },
    {
      title: 'UserName',
      dataIndex: 'userInfo',
      key: 'userInfo',
      render: (userInfo) => {
        const profileImageUrl = userInfo?.profile_url || userInfo?.profile_picture || persone;
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
      title: 'Status',
      dataIndex: 'payment_status',
      key: 'payment_status'
    },
    {
      title: 'Date/Time',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    }
  ];

  const data = searchTerm
    ? searchItems
    : userdatainfo?.map((item) => ({
        key: item._id,

        payment_id: item.payment_id,
        userInfo: {
          name: item.user_id.name,
          profile_url: item.user_id.profile_url ? item.user_id.profile_url : item.user_id.profile_picture
        },
        // name: item.user_id.name,
        payment_status: item.payment_status,
        updatedAt: todayfun(item.updatedAt),

        amount: item.amount
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
        <Col sm={12}>
          <div className="mt-4">
            <Table columns={columns} dataSource={data} />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicBreadcrumbPagination;
