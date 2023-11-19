import React,{ useState } from 'react'
import styles from './Home.module.css';
import LogCard from '../../Component/LogCard/LogCard';
import axios from 'axios';

const filterFields=['level','message','resource Id','timestamp',
'trace Id','span Id','commit','parent Resource Id'];

const FilterComponent=(props)=>{
  return (
    <div className={styles.filterDiv}>
      <div className={styles.fields}>
        {
          filterFields.map((field,index)=>(
            <input key={index} placeholder={field} type={field==='timestamp'?'date':'text'}
            onChange={(e)=>{props.onChange(field,e.target.value)}}/>
          ))
        }
      </div>
      <button onClick={props.submitFilter}>Filter</button>
    </div>
  )
}

const Home = () => {

  const [logs,setLogs]=useState([]);

  const [filters,setFilters]=useState({
    level:'',
    message:'',
    resourceId:'',
    timestamp:'',
    traceId:'',
    spanId:'',
    commit:'',
    parentResourceId:''
  });

  const handleChange=async (field,val)=>{
    setFilters({...filters,[field]:val});
  }
  const FetchData=async (req,res)=>{
    try{
      const response=await axios.post('http://localhost:3000/',filters);
      setLogs(response?.data?.data);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className={styles.home}>
      <FilterComponent onChange={handleChange} submitFilter={FetchData}/>
      <div className={styles.logsSection}>
        {
          logs.map((log,ind)=>(
            <LogCard index={0} key={ind} log={log} />
          ))
        }
      </div>
    </div>
  )
}

export default Home
