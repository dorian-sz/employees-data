import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";

const Equipment = ({equipment, deleteEquipment})=>(
    <tr>
        <td>{equipment.name}</td>
        <td>{equipment.type}</td>
        <td>{equipment.amount}</td>
        <td>
        <Link className="btn btn-link" to={`/editequipment/${equipment._id}`}>Edit</Link> |
        <button className="btn btn-link"
        onClick={() => {
            deleteEquipment(equipment._id);
        }}
        >
        Delete
        </button>
        </td>
    </tr>
)

const Equipments = () => {
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        async function getEquipments() {
          const response = await fetch('http://localhost:5000/equipments/');
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const equipments = await response.json();
          setEquipments(equipments);
        }
      
        getEquipments();
      
        return;
      }, [equipments.length]);

      async function deleteEquipment(id) {
        await fetch(`http://localhost:5000/equipments/${id}`, {
          method: "DELETE"
        });
        
        const newEquipments = equipments.filter((el) => el._id !== id);
        setEquipments(newEquipments);
      };

      const equipmentList = ()=>{
        return equipments.map(eq=>{
            return(
                <Equipment 
                equipment={eq} 
                deleteEquipment={() => deleteEquipment(eq._id)}
                key={eq._id} 
                />
            )
        })
      }
  return (
    <div>
      <h3>Equipments List</h3>
      <table className="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {equipmentList()}
        </tbody>
      </table>
    </div>
  )
}

export default Equipments
