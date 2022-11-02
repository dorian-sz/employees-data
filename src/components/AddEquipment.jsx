import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const navigate = useNavigate()
    const [form ,setForm] = useState({
        name:"",
        type:"",
        amount:0
    });
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    async function onSubmit(e) {
        e.preventDefault();

        await fetch(`http://localhost:5000/equipments/`, {
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
            name:"",
            type:"",
            amount:0
        })
        navigate(`/equipments`);
    }
  return (
    <div>
      <h3>Add Equipments</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" value={form.name} onChange={e=>{updateForm({name:e.target.value})}}/>
        </div>
        <div className="form-group">
            <label htmlFor="type">Type</label>
            <input type="text" className="form-control" id="type" value={form.type} onChange={e=>{updateForm({type:e.target.value})}}/>
        </div>
        <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" className="form-control" id="amount" value={form.amount} onChange={e=>{updateForm({ amount:e.target.value})}}/>
        </div>
        <div className="form-group">
         <input
           type="submit"
           value="Add Equipment"
           className="btn btn-primary"
         />
       </div>
      </form>
    </div>
  )
}

export default Add
