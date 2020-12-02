import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { db } from './firebase'
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListIcon, OrderedList } from "@chakra-ui/react"
// import './css/App.css'
import { Box, Image, Center } from "@chakra-ui/react"
import { AspectRatio } from "@chakra-ui/react"


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
                    <div>
                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" align="center" pt="5">
                            <AspectRatio maxW="200px" ratio={1}>
                                    <Image src={alldata.data[key].imgUrl} onClick={() => toItem(key)} />
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
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated
                                >
                                   รหัสวิชา : {alldata.data[key].subjectCode} <br></br> 
                                   ชื่อวิชา : {alldata.data[key].name}
                                </Box>

                                <Box>
                                    <Box 
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated>
                                      ราคา : 10  บาท
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </div>

                        <br></br>


                    </>
                )
            })}
        <div align="center">
            <button className="cancel1" onClick={goBack}>ย้อนกลับ</button>
            </div>
        </div>



    )
}
export default Shop