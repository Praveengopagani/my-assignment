import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './App.css';

const App = () => {
  const [asteroid, setAsteroid] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [displayData, setDisplayData] = useState(false)
  const [displayTableData, setDisplayTableData] = useState(false)
  let history = useHistory();

  const handleChange = (e) => {
    setAsteroid(e.target.value)
  }

  useEffect(() => {
    if(asteroid === '') {
      setSubmitDisabled(true)
    }else{
      setSubmitDisabled(false)
    }
  }, [asteroid])

  const handleSubmit = async (ID) => {

    history.push(`/display-screen/${ID}`);

    // await axios.get('https://api.nasa.gov/neo/rest/v1/neo/' + ID + '?api_key=fogLThmuSGxaIYGFgK6rZj3fzKL14MqVfeaspHmX')
    //   .then(function (response) {
    //     if(response.status === 200){
    //       console.log(response)
    //       setAsteroid('')
    //       setDisplayData(response.data)
    //     }else{
    //       setDisplayData(false)
    //       console.log('Error')
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //     setDisplayData(false)
    //   });
  }
  

  const handleRandomSubmit = async () => {
    await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=fogLThmuSGxaIYGFgK6rZj3fzKL14MqVfeaspHmX')
      .then(function (response) {
        if(response.status === 200){
          console.log(response)
          setAsteroid('')
          setDisplayTableData(response.data.near_earth_objects)
        }else{
          setDisplayTableData(false)
          console.log('Error')
        }
      })
      .catch(function (error) {
        console.log(error)
        setDisplayTableData(false)
      });
  }

  return (
    
    <div className="container">
      <Row>
        <Col lg={6}>
          <div className="App">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Asteroid ID</Label>
                <Input 
                  type="text" 
                  name="asteroid" 
                  id="asteroid" 
                  placeholder="Enter Asteroid ID"
                  onChange={handleChange} 
                  value={asteroid}
                />
              </FormGroup>
              <Button onClick={() => handleSubmit(asteroid)} color="primary" disabled={submitDisabled}>Submit</Button>{' '}
              <Button onClick={handleRandomSubmit} color="secondary">Random Asteroid</Button>
          </Form>
          </div>
        </Col>
        <Col lg={6}>
          <div className="App">
            {displayData &&
            <ListGroup>
              <ListGroupItem>{displayData.name}</ListGroupItem>
              <ListGroupItem>{displayData.nasa_jpl_url}</ListGroupItem>
              <ListGroupItem>{displayData.is_potentially_hazardous_asteroid? 'TRUE': 'FALSE'}</ListGroupItem>
            </ListGroup> }
          </div>
        </Col>
        {displayTableData && displayTableData.length > 0 &&
        <Col lg={12}>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>NASA JPL URL</th>
                <th>IS HAZARDOUS ASTEROID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayTableData.map((item, i) => 
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.nasa_jpl_url}</td>
                  <td>{item.is_potentially_hazardous_asteroid? 'TRUE': 'FALSE'}</td>
                  <td><Button onClick={() => handleSubmit(item.id)} >Select</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col> }
      </Row>
      
    </div>
  );
}

export default App;
