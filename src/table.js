import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Link, Routes, BrowserRouter as Router } from "react-router-dom";
//import addTrip from './AddTrip';
import cyclingGif from './displayImages/cyclingGif.gif'
import sunsetCycling from './displayImages/sunsetCycling.jpg';


const Table = () => {
    const [newItem, setNewItem] = useState(cyclingGif);
    const [trips, setTrips] = useState([]);

    function searchTbl() {
        let input, filter, table, tr, td, i, txtValue, td1, td2;
        input = document.querySelector(".searchBox");
        filter = input.value.toUpperCase();
        table = document.querySelector(".tbl1");
        tr = table.tBodies[0].rows;

        for (i = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[2];
            if (td1 || td2) {
              txtValue = (td1.textContent || td1.innerText) + (td2.textContent || td2.innerText);
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            }
          }
          
        if (filter === "") {
            for (i = 0; i < tr.length; i++) {
                tr[i].style.display = "";
            }
        }
    }

    useEffect(() => {
        async function fetchTrips() {
            const res = await fetch('http://localhost:3070/trip');
            const trips = await res.json();
            setTrips(trips);
        }
        fetchTrips();
    }, []);


    const singleTrip = (id) => {
        return trips.find(trip => trip.id === id);
    }

    const deleteMaterial = async (evt, id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            const resp = await fetch(`http://localhost:3070/trip/${id}`, { method: 'DELETE' });
            if (resp.status === 200) {
                evt.nativeEvent.target.closest('tr').remove()
            }
        }
    }

    function metersToKm(meters) {
        return (meters / 1000).toFixed(2);
    }

    function secondsToMin(seconds) {
        return (seconds / 60).toFixed(2);
    }

    return (
        <Router>
            <div><input type="text" placeholder="search" className="searchBox" onKeyUp={() => searchTbl()} />
                <Link to={`/trip/add`}><button className='addBtn' onClick={() => setNewItem(() => <addTrip newItem />)}

                ><b>Add New</b></button></Link></div>
            <div className='container'>
                <div className='box1'>
                    <table className='tbl1'>
                        <thead>
                            <tr>
                                <th className='col0'>ID</th>
                                <th className='col1'>Departing Station</th>
                                <th className='col2'>Return Station</th>
                                <th className='col3'>Covered Distance 'km'</th>
                                <th className='col4'>Duration 'min'</th>
                                <th className='col5'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map((item) => (
                                <tr key={item.ID}>
                                    <td>{item.ID}</td>
                                    <td>{item.Departure_Station_Name}</td>
                                    <td>{item.Return_Station_Name}</td>
                                    <td>{metersToKm(item.Covered_Distance_Meters)}</td>
                                    <td>{secondsToMin(item.Duration_Seconds)}</td>
                                    <td><button onClick={(evt) => deleteMaterial(evt, item.ID)} className='delBtn' >delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Routes>
                        <Route path='/trip/add' render={() => <addTrip newItem />} />
                    </Routes>

                </div>
                <div className='box2'>
                    {newItem === cyclingGif ?
                        <img src={cyclingGif} alt={sunsetCycling} className='display_image' />
                        :
                        newItem &&
                        <addTrip newItem={newItem} />}
                </div>
            </div>
        </Router>

    );
};
export default Table;
