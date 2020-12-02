import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { db } from './firebase'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, Image, AspectRatio
} from "@chakra-ui/react"

const ProductDetail = () => {

    const params = useParams()
    const productID = params.productId

    const history = useHistory()

    const [detail, setDetail] = useState({
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
            if (data) {
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


    useEffect(() => {
        fetchDetail()
    }, [])

    function goBack() {
        history.replace('/shop')
    }

    function goBuy(productID) {
        history.replace(`/shop/${productID}/buy`)
    }

    console.log(detail.imgUrl)
    return (
        <div>
            <Navbar />

            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" align="center" pt="5">
                <AspectRatio maxW="200px" ratio={1}>
                    <Image src={detail.imgUrl} />
                </AspectRatio>

                <Box p="6">
                    <Box d="flex" alignItems="baseline">

                        <Box
                            color="gray.900"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                        </Box>
                    </Box>

                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        <FormLabel className="text1"> ชื่อวิชา :  {detail.name} </FormLabel>
                        <FormLabel className="text1"> รหัสวิชา :  {detail.subjectCode} </FormLabel>

                        <FormLabel className="text1"> ผู้เขียน :  {detail.author} </FormLabel>
                        <FormLabel className="text1"> รายละเอียด :  {detail.description} </FormLabel>


                    </Box>


                </Box>
            </Box>


            <br></br>
            <div align="center">
                <strong className="price" > 50 บาท</strong>
            </div>

            <div align="center">
                <button className="cancel1" onClick={() => goBuy(productID)}>ซื้อสินค้า</button>

                <button className="cancel2" onClick={goBack}>ย้อนกลับ</button>
            </div>

        </div>
    )

}

export default ProductDetail