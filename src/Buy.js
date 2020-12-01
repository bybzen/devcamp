import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { auth, db } from './firebase'
import scbService from './components/SCBService'

const Buy = () =>{

    const history = useHistory()
    const param = useParams()
    const productID = param.productId
    console.log("pro = "+ productID)
    const [item,setItem] = useState()


    const fetchData = () => db.ref(`/file/${productID}`).once('value', snapshot => {
        const data = snapshot.val()
        console.log(data)
        if(data){
            setItem({
                    name: data.name,
                    subjectCode: data.subjectCode,
                    author: data.author,
                    fileUrl: data.fileUrl,
                    description: data.description,
                    imgUrl: data.imgUrl,
                    uid: localStorage.uid
            })
        }
    })

    useEffect(()=>{
        fetchData()
    },[])

    function goBack(){
        history.replace(`/shop/${productID}`)
    }

    //scbService.setCallBack()

    async function buyItem(){
        window.location = (await scbService.createLink(500)).deeplinkUrl
        db.ref(`/users/${localStorage.uid}/download/${productID}/`).set(item)
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