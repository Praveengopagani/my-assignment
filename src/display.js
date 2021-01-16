import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Display = (props) => {
  const [displayData, setDisplayData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  
  useEffect(() => {
    axios.get('https://api.nasa.gov/neo/rest/v1/neo/' + props.match.params.id + '?api_key=fogLThmuSGxaIYGFgK6rZj3fzKL14MqVfeaspHmX')
    .then(function (response) {
      if(response.status === 200){
        console.log(response)
        setDisplayData(response.data)
        setIsLoading(false)
      }else{
        setDisplayData(false)
        console.log('Error')
      }
    })
    .catch(function (error) {
      console.log(error)
      setDisplayData(false)
    });
  }, [])

  return (
    
    <div className="container">
      <Row>
        <Col lg={10}>
            <div className="display-screen">
                {isLoading ? 'Loading...': 
                <>
                    { displayData &&
                    <ListGroup>
                        <ListGroupItem><b>Name</b> : {displayData.name}</ListGroupItem>
                        <ListGroupItem><b>NASA JPL URL</b> : {displayData.nasa_jpl_url}</ListGroupItem>
                        <ListGroupItem><b>IS HAZARDOUS ASTEROID</b> : {displayData.is_potentially_hazardous_asteroid? 'TRUE': 'FALSE'}</ListGroupItem>
                    </ListGroup> }
                    <Button onClick={() => props.history.goBack()}>Go Back</Button>
                </>
                }
            </div>
        </Col>
      </Row>
      
    </div>
  );
}

export default Display;
