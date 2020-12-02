import React from 'react'
import { useHistory } from 'react-router-dom'
import './App.css'
import Upp from './components/UploadList'
import Dww from './components/DownloadList'
import { Button, Nav } from 'react-bootstrap'
// import { CartFill } from 'react-bootstrap-icons'
import Navbar from './components/Navbar'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

const Storage = () => {

    const style = {
        backgroundColor: "#e3e3e3",
    }

    const history = useHistory()
    function goback() {
        history.replace('/account')
    }

    return (
        <div>
            <Navbar /> 
            <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                    <Tab _selected={{ color: "white", bg: "orange.300" }} >คลังอัปโหลด</Tab>
                    <Tab _selected={{ color: "white", bg: "orange.300" }} >คลังดาวน์โหลด</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>

                    <Upp />

                    {/* <hr></hr> */}
                        

                    </TabPanel>
                    <TabPanel>
                        
                        <Dww />
                        {/* <hr></hr> */}
                    </TabPanel>
                </TabPanels>
            </Tabs>


            <button className="cancel" onClick={goback}>BACK</button>
        </div>
    )
}

export default Storage