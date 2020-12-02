import React from 'react'
import { auth, db, store } from './firebase'
import Navbar from './components/Navbar'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, Textarea
    , Box
} from "@chakra-ui/react"

import './css/App.css'

const Upload = () => {
    const [subject_code, setSubjectCode] = useState()
    const [subject_name, setSubjectName] = useState()
    const [description, setDescription] = useState()
    const subjectCode = (e) => {
        setSubjectCode(e.target.value)
    }
    const _description = (e) => {
        setDescription(e.target.value)
    }
    const subjectName = (e) => {
        setSubjectName(e.target.value)
    }
    const [file, setFile] = useState()
    const [img, setImg] = useState()
    const [name, setName] = useState()
    const history = useHistory()
    const Choose = event => {
        const _file = event.target.files[0]
        if (_file !== null) {
            setFile(_file)
        }
    }
    const UpImage = event => {
        const _img = event.target.files[0]
        if (_img !== null) {
            setImg(_img)
        }
    }


    db.ref(`/users/${localStorage.uid}`).once('value').then((snapshot) => {
        setName(snapshot.val().name)
    })

    async function Upload() {
        const file_ref = store.ref(localStorage.uid).child(file.name)
        await file_ref.put(file)
        const file_url = await file_ref.getDownloadURL()
        console.log(file_url)
        console.log(subject_code)

        const img_ref = store.ref(subject_code).child(img.name)
        await img_ref.put(img)
        const img_url = await img_ref.getDownloadURL()

        console.log(`/users/${localStorage.uid}/upload/${subject_code}`)

        console.table({
            subjectCode: subject_code,
            fileUrl: file_url,
            uid: auth.currentUser.uid,
            name: subject_name,
            description: description,
            imgUrl: img_url,
            author: name
        })


        await db.ref(`/users/${localStorage.uid}/upload/${subject_code}`).set({
            subjectCode: subject_code,
            fileUrl: file_url,
            uid: auth.currentUser.uid,
            name: subject_name,
            description: description,
            imgUrl: img_url,
            author: name
        })
        await db.ref(`/file/${subject_code}`).set({
            subjectCode: subject_code,
            fileUrl: file_url,
            uid: auth.currentUser.uid,
            name: subject_name,
            description: description,
            imgUrl: img_url,
            author: name
        })
        alert('Upload Success')
    }

    const Back = () => {
        history.replace('/account')
    }

    return (
        <div>
            <Navbar />
            <br></br>

            <FormControl id="subject-Code">
                <FormLabel className="text1"> รหัสวิชา</FormLabel>
                <Box ml="20px" width="300px">
                    <Input className="inputBox2" placeholder="ระบุรหัสวิชา" type='text' onChange={subjectCode} />
                </Box>
            </FormControl>

            <br></br>

            <FormControl id="subject-Name">
                <FormLabel className="text1"> ชื่อวิชา</FormLabel>
                <Box ml="20px" width="300px">
                    <Input placeholder="ระบุชื่อวิชา" type='text' onChange={subjectName} />
                </Box>
            </FormControl>
            
            <br></br>

            <FormControl id="subject-Code">
                <FormLabel className="text1"> รายละเอียด</FormLabel>

                {/* <Input className="inputBox2" placeholder="รายละเอียด" type='text' onChange={_description} /> */}


                <Box ml="20px" width="300px">
                    <Textarea placeholder="รายละเอียด" type='text' onChange={_description} />
                    {/* <Input className="inputBox2" placeholder="รายละเอียด" type='text' onChange={_description} /> */}
                </Box>
            </FormControl>

            <br></br>

            <FormLabel className="text1"> เลือกรูปหน้าปก</FormLabel>
            <input style={{ paddingLeft: "2rem" }} type="file" onChange={UpImage} />

            <br></br><br></br>

            <FormLabel className="text1">อัปโหลดไฟล์</FormLabel>
            <input style={{ paddingLeft: "2rem" }} type="file" id="file_choose" onChange={Choose} />

            {/* <input type="file" id="file_choose" onChange={Choose}/> */}
            {/* <br></br><br></br> */}



            <br></br>
            <div align="center">
                <button className="cancel1" id="file_upload" onClick={Upload}>อัปโหลด</button>


                <button className="cancel2" onClick={Back}>ย้อนกลับ</button>

            </div>

        </div>
    )
}

export default Upload