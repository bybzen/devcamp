import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import {auth, db, store} from './firebase'
import { Link, useHistory } from 'react-router-dom';


const Shop = () => {

    const[alldata,setAlldata] = useState({
        subject_code:[],
        link:[],
        subjectname:[],
        data:{}
    })

    useEffect(()=>{
        fetchData()
    },db.ref('/users/'))

    const fetchData = () => db.ref(`/file`).on('value', snapshot => {
        const data = snapshot.val()
        console.log(data)
        if(data){
            setAlldata({
            subject_code: Object.keys(data),
            link: data['link'],
            subjectname: data['name'],
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

    function show(){
        alldata.subject_code.map((key)=>{
            console.log(key)
            console.log(alldata.data[key].name)
            console.log(alldata.data[key].link)
        })
    }
    return (
        <div>
            <Navbar/>
            hello
            <button onClick={goBack}>back</button>
            <button onClick={show}>show</button>
            {alldata.subject_code.map((key)=>{
                {console.log(key)}
            return(
                
            <li>{`subject code : ${key}`} {`subject name : ${alldata.data[key].name}`} 
            <a className='download' onClick={() => toItem(key)}>detail</a></li>
            )
        })}
        </div>

        
        
    )
}
export default Shop