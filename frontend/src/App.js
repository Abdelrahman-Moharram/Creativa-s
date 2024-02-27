import React, {useState} from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'
import DefaultForm from './Components/Forms/DefaultForm';
import BaseChart from './Components/Charts/BaseChart';



function App() {
  const [data, setData] = useState(null)
  
  
  const handleData = (d) => {
      console.log("d", d);
      setData(d)
  }
  return (
    <Container className='my-5'>
      <DefaultForm handleData={handleData} />
      {
        data?
          <BaseChart modelData={data} />
        :null
      }
      
    </Container>
  );
}

export default App;
