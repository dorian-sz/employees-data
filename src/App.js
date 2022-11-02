import React from 'react'
import { Route, Routes } from "react-router-dom";
import AddEquipment from './components/AddEquipment';
import CreateRecord from './components/CreateRecord';
import EditEquipment from './components/EditEquipment';
import EditRecord from './components/EditRecord';
import Equipments from './components/Equipments';
import Navbar from './components/Navbar';
import RecordList from './components/RecordList';
import Worklog from './components/Worklog';

const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route  exact path='/records' element={<RecordList></RecordList>}></Route>
          <Route  exact path='/create' element={<CreateRecord></CreateRecord>}></Route>
          <Route  exact path='/editrecord/:id' element={<EditRecord></EditRecord>}></Route>
          <Route exact path = '/equipments' element={<Equipments></Equipments>}></Route>
          <Route exact path = '/add' element={<AddEquipment></AddEquipment>}></Route>
          <Route exact path='/editequipment/:id' element={<EditEquipment></EditEquipment>}></Route>
          <Route exact path='/worklog/:id' element={<Worklog></Worklog>}></Route>
        </Routes>
    </div>
  )
}

export default App
