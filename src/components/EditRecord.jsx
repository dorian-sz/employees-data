import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [form,setForm] = useState({
        fname:"",
        mname:"",
        lname:"",
        position:"",
        level:"",
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5000/records/${params.id.toString()}`);
    
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const record = await response.json();
        if (!record) {
          window.alert(`Record with id ${id} not found`);
          navigate("/records");
          return;
        }
    
        setForm(record);
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    async function onSubmit(e) {
        e.preventDefault();

        await fetch(`http://localhost:5000/records/${form._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          })
          .catch(error => {
            window.alert(error);
            return;
          });

        setForm({
            fname:"",
            mname:"",
            lname:"",
            position:"",
            level:"",
        })
        navigate(`/records`);
    }

  return (
    <div>
        <h3>Edit Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input type="text" className="form-control" id="fname" value={form.fname} onChange={e=>{updateForm({fname:e.target.value})}}/>
        </div>
        <div className="form-group">
            <label htmlFor="mname">Middle Name</label>
            <input type="text" className="form-control" id="mname" value={form.mname} onChange={e=>{updateForm({mname:e.target.value})}}/>
        </div>
        <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" className="form-control" id="lname" value={form.lname} onChange={e=>{updateForm({lname:e.target.value})}}/>
        </div>
        <div className="form-group">
            <label htmlFor="position">Position</label>
            <input type="text" className="form-control" id="position" value={form.position} onChange={e=>{updateForm({position:e.target.value})}}/>
        </div>
        <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Intern"
             checked={form.level === "Intern"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Intern</label>
         </div>
        <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Senior</label>
         </div>
        <div className="form-group">
         <input
           type="submit"
           value="Edit Record"
           className="btn btn-primary"
         />
       </div>
      </form>
    </div>
  )
}

export default Edit
