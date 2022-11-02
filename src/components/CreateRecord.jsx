import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const CreateRecord = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fname:"",
        mname:"",
        lname:"",
        position:"",
        level:"",
    })
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    async function onSubmit(e) {
        e.preventDefault();

        await fetch(`http://localhost:5000/records/`, {
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
    useEffect(()=>{
        console.log(form)
    },[form])
  return (
    <div>
      <h3>Create Record</h3>
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
           value="Create person"
           className="btn btn-primary"
         />
       </div>
      </form>
    </div>
  )
}

export default CreateRecord
