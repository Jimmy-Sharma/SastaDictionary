import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Styling/Dictionary.css'
import toast from 'react-hot-toast'
import Navbar from './Navbar'

const Dictionary = () => {

    const [search, setSearch] = useState("")
    const [data, setData] = useState()
    const handleSearch = async (e) => {
        e.preventDefault()
        let extract = JSON.parse(localStorage.getItem('sastaDictionary'))
        console.log(extract.email)
        let obj = {
            email: extract.email,
            searches: search
        }
        if (!search) {
            toast.error("Please enter a word!!")
        } else if (extract.email && search) {
            axios.post("http://localhost:4550/searches/create", obj)
                .then((res) => {
                    console.log('Added to History')
                })
                .catch((res) => {
                    console.log('Not Able to add to History')
                })
        }
        console.log(search)
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);
            setData(response.data[0].meanings[0].definitions[0].definition);
            console.log(response.data[0].meanings[0].definitions[0].definition);
        } catch (error) {
            console.log(error);
        }
        console.log(data)
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <>
            <Navbar />
            <div id='dictionaryContainer'>
                <div id="dictionaryMainContainer">
                    <h1 id='dictionaryMainHeading'>Dictionary App</h1>
                    <div id="dictionarySearchContainer">
                        <form action="" id='dictionaryForm' onSubmit={handleSearch}>
                            <input
                                id='dictionaryWordInput'
                                type="text"
                                placeholder="Enter a word"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                            <button id='dictionaryWordSearchBTN' onClick={handleSearch}>Search</button>
                        </form>
                    </div>
                    {
                        data ? <div id='searchOutput'><p>1.{data}</p></div> : <div></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Dictionary