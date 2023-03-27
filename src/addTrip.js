import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const defaultFormData = {
  Departure: '',
  Return_time: '',
  Departure_Station_ID: '',
  Departure_Station_Name: '',
  Return_Station_ID: '',
  Return_Station_Name: '',
  Covered_Distance_Meters: '',
  Duration_Seconds: ''
};

const AddTrip = () => {
  const navigate = useNavigate();
  const [addNew, setAddNew] = useState(defaultFormData);
  const [formData, setFormData] = useState(new FormData());
  const [tripList, setTripList] = useState([]);


  const handleChange = (e) => {
      setAddNew({ ...addNew, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
      newFormData.append('Departure', addNew.Departure);
      newFormData.append('Return_time', addNew.Return_time);
      newFormData.append('Departure_Station_ID', addNew.Departure_Station_ID);
      newFormData.append('Departure_Station_Name', addNew.Departure_Station_Name);
      newFormData.append('Return_Station_ID', addNew.Return_Station_ID);
      newFormData.append('Return_Station_Name', addNew.Return_Station_Name);
      newFormData.append('Covered_Distance_Meters', addNew.Covered_Distance_Meters);
      newFormData.append('Duration_Seconds', addNew.Duration_Seconds);
    setFormData(newFormData);
    try {
      console.log(addNew);
      const response = await fetch('http://localhost:3070/trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addNew)
      });

      if (response.ok) {
        window.alert("New trip added");
      }else{
        window.alert("Error in uploading");
        throw new Error('Failed to add trip');
      }

      const newTrip = await response.json();
      setTripList([...tripList, newTrip]);
      setAddNew(defaultFormData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const HandleClose = () => {
    navigate('/')
  };


  return (
    <form name="formAdd" className="form">
      <label>
        <div> Departure time:</div>
        <div> <input type="datetime-local" name="Departure" value={addNew.Departure} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div> Return time:</div>
        <div> <input type="datetime-local" name="Return_time" value={addNew.Return_time} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div>Departure_Station_ID:</div>
        <div><input type="text" name="Departure_Station_ID" value={addNew.Departure_Station_ID} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div> Departure_Station_Name:</div>
        <div> <input type="text" name="Departure_Station_Name" value={addNew.Departure_Station_Name} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div>Return_Station_ID:</div>
        <div><input type="text" name="Return_Station_ID" value={addNew.Return_Station_ID} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div>Return_Station_Name:</div>
        <div><input type="text" name="Return_Station_Name" value={addNew.Return_Station_Name} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div> Covered_Distance_Meters:</div>
        <div> <input type="text" name="Covered_Distance_Meters" value={addNew.Covered_Distance_Meters} onChange={handleChange} /></div>
      </label><br />
      <label>
        <div> Duration_Seconds:</div>
        <div> <input type="text" name="Duration_Seconds" value={addNew.Duration_Seconds} onChange={handleChange} /></div>
      </label><br />
      <div><button className="addNewSaveBtn" type="submit" onClick={handleAdd} ><b>Save</b></button><button className="addNewCloseBtn" onClick={HandleClose}><b>Cancel</b></button></div>
    </form>
  );
}
export default AddTrip;
