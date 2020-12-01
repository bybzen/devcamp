import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { db } from './firebase'
import { useHistory } from 'react-router-dom';


const Shop = () => {

    const[alldata,setAlldata] = useState({
        subject_code:[],
    })

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = () => db.ref(`/file`).on('value', snapshot => {
        const data = snapshot.val()
        console.log(data)
        if(data){
            setAlldata({
            subject_code: Object.keys(data),
            data: data
            })
        }
    })

    function toItem(ProductID){
        history.replace(`/shop/${ProductID}`)
    }

    const history = useHistory()

    function goBack(){
        history.replace('/account')
    }

    return (
        <div>
            <Navbar/>
            <button onClick={goBack}>back</button>
            {alldata.subject_code.map((key)=>{
            return(
                
            <li>{`subject code : ${key}`} {`subject name : ${alldata.data[key].name}`} 
            <a className='download' onClick={() => toItem(key)}>detail</a></li>
            )
        })}
        </div>

        
        
    )
}
export default Shop