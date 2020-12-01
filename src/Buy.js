import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { auth, db, store } from './firebase'

const Buy = () =>{

    const param = useParams()
    const productID = param.productId
    console.log("pro = "+ productID)
    return(
        <div>
            Buy
        </div>
    )
}

export default Buy