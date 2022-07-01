import { Avatar, List, Space, Input, Button, Image  } from 'antd';
import "antd/dist/antd.min.css"
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import EventModal from './EventModal';

const { Search } = Input;



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const modelData = {
  id: 0,
  href: '',
  title: '',
  avatar: '',
  description: '',
  content: '.',
  contact: '',
  email: ''
}

const Dashboard = () => {
  const [eventData, setEventData] = useState([]);
  const [masterEventData, setMasterEventData] = useState([]);
  const [constants, setConstants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(()=>{
    getData()
  },[]);

  const getData=()=>{
    getEvents();
    getConstants();
  }

  const getEvents = () => {
    fetch('data/eventData.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setMasterEventData(myJson);
        setEventData(myJson);
      });
  }

  const getConstants = () => {
    fetch('data/constants.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setConstants(myJson);
      });
  }

  const showModal = (item) => {
    modelData.id = item.id;
    modelData.href = item.href;
    modelData.avatar = item.avatar;
    modelData.title = item.title;
    modelData.description = item.description;
    modelData.content = item.content;
    modelData.contact = item.contact;
    modelData.email = item.email;
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value) => {
    if(value !== "")
    {
      const searchTerm = value.toLowerCase();
      const filterResult = masterEventData.filter(x => {
        return x.title.toLowerCase().includes(value.toLowerCase()) || x.description.toLowerCase().includes(searchTerm.toLowerCase())
        || x.content.toLowerCase().includes(searchTerm.toLowerCase())
      });
      console.log(filterResult);
      setEventData(filterResult);
    }
    else
    {
      console.log(masterEventData);
      setEventData(masterEventData);
    }
  }

  return(
    <div>
    <Search placeholder={constants.SEARCH_PLACE_HOLDER} onSearch={onSearch} enterButton style={{ width: 300, marginBottom:50 }}/>
    <List
    style={{ width: 800, marginLeft: 200, marginRight: 200 }}
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={eventData}
    footer={
      <div>
        {constants.FOOTER_1} , <b>{constants.FOOTER_2}</b>
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          <Button type="primary" onClick={(e) => showModal(item)}> 
            {constants.EVENT_DETAIL}
          </Button>
        ]}
        extra={
          <Image
            width={272}
            alt="logo"
            src={item.image}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  <EventModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} modalData={modelData}/>
  </div>
  );
}

export default Dashboard;