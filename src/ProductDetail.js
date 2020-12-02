import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { db } from './firebase'
import scbService from './components/SCBService'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, Image, AspectRatio,useDisclosure,

    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,Button,AlertDialogCloseButton
} from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'


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
                    imgUrl: data.imgUrl,
                    uid: localStorage.uid
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

    console.log(detail.imgUrl)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    scbService.setCallBack('https://papoy.vercel.app/account/storage')
    async function buyItem(){
        window.location = (await scbService.createLink(10)).deeplinkUrl
        db.ref(`/users/${localStorage.uid}/download/${productID}/`).set(detail)
    }

    return (
        <>
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
                            fontWeight="'Kanit', sans-serif"
                            as="h4"
                            lineHeight="tight"
                            
                        >
                            <FormLabel className="text1"> ชื่อวิชา :  {detail.name} </FormLabel>
                            <FormLabel className="text1"> รหัสวิชา :  {detail.subjectCode} </FormLabel>
                            <FormLabel className="text1"> ผู้เขียน :  {detail.author} </FormLabel>
                            <FormLabel className="text0" fontFamily="'Kanit', sans-serif" > รายละเอียด :  {detail.description} </FormLabel>
                            <FormLabel className="text1"> วันที่อัปโหลด : 02/12/2020  </FormLabel>
                            <Box d="flex" mt="2" alignItems="center" ml="3">
                                {Array(5)
                                    .fill("")
                                    .map(() => (
                                        <StarIcon
                                            color={"yellow.400"}
                                        />
                                    ))}
                            </Box>

                        </Box>
                    </Box>
                </Box>


                <br></br>
                <div align="center">
                    <strong className="price" > 10 บาท</strong>
                </div>

                {/* <div align="center"> */}
                    {/* <button className="cancel1" onClick={() => goBuy(productID)}>ซื้อสินค้า</button> */}

                    {/* <button className="cancel2" onClick={goBack}>ย้อนกลับ</button> */}
                {/* </div> */}

                <div align="center">
             <button className="cancel1" onClick={onOpen}>ซื้อสินค้า</button>
             <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                {/* <AlertDialogHeader>---</AlertDialogHeader> */}
                <AlertDialogCloseButton />
                <AlertDialogBody>
                ยืนยันคำสั่งซื้อ
                </AlertDialogBody>
                <AlertDialogFooter>
                <Button colorScheme="green" onClick={buyItem}>
                    ยืนยัน
                  </Button>
                  <Button  ref={cancelRef} onClick={onClose} ml={3}>
                    ยกเลิก
                  </Button>

                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <button className="cancel2" onClick={goBack}>ย้อนกลับ</button>
            </div>
          



            </div>
        </>

        
    )

    


}

export default ProductDetail