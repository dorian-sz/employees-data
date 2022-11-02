import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const EditEquipment = () => {
    const [form, setForm] = useState({
        name:"",
        type:"",
        amount:0
    });
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchData() {
            const id = params.id.toString()
            const response = await fetch(`http://localhost:5000/equipments/${params.id.toString()}`)

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
              }
            
            const equipment = await response.json();
            if (!equipment) {
                window.alert(`Equipment with id ${id} not found`);
                navigate("/equipments");
                return;
            }

            setForm(equipment)
        }
        fetchData();
        return
    }, [params.id])

    const updateForm = (value)=>{
        return setForm(prev=>{
            return {...prev, ...value}
        })
    }

    const onSubmit = async(e)=>{
        e.preventDefault();
        await fetch(`http://localhost:5000/equipments/${form._id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
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
      <h3>Edit Equipment</h3>
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
            <input type="text" className="form-control" id="amount" value={form.amount} onChange={e=>{updateForm({amount:e.target.value})}}/>
        </div>
      <div className="form-group">
         <input
           type="submit"
           value="Edit Equipment"
           className="btn btn-primary"
         />
       </div>
      </form>
    </div>
  )
}

export default EditEquipment
