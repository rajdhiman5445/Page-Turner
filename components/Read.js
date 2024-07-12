import React, { useEffect, useRef, useState } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import { useParams } from 'react-router-dom';

function updateTheme(rendition, theme) {
  const themes = rendition.themes;
  switch (theme) {
    case 'dark': {
      themes.override('color', '#E6DBC6');
      themes.override('background', '#161616');
      break;
    }
    default:
      break;
  }
}

const Read = () => {
  const params = useParams();
  const [location, setLocation] = useState(null);
  const rendition = useRef(undefined);
  const [theme] = useState('dark');

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
    }
  }, [theme]);

  const locationChanged = epubcfi => {
    setLocation(epubcfi);
  };

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

  return (
    <div className='read-page' style={{ height: '100vh', }}>
      <ReactReader
        url={`https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/${params.url}?alt=media&token=${params.token}`}
        location={location}
        locationChanged={locationChanged}
        readerStyles={darkReaderTheme}
        getRendition={_rendition => {
          updateTheme(_rendition, theme);
          rendition.current = _rendition;
        }}
      />
    </div>
  );
};

export default Read;
