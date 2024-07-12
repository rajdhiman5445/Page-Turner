import React, { useEffect, useRef, useState } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import Logo from "../files/page_turner_logo.svg";
import { Link } from 'react-router-dom';



function updateTheme(rendition, theme) {
  const themes = rendition.themes;
  switch (theme) {
    case 'dark': {
      themes.override('color', '#E6DBC6');
      themes.override('background', '#161616');
      break;
    }
    case 'light': {
      themes.override('color', '#000')
      themes.override('background', '#fff')
      break
    }
    default:
      break;
  }
}

const Read = () => {
  const params = useParams();
  const rendition = useRef(undefined);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
    }
  }, [theme]);

  const navigate = useNavigate();


  const [location, setLocation] = useLocalStorageState('persist-location', {
    defaultValue: 0,
  });

  const lightReaderTheme = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      transition: undefined,
    },
  }

  const darkReaderTheme = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: 'white',
    },
    arrowHover: {
      ...ReactReaderStyle.arrowHover,
      color: '#ccc',
    },
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: '#161616',
      transition: undefined,
    },
    titleArea: {
      ...ReactReaderStyle.titleArea,
      color: '#ccc',
    },
    tocArea: {
      ...ReactReaderStyle.tocArea,
      background: '#111',
    },
    tocButtonExpanded: {
      ...ReactReaderStyle.tocButtonExpanded,
      background: '#222',
    },
    tocButtonBar: {
      ...ReactReaderStyle.tocButtonBar,
      background: '#fff',
    },
    tocButton: {
      ...ReactReaderStyle.tocButton,
      color: 'white',
    },
  }

  let text;
  if (theme === 'dark'){
    text = "Light"
  } else{
    text = "Dark"
  }

  return (
    <div className='read-page' style={{ height: '100vh', }}>
     
      <ReactReader
        url={`https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/${params.url}?alt=media&token=${params.token}`}
        location={location}
        locationChanged={(loc) => setLocation(loc)}
        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
        getRendition={_rendition => {
          updateTheme(_rendition, theme);
          rendition.current = _rendition;
        }}
      />
       <div className='read-btn'>
        <div className='theme-btn' onClick={()=>{navigate(-1)}}>Back</div>
        <Link to="/"><img src={Logo} style={{width:"50px", paddingTop:"4px"}} /></Link>
        <div className='theme-btn' style={{cursor:"pointer"}} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{`${text}`}</div></div>
     
       
    </div>
  );
};

export default Read;
