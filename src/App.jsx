import './App.css';
import Table from './components/Table'; 
import Form from  './components/Form'
import  { useState } from 'react';

function App() {
  const [submittedData, setSubmittedData] = useState([]); 

  const handleFormSubmit = (data) => {
    setSubmittedData([...submittedData, data]);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} /> 
      <Table data={submittedData} />
    </>
  );
}

export default App;
