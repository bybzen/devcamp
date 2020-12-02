import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, db } from './firebase'
import Navbar from './components/Navbar'
import './css/App.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    useDisclosure,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider, Button, Stack, Center,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    StackDivider
} from "@chakra-ui/react"

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, Image, AspectRatio
} from "@chakra-ui/react"


const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        uid: '',
        qr_bank: ''
    })
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged(function (currentUser) {
            if (currentUser) {
                console.log(currentUser)
                db.ref('/users/' + auth.currentUser.uid).once('value').then((snapshot) => {
                    setUser({
                        name: snapshot.val().name,
                        qr_bank: snapshot.val().qr_bank,
                        email: snapshot.val().email,
                        uid: auth.currentUser.uid
                    })
                    localStorage.setItem('uid', auth.currentUser.uid)
                })
            }
        })
    }, [auth])
    function logout() {
        auth.signOut()
        history.replace('/')
    }

    function goUpload() {
        history.replace('/account/upload')
    }

    function goStorage() {
        history.replace('/account/storage')
    }

    function goShop() {
        history.replace('/shop')
    }

    const [size, setSize] = React.useState("md")
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = (newSize) => {
        setSize(newSize)
        onOpen()
    }

    const sizes = ["xs"]


    return (
        <>
            <div>
                <Navbar />

                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" align="center" pt="5">

                    {/* <AspectRatio maxW="200px" ratio={1}>  ******ใส่รูป*******
                    <Image src={detail.imgUrl} />
                </AspectRatio> */}

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
                            <FormLabel className="text1" bg="yellow" > ชื่อ :  {user.name} </FormLabel>
                            <FormLabel className="text1"> อีเมล :  {user.email} </FormLabel>

                        </Box>

                    </Box>
                </Box>

                {sizes.map((size) => (
                    <Button className="menu"
                        onClick={() => handleClick(size)}
                        key={size}
                        m={4}
                    >
                        เมนู
                    </Button>
                ))}

                <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                    <DrawerOverlay w="lg">
                        <DrawerContent>
                            <DrawerHeader> 
                                
                            </DrawerHeader>
                            <DrawerBody maxW="lg" px={0}>
                            <Center py={3}>
                                    <VStack divider={<StackDivider borderColor="grey.200" />} w="lg" align="stretch" direction="row" spacing={4} >

                                        <Button bg="white" px={0} border="0px" colorScheme="black" variant="outline" onClick={goUpload}>อัปโหลด</Button>
                                        <Button  border="0px" colorScheme="black" variant="outline" onClick={goStorage}>คลังสรุป</Button>
                                        <Button  border="0px" colorScheme="black" variant="outline" onClick={goShop}>ร้านค้า</Button>
                                        <Button  border="0px" colorScheme="black" variant="outline" onClick={logout}>ออกจากระบบ</Button>
                                   
x                                    </VStack>
                                </Center>

                                {size === "full"
                                    ? `You're trapped 😆 , refresh the page to leave or press 'Esc' key.`
                                    : null}
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>


            </div>



        </>
    )
}

export default Profile