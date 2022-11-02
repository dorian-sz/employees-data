import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const WorklogTable = ({worklog})=>(
    <tr>
        <td>{worklog.hours_worked}</td>
        <td>{worklog.description}</td>
    </tr>
)

const Worklog = () => {
    const [worklog, setWorklog] = useState([])
    const [form, setForm] = useState({
        hours_worked:0,
        description:""
    })
    const params = useParams()

    const fetchWorklog = async ()=>{
        const response = await fetch(`http://localhost:5000/worklog/${params.id.toString()}`)

        const worklog = await response.json()

        setWorklog(worklog.worklog)
    }
    useEffect(()=>{
        fetchWorklog()
    },[worklog.length, ])

    const worklogList = ()=>{
        return worklog.map(log=>{
            return <WorklogTable worklog={log} key={log._id}></WorklogTable>
        })
    }
    const onSubmit = async (e)=>{
        e.preventDefault()

        await fetch(`http://localhost:5000/worklog/${params.id.toString()}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        
        setForm({
            hours_worked:0,
            description:""
        })
        fetchWorklog()
    }
    const updateForm = (value)=>{
        setForm(prev=>{
            return {...prev, ...value}
        })
    }

  return (
    <div>
      <h3>Worklog</h3>
      <table className="table table-striped">
        <thead>
            <tr>
                <th>Hours Worked</th>
                <th>Work Description</th>
            </tr>
        </thead>
        <tbody>
            {worklogList()}
        </tbody>
      </table>
      <br />
      <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="hours_worked">Hours worked</label>
            <input type="text" className="form-control" id="hours_worked" value={form.hours_worked} onChange={e=>{updateForm({hours_worked:e.target.value})}}/>
        </div>
        <div className="form-group">
            <label htmlFor="description">Work Description</label>
            <input type="text" className="form-control" id="description" value={form.description} onChange={e=>{updateForm({description:e.target.value})}}/>
        </div>
        <br />
        <div className="form-group">
         <input
           type="submit"
           value="Add Worklog"
           className="btn btn-primary"
         />
       </div>
      </form>
    </div>
  )
}

export default Worklog
