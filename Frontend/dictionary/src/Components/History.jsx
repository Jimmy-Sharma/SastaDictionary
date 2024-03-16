import React, { useEffect, useState } from 'react'
import '../Styling/History.css'
import Navbar from './Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'

const History = () => {
    const [searches, setSearches] = useState([])
    let userData = JSON.parse(localStorage.getItem("sastaDictionary"))
    let email = userData.email

    const getData = async (email) => {
        try {
            const res = await axios.get(`http://localhost:4550/searches/history?email=${email}`);
            setSearches(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveTask = async (id) => {
        try {
            await axios.delete(`http://localhost:4550/searches/delete/${id}`);
            setSearches(prev => prev.filter(search => search._id !== id));
            toast.success("Search removed from History");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData(email);
    }, []);

    return (
        <>
            <Navbar />
            <div id="todo-list-container">
                <div id='todo-list-main-container'>
                    <h1 id='todo-list-main-heading'>History!</h1>
                    <table className="search-history-table">
                        {searches.length === 0 ? <div></div> :
                            <thead>
                                <tr>
                                    <th>Searches</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>}
                        <tbody>
                            {searches.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className='err-msg'>No searches yet!</td>
                                </tr>
                            ) : (
                                searches.map((el, i) => (
                                    <tr key={i}>
                                        <td>{el.searches}</td>
                                        <td id='buttonTD'><button onClick={() => handleRemoveTask(el._id)} id='removeBTN'>Remove</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default History
