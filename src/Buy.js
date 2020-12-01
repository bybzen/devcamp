import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { auth, db } from './firebase'
import scbService from './components/SCBService'

const Buy = () =>{

    const history = useHistory()
    const param = useParams()
    const productID = param.productId
    console.log("pro = "+ productID)
    const [link,setLink] = useState()
    const [name,setName] = useState()

    const fetchData = () => db.ref(`/file/${productID}`).once('value', snapshot => {
        const data = snapshot.val()
        console.log(data)
        if(data){
            setLink(data.link)
            setName(data.name)
        }
    })

    useEffect(()=>{
        fetchData()
    })

    function goBack(){
        history.replace(`/shop/${productID}`)
    }

    scbService.setCallBack(link)

    async function buyItem(){
        window.location = (await scbService.createLink(500)).deeplinkUrl
        db.ref(`/users/${auth.currentUser.uid}/download/${productID}/`).set({
            link: link,
            name: name
        })
    }

    return(
        <div>
            <p></p>
            <a onClick={buyItem}>COMFIRM BUY</a>
            <button onClick={goBack}>BACK</button>
        </div>
    )
}

export default Buy