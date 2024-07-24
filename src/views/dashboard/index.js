import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector } from '../../store';
import { dashboard_data } from '../../services/action/dashbord';
import { useDispatch } from 'react-redux';

const DashDefault = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dash?.data);
  const [dashdata, setdashdata] = useState(data || []);
  console.log(data);
  const [Cuurentpage] = useState(1);
  const itemperpage = 2;
  const [totalpage, settotalpage] = useState(1);

  useEffect(() => {
    // const data = localStorage.getItem('dashboard');
    if (data) {
      setdashdata(data);
    }
  }, [data]);
  useEffect(() => {
    const dataloacl = localStorage.getItem('dashboard');
    if (dataloacl) {
      console.log(JSON.parse(dataloacl));
      setdashdata(JSON.parse(dataloacl));
    }
  }, []);

  useEffect(() => {
    dispatch(
      dashboard_data(Cuurentpage, (to) => {
        settotalpage(to);
      })
    );
  }, [Cuurentpage, itemperpage]);
  console.log(totalpage);
  const keyname = {
    0: 'Total Users',
    1: 'Total Games',
    2: 'Total  Categories'
  };
  return (
    <React.Fragment>
      <Row>
        {dashdata && Object.values(dashdata).length > 0 ? (
          Object.values(dashdata).map((value, index) => (
            <Col key={index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h3 className="mb-4">{value}</h3>
                  <h6 className="mb-4">{keyname[index]}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No data available</p>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
