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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // 100% is default

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
    }
  }, [theme]);

  // Apply font size changes
  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.fontSize(`${fontSize}%`);
    }
  }, [fontSize]);

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 10, 150)); // Max 150%
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 10, 70)); // Min 70%
  };

  return (
    <div className='read-page' style={{ height: '100vh' }}>
      {/* Settings Drawer */}
      <div 
  className="settings-drawer" 
  style={{
    position: 'absolute',
    bottom: drawerOpen ? '0' : (isMobile ? '-80px' : '-70px'),
    contentVisibility: drawerOpen ? 'visible' : 'hidden',
    right: '0',
    height: drawerOpen ? isMobile ? '80px' : '70px' : '0',
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
    gap: '10px',
    padding: isMobile ? '0 15px' : '0 20px',
    transition: 'bottom 0.3s ease',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
    color: theme === 'dark' ? '#E6DBC6' : '#333'
  }}
>
    {/* Font Size Controls - Mobile Friendly */}
<div style={{ display: 'flex', alignItems: 'center', marginTop: isMobile ? '20px' : '0px' }}>
    <span style={{ marginRight: '10px', fontSize: isMobile ? '14px' : '16px' }}>Font Size</span>
    <button 
      onClick={decreaseFontSize} 
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${theme === 'dark' ? '#E6DBC6' : '#333'}`,
        color: theme === 'dark' ? '#E6DBC6' : '#333',
        borderRadius: '5px',
        padding: isMobile ? '2px 10px' : '5px 10px',
        marginRight: '5px',
        fontSize: isMobile ? '14px' : '16px',
        cursor: 'pointer'
      }}
    >
      -
    </button>
    
    <button 
      onClick={increaseFontSize}
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${theme === 'dark' ? '#E6DBC6' : '#333'}`,
        color: theme === 'dark' ? '#E6DBC6' : '#333',
        borderRadius: '5px',
        padding: isMobile ? '2px 8px' : '5px 10px',
        fontSize: isMobile ? '14px' : '16px',
        cursor: 'pointer'
      }}
    >
      +
    </button>
  </div>
        
        {/* Theme Toggle Button - Mobile Friendly */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '10px', fontSize: isMobile ? '14px' : '16px' }}>Theme</span>
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${theme === 'dark' ? '#E6DBC6' : '#333'}`,
        color: theme === 'dark' ? '#E6DBC6' : '#333',
        borderRadius: '5px',
        padding: isMobile ? '2px 8px' : '5px 10px',
        cursor: 'pointer',
        fontSize: isMobile ? '14px' : '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Aa
    </button>
  </div>
</div>

      
     
      <ReactReader
        url={`https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/${params.url}?alt=media&token=${params.token}`}
        location={location}
        locationChanged={(loc) => setLocation(loc)}
        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
        getRendition={_rendition => {
          updateTheme(_rendition, theme);
          rendition.current = _rendition;
          rendition.current.themes.fontSize(`${fontSize}%`);
        }}
      />

<div 
  className="settings-button"
  onClick={toggleDrawer}
  style={{
    position: 'fixed',
    bottom: drawerOpen ? (isMobile ? '80px' : '70px') : '0',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: isMobile ? '3px 10px' : '5px 15px',
    backgroundColor: theme === 'dark' ? '#333' : '#ddd',
    color: theme === 'dark' ? '#E6DBC6' : '#333',
    borderRadius: '10px 10px 0 0',
    cursor: 'pointer',
    zIndex: 999,
    transition: 'bottom 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    fontSize: isMobile ? '12px' : '14px'
  }}
>
  {isMobile ? '⚙️' : (drawerOpen ? 'Close' : 'Settings ⚙️')}
</div>

  
    </div>
  );
};

export default Read;