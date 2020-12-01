import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { auth, store, db } from './firebase'

const ProductDetail = () => {

    const params = useParams()
    const productID = params.productId

    const history = useHistory()

    const[detail,setDetail] = useState({
        name: '',
        subjectCode: '',
        uid: '',
        link: '',
    })

    const fetchDetail = async () => {
        db.ref(`/file/${productID}`).once('value', snapshot => {
            const data = snapshot.val()
            console.log(snapshot)
            // console.log(data)
            if(data){
                setDetail({
                    name: data.name,
                    subjectCode: snapshot.key,
                    uid: data.uid,
                    link: data.link
                })
                console.log(detail.uid)
                fetchUser(data.uid)
            }
        })
    }

    const fetchUser = (uid) =>{
        db.ref(`/users/${uid}`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setDetail(prevDetail => ({
                    ...prevDetail,
                    author: data.name
                }))
            }
        })
    }

    useEffect(()=> {
        fetchDetail()
        //fetchUser()
    },[])

    function goBack(){
        history.replace('/shop')
    }

    function goBuy(productID){
        history.replace(`/shop/${productID}/buy`)
    }

    //console.log(detail.name+':'+detail.subjectCode+':'+detail.uid+':'+detail.link)

    return(
        <div>
            <Navbar/>
            <p>Subject code {productID} </p>
            <p>Subject name {detail.name}</p>
            <p>Author {detail.author}</p>
            <br></br>
            <button onClick={goBack}>BACK</button>
            <button onClick={() => goBuy(productID)}>BUY</button>
        </div>
    )

}

export default ProductDetail