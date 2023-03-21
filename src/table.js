import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Link, Routes, BrowserRouter as Router } from "react-router-dom";
import AddTrip from './AddTrip';
import cyclingGif from './displayImages/cyclingGif.gif'
import sunsetCycling from './displayImages/sunsetCycling.jpg';


const Table = () => {
    const [newItem, setNewItem] = useState(cyclingGif);
    const [trips, setTrips] = useState([]);
    const [stations, setStations] = useState([]);
    const [tripList, setTripList] = useState([]);
    const [showList, setShowList] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [showInfo, setShowInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function searchTbl() {
        let input, filter, table, tr, i, txtValue, td1, td2;
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
    function searchStations(event) {
        let input, filter, ul, li, button, i, txtValue;
        input = event.target;
        filter = input.value.toUpperCase();
        ul = document.querySelector(".stationBox ul");
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {
            button = li[i].getElementsByTagName("button")[0];
            txtValue = button.textContent || button.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
        if (filter === "") {
            for (i = 0; i < li.length; i++) {
                li[i].style.display = "";
            }
        }
        setSelectedItem('');
        setShowModal(false);
    }
    function handleStationClick(event) {
        const stationName = event.target.textContent;
        setSelectedItem(stationName);
        setShowModal(true);
    }
    useEffect(() => {
        async function fetchTrips() {
            const res = await fetch('http://localhost:3070/trip');
            const trips = await res.json();
            setTrips(trips);

            const departureStations = [...new Set(trips.map(trip => trip.Departure_Station_Name))];
            const returnStations = [...new Set(trips.map(trip => trip.Return_Station_Name))];
            const allStations = [...departureStations, ...returnStations];
            const uniqueStations = [...new Set(allStations)];
            setStations(uniqueStations);
        }
        fetchTrips();
    }, []);

    useEffect(() => {
        async function fetchStations() {
            const res = await fetch('http://localhost:3070/station');
            const stationInfo = await res.json();
            setShowInfo(stationInfo);
        }
        fetchStations();
    }, []);

    const deleteMaterial = async (evt, id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            const resp = await fetch(`http://localhost:3070/trip/${id}`, { method: 'DELETE' });
            if (resp.status === 200) {
                evt.nativeEvent.target.closest('tr').remove()
            }
        }
    }
    const singleStation = (name) => {
        const station = showInfo.find(info => info.Nimi === name);
        return station ? station : null;
    }
    const StationInfo = () => {
        const station = singleStation(selectedItem);
        return (
            <div>
                {station && (
                    <div>
                        <div className='cell1'><b>Station Name:</b> {station.Nimi}</div>
                        <div className='cell2'><b>Station Address:</b> {station.Osoite}</div>
                        <div className='cell5'><b>map location:</b><span>longitude: {station.cordinate_X}</span><span>latitude: {station.cordinate_Y}</span></div>
                    </div>
                )}
            </div>
        );
    };

    const ModalFunction = () => {

        function HandleClose() {
            setShowList(true);
            setShowModal(false);
        };

        return (
            <div>
                {showModal && (
                    <div className="modal">
                        <div className='modal-header'>
                            <p>Station Info</p>
                        </div>
                        <button className='modalClose' onClick={HandleClose}>Close</button>
                        <div class="modal-content">
                            <StationInfo />
                        </div>
                    </div>
                )}
            </div>
        )
    };

    const ListOfTrip = () => {
        function HandleClose() {
            setShowList(false);
            setNewItem(cyclingGif);
            setShowModal(false);
        };
        return (
            <div className='stationBox'>
                <div>
                    <div><p><b>List of Stations</b></p></div>
                    <input type="text" placeholder="search stations" className="stationSearch" onChange={searchStations} />
                    <button className="stationListClose" onClick={HandleClose}><b>Close stationList</b></button>
                </div>
                <ul>
                    {stations.map((station, index) => (
                        <li key={index}>
                            <button onClick={handleStationClick}>{station}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    function metersToKm(meters) {
        return (meters / 1000).toFixed(2);
    }
    function secondsToMin(seconds) {
        return (seconds / 60).toFixed(2);
    }
    return (
        <Router>
            <ModalFunction/>
            <div><input type="text" placeholder="search" className="searchBox" onKeyUp={() => searchTbl()} />
                <Link to={`/trip/add`}><button className='addBtn' onClick={() => {
                    if (newItem === { AddTrip }) {
                        setNewItem(null)
                        setTripList(null)
                    } else {
                        setNewItem({ AddTrip })
                        setTripList(null)
                    }
                }}>
                    <b>Add New Trip</b></button></Link><Link to={`/trip/stations`}><button className='stationBtn' onClick={() => {
                        if (tripList === { ListOfTrip }) {
                            setTripList(null)
                            setNewItem(null)
                        } else {
                            setTripList({ ListOfTrip })
                            setNewItem(null)
                            setShowList(true)
                        }
                    }}><b>Show All Stations</b></button></Link></div>
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
                        <Route path='/trip/add' render={<AddTrip newItem />} />
                        <Route path='/trip/stations' render={<ListOfTrip tripList />} />
                        <Route path='/station/:name' render={<StationInfo selectedItem />} />
                    </Routes>
                </div>
                <div className='box2'>
                    {newItem === cyclingGif ?
                        <img src={cyclingGif} alt={sunsetCycling} className='display_image' />
                        :
                        newItem ?
                            <AddTrip newItem={newItem} />
                            :
                            tripList &&
                            <ListOfTrip tripList={tripList} />}
                </div>
            </div>
        </Router>
    );
};
export default Table;
