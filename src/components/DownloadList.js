import React, { useEffect, useState } from 'react'
import { db } from './../firebase'
import './../App.css'

function DownloadList() {

    const [downloadList, setDownloadList] = useState({
        subject_code: []
    })

    const fetchDownload = async () => {
        db.ref(`/users/${localStorage.uid}/download/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if (data) {
                setDownloadList({
                    subject_code: Object.keys(data),
                    data: data
                })
            }
        })
    }

    useEffect(() => {
        fetchDownload()
    }, db.ref(`/users/${localStorage.uid}/download/`))

    return (
        <>
            <div>

                {downloadList.subject_code.map((key, index) => {
                    return (<>
                        <li key={index}>{`รหัสวิชา : ${key}`} 
                        <br></br>
                        ชื่อวิชา : {downloadList.data[key].name}
        
                            <br></br>
                            <a className="dowload_black" lassName='dowload2' onClick={() => window.location.href = downloadList.data[key].fileUrl}>ดาวน์โหลด</a>
                        </li>
                        <hr></hr></>
                    )
                })
                }

            </div >

        </>
    )

}

export default DownloadList