import React, {useEffect, useState} from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/v1/documents'

function DocumentUpload() {
    const [documents, setDocuments] = useState([])
    const [image, setImage] = useState(null)


    useEffect(() => { 
        fetch(baseUrl)
        .then(res => res.json())
        .then(data => setDocuments(data))
    }, [])

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(baseUrl, formData, config)
        .then(res => {
            console.log(res)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleImage}/>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default DocumentUpload