import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import { useParams } from 'react-router-dom'

const Read = () => {
    const params = useParams();
    const [location, setLocation] = useState(null)
    const locationChanged = epubcfi => {setLocation(epubcfi)}
    return (
        <>
        <div style={{ height: '100vh' }}>
      <ReactReader
       // url={`https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/${params.url}?alt=media&token=${params.token}`}
       url="https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/Days%20at%20the%20Morisaki%20Bookshop%20(Satoshi%20Yagisawa,%20Eric%20Ozawa%20(translation)).epub?alt=media&token=91929529-b266-4001-93e0-f8707086e64b"
       location={location}
        locationChanged={locationChanged}
      />
    </div>
        </>
    )
}

export default Read;