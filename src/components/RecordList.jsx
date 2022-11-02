import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";

const Record = ({record, deleteRecord}) => (
 <tr>
   <td>{record.fname}</td>
   <td>{record.mname}</td>
   <td>{record.lname}</td>
   <td>{record.position}</td>
   <td>{record.level}</td>
   <td>
    <Link className="btn btn-link" to={`/worklog/${record._id}`}>Add worklog</Link>|
     <Link className="btn btn-link" to={`/editrecord/${record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         deleteRecord(record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState('');
  const [recordsUrl, setRecordsUrl] = useState(`http://localhost:5000/records?`)
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(recordsUrl);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length, recordsUrl]);

  
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/records/${id}`, {
      method: "DELETE"
    });
    
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  };
  
  const recordList = ()=>{
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  const selectOptions = (link, key)=>{
    return records.map(record=>{
      return(
        <option value={`${link}=${record[key]}&`} key={record._id}>{record[key]}</option>
      )
    })
  }
  const addFilterUrl = val =>{
    const updateLink = val=>{
      console.log(val)
      if(!recordsUrl.includes(val)){
        return (`${recordsUrl}${val}`)
      }
      return recordsUrl.replace(val,'')
    }
    setRecordsUrl(updateLink(val))
   }

  useEffect(()=>{
    console.log(recordsUrl)
  },[recordsUrl])

  const changeSelected = (val)=>{
    setSelected(val)
    addFilterUrl(val)
  }

  useEffect(()=>{
    console.log(selected)
  },[selected])

  return (
    <div>
      <h3>Record List</h3>
      <select onChange={(e)=>{changeSelected(e.target.value)}}>
        <option value={selected}>No filter selected</option>
        {selectOptions("position_by", 'position')}
      </select>
      <select onChange={(e)=>{changeSelected(e.target.value)}}>
        <option value={selected}>No filter selected</option>
        {selectOptions("level_by", 'level')}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name<input className="form-check-input" type="checkbox" value="order_by=fname&" id="flexCheckDefault" onClick={(e)=>addFilterUrl(e.target.value)}></input><label class="form-check-label">Sort</label></th>
            <th>Middle Name<input className="form-check-input" type="checkbox" value="order_by=mname&" id="flexCheckDefault" onClick={(e)=>addFilterUrl(e.target.value)}></input><label class="form-check-label">Sort</label></th>
            <th>Last Name<input className="form-check-input" type="checkbox" value="order_by=lname&" id="flexCheckDefault" onClick={(e)=>addFilterUrl(e.target.value)}></input><label class="form-check-label">Sort</label></th>
            <th>Position<input className="form-check-input" type="checkbox" value="order_by=position&" id="flexCheckDefault" onClick={(e)=>addFilterUrl(e.target.value)}></input><label class="form-check-label">Sort</label></th>
            <th>Level<input className="form-check-input" type="checkbox" value="order_by=level&" id="flexCheckDefault" onClick={(e)=>addFilterUrl(e.target.value)}></input><label class="form-check-label">Sort</label></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recordList()}
        </tbody>
      </table>
    </div>
  );
}

export default RecordList
