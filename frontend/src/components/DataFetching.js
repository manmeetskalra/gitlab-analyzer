/*
  TODO:
  1. need to be divide into different components for each page.
  2. add calculations
*/
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function DataFetching() {
  const [Projecs, setProjects] = useState([]);

  async function APIcalls(){

    try {
      await axios.post('http://localhost:8080/project/create?token=XQUSyUSDiQUxsy6CoP8_');
      await axios.post('http://localhost:8080/project/add?url=http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer');
      const res = await axios.get('http://localhost:8080/project/all');

      setProjects(res.data);   
      
      const commits = await axios.get(`http://localhost:8080/project/2/commits`);
      console.log(commits.data);
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    APIcalls();
  },[]);



  return (
    <div>
      {console.log(Projecs)}
    </div>
  )
}

export default DataFetching;