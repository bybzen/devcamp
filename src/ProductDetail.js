import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { db } from './firebase'

const ProductDetail = () => {

    const params = useParams()
    const productID = params.productId

    const history = useHistory()

    const[detail,setDetail] = useState({
        name: '',
        subjectCode: '',
        author: '',
        fileUrl: '',
        description: '',
        imgUrl: ''
    })

    const fetchDetail = async () => {
        db.ref(`/file/${productID}`).once('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setDetail({
                    name: data.name,
                    subjectCode: data.subjectCode,
                    author: data.author,
                    fileUrl: data.fileUrl,
                    description: data.description,
                    imgUrl: data.imgUrl
                })
            }
        })
    }


    useEffect(()=> {
        fetchDetail()
    },[])

    function goBack(){
        history.replace('/shop')
    }

    function goBuy(productID){
        history.replace(`/shop/${productID}/buy`)
    }

    console.log(detail.imgUrl)
    return(
        <div>
            <Navbar/>
            <image src={detail.imgUrl} alt="item_detail_img" width="100" height="100"></image>
            <p>Subject code {detail.subjectCode} </p>
            <p>Subject name {detail.name}</p>
            <p>Author {detail.author}</p>
            <p>Description {detail.description}</p>

            <br></br>
            <button onClick={goBack}>BACK</button>
            <button onClick={() => goBuy(productID)}>BUY</button>
        </div>
    )

}

export default ProductDetail