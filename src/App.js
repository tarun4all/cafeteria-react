import React, { useState, useEffect } from 'react';
import { PageHeader, Tabs, Statistic, Descriptions, Icon, message, Button, Select, Modal, Form, Input} from 'antd';
import UserModal from './components/modal';
import 'antd/dist/antd.css';
import './App.css';

const { TabPane } = Tabs;

const renderContent = (user, column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
    <Descriptions.Item>
      <a>{user.designation}</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation Time">{user.created}</Descriptions.Item>
    <Descriptions.Item label="Remarks">
      Only for inhouse cafeteria
    </Descriptions.Item>
  </Descriptions>
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Status"
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={568.08} />
  </div>
);

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

const info = (msg) => {
  message.info(msg);
};

function App() {
  const [count, setCount] = useState(false);
  const [first, setFirst] = useState(false);
  const [user, setUser] = useState({});
  const [expense, setExpense] = useState({});
  const [error, setError] = useState('');
  const category = [{name: 'Aloo pratha', price: 25}, {name: 'Paneer pratha', price: 30}, {name: 'Anda pratha', price: 30}, {name: 'Aloo patty', price: 20}, {name: 'Paneer patty', price: 25}, {name: 'Tea', price: 10}];

  const firstTime = () => {
    setFirst(true);
  }

  const userCreated = () => {
    setFirst(false);
    updateDetails();
  }

  const updateDetails = () => {
    const userInfo = localStorage.getItem('user');
    const expense = localStorage.getItem('expense');
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    try {
      if(userInfo) {
        const user = JSON.parse(userInfo);
        const _date = new Date(user.created), day = _date.getDate(), month = _date.getMonth();
        console.log(day + '-', month);
        setUser({...user, created: `${day}-${monthNames[parseInt(month)]}`});
        setExpense(JSON.parse(expense));
      } else {
        firstTime();
      }
    } catch(err) {
      console.log(err);
      setError('Error occures');
    }
  }

  useEffect(() => {
    if(!count) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user'));

        if(userInfo) {
          updateDetails();
        } else {
          firstTime();
        }
        setCount(true);
      } catch(err) {
        console.log(err);
        firstTime();
        setError('Error occures');
      }
    }
  }, [])

  console.log(user);
  return (
    <div>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => window.history.back()}
        title="Daily Bites"
        subTitle="Don't hassle with empty stomach"
        backIcon={<Icon type="coffee" />}
        extra={[
          <Button key="1">Update profile</Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Details" key="1" />
            <TabPane tab="Rule" key="2" />
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent(user)}</Content>
      </PageHeader>
      {first ? <UserModal created = {userCreated}/> : ''}
      {error ? info(error) : ''}
    </div>
  );
}

export default App;
