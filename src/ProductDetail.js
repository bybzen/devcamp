import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { db } from './firebase'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from "@chakra-ui/react"

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
            <img src={detail.imgUrl} alt="item_detail_img" width="100" height="100"></img>

            <FormLabel className="text1"> รหัสวิชา :  {detail.subjectCode} </FormLabel>
            <FormLabel className="text1"> ชื่อวิชา :  {detail.name} </FormLabel>
            <FormLabel className="text1"> โดย :  {detail.author} </FormLabel>
            <FormLabel className="text1"> รายละเอียด :  {detail.description} </FormLabel>




            {/* <p>Subject code {detail.subjectCode} </p>
            <p>Subject name {detail.name}</p>
            <p>Author {detail.author}</p>
            <p>Description {detail.description}</p> */}

            
            <button className="cancel" onClick={() => goBuy(productID)}>BUY</button>
            
            <br></br>

            <button className="cancel" onClick={goBack}>BACK</button>
            
        </div>
    )

}

export default ProductDetail