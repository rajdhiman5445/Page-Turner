import React, { useEffect, useRef, useState, useCallback } from 'react';
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

// Type for text selection
const Read = () => {
  const params = useParams();
  const rendition = useRef(undefined);
  const [theme, setTheme] = useState('dark');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // 100% is default
  
  // Notes functionality (replacing highlights)
  const [notes, setNotes] = useLocalStorageState('book-notes', {
    defaultValue: {},
  });
  const [currentNote, setCurrentNote] = useState('');
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  
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

  const toggleNotesPanel = () => {
    setShowNotesPanel(!showNotesPanel);
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 10, 150)); // Max 150%
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 10, 70)); // Min 70%
  };

  // Save a note
  const saveNote = useCallback(() => {
    if (!currentNote.trim()) return;
    
    const bookKey = params.url;
    const newNote = {
      id: Date.now(),
      text: currentNote,
      location: location, // Current location in the book
      timestamp: Date.now(),
    };
    
    // Update notes for this book
    setNotes(prev => ({
      ...prev,
      [bookKey]: [...(prev[bookKey] || []), newNote]
    }));
    
    // Clear the current note input
    setCurrentNote('');
  }, [params.url, location, currentNote, setNotes]);

  // Delete a note
  const deleteNote = useCallback((noteId) => {
    const bookKey = params.url;
    
    setNotes(prev => ({
      ...prev,
      [bookKey]: (prev[bookKey] || []).filter(note => note.id !== noteId)
    }));
  }, [params.url, setNotes]);

  // Navigate to a note's location
  const navigateToNoteLocation = useCallback((noteLocation) => {
    if (rendition.current) {
      setLocation(noteLocation);
    }
  }, [setLocation]);

  return (
    <div className='read-page' style={{ height: '100vh', position: 'relative' }}>
      {/* Notes Panel */}
      {showNotesPanel && (
        <div 
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: isMobile ? '80%' : '300px',
            height: '100%',
            backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
            zIndex: 1000,
            padding: '20px',
            boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
            color: theme === 'dark' ? '#E6DBC6' : '#333',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>My Notes</h3>
            <button 
              onClick={toggleNotesPanel}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: theme === 'dark' ? '#E6DBC6' : '#333'
              }}
            >
              ×
            </button>
          </div>
          
          {/* Note input area */}
          <div style={{ marginBottom: '20px' }}>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Add a note at current location..."
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                backgroundColor: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#E6DBC6' : '#333',
                border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
                borderRadius: '5px',
                resize: 'none'
              }}
            />
            <button
              onClick={saveNote}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: theme === 'dark' ? '#444' : '#eee',
                color: theme === 'dark' ? '#E6DBC6' : '#333',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Save Note
            </button>
          </div>
          
          {/* List of notes */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {notes[params.url]?.length === 0 || !notes[params.url] ? (
              <p style={{ fontStyle: 'italic' }}>No notes yet. Add your first note above.</p>
            ) : (
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0
              }}>
                {notes[params.url]?.map((note) => (
                  <li key={note.id} style={{ 
                    marginBottom: '15px',
                    padding: '10px',
                    backgroundColor: theme === 'dark' ? '#333' : '#eee',
                    borderRadius: '5px'
                  }}>
                    <div style={{ fontSize: '0.9em', marginBottom: '10px' }}>{note.text}</div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontSize: '0.8em',
                      color: theme === 'dark' ? '#aaa' : '#888'
                    }}>
                      <span>{new Date(note.timestamp).toLocaleString()}</span>
                      <div>
                        <button
                          onClick={() => navigateToNoteLocation(note.location)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: theme === 'dark' ? '#E6DBC6' : '#666',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            padding: 0,
                            marginRight: '10px'
                          }}
                        >
                          Go to
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: theme === 'dark' ? '#E6DBC6' : '#666',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Settings Drawer */}
      <div 
        className="settings-drawer" 
        style={{
          position: 'fixed',
          bottom: drawerOpen ? '0' : (isMobile ? '-130px' : '-90px'),
          contentVisibility: drawerOpen ? 'visible' : 'hidden',
          right: '0',
          height: drawerOpen ? isMobile ? '130px' : '90px' : '0',
          backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
          zIndex: 999,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100px',
          gap: isMobile ? '8px' : '15px',
          padding: isMobile ? '15px 15px' : '0 20px',
          transition: 'bottom 0.3s ease',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
          color: theme === 'dark' ? '#E6DBC6' : '#333',
          width: '100%'
        }}
      >
        {/* Font Size Controls */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
          
        {/* Theme Toggle Button */}
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

        {/* Notes Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={toggleNotesPanel}
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
            Notes
          </button>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <button 
            onClick={()=>{navigate('/home')}}
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
            Home
          </button>

          <button 
            onClick={()=>{navigate(-1)}}
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
            Exit Reader
          </button>
        </div>
      </div>
     
      <ReactReader
        url={`https://firebasestorage.googleapis.com/v0/b/ebooks5445.appspot.com/o/${params.url}?alt=media&token=${params.token}`}
        location={location}
        locationChanged={(loc) => setLocation(loc)}
        readerStyles={theme === 'dark' ? darkReaderTheme : lightReaderTheme}
        getRendition={(_rendition) => {
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
          bottom: drawerOpen ? (isMobile ? '130px' : '90px') : '0',
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