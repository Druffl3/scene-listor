import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
const { Title,Text } = Typography;

const Header = () => {

    const [constants, setConstants] = useState([]);

    useEffect(()=>{
        getData()
      },[]);
    
      const getData=()=>{
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
    return(
        <Typography>
            <Title style={{ paddingTop:20 }} >{constants.TITLE}</Title>
            <Text>{constants.TAG_LINE} <b>{constants.LOCATION}</b></Text>
        </Typography>
    );
};

export default Header;