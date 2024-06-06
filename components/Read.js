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
        url={`https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/${params.url}?alt=media&token=${params.token}`}
         location={location}
        locationChanged={locationChanged}
      />
    </div>
        </>
    )
}

export default Read;