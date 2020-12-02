import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { db } from './firebase'
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListIcon, OrderedList} from "@chakra-ui/react"
// import './css/App.css'


const Shop = () => {

    const [alldata, setAlldata] = useState({
        subject_code: [],
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => db.ref(`/file`).on('value', snapshot => {
        const data = snapshot.val()
        console.log(data)
        if (data) {
            setAlldata({
                subject_code: Object.keys(data),
                data: data
            })
        }
    })

    function toItem(ProductID) {
        history.replace(`/shop/${ProductID}`)
    }

    const history = useHistory()

    function goBack() {
        history.replace('/account')
    }

    return (
        <div>
            <Navbar />



            {alldata.subject_code.map((key) => {

                return (
                    <>
                        <br></br>

                        {/* <OrderedList>
                            <ListItem>{`subject code : ${key}`} {`subject name : ${alldata.data[key].name}`}</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </OrderedList> */}


                        <ol>
                            <li> {`subject code : ${key}`} {`subject name : ${alldata.data[key].name}`}
                                <br></br>
                                <a className='download' onClick={() => toItem(key)}>detail</a>
                            </li>
                        </ol>
                        
                    </>
                )
            })}

            {/* <button className="select_button" onClick={goBack}>back</button>
            <button className="select_button" onClick={}>show</button> */}
            <button className="cancel" onClick={goBack}>back</button>
        </div>



    )
}
export default Shop