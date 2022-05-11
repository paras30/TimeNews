import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Notes from './components/Notes';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Article from './components/Article';
import About from './components/About';

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

  const [mode, setMode] = useState('light');


  const togglemode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';

    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <LoadingBar
            color='#f11946'
            height="5px"
            progress={progress}
          />
          <Navbar mode={mode} togglemode={togglemode} />

          <div className='mt-5'>
          <Alert alert={alert}/></div>


          <Switch>
            <Route exact path="/"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="general" country="in" category="general" pagesize={6} /></Route>
            <Route exact path="/about"><About mode={mode} togglemode={togglemode}  /></Route>
            <Route exact path="/business"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="business" country="in" category="business" pagesize={6} /></Route>
            <Route exact path="/entertainment"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="entertainment" country="in" category="entertainment" pagesize={6} /></Route>
            <Route exact path="/health"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="health" country="in" category="health" pagesize={6} /></Route>
            <Route exact path="/science"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="science" country="in" category="science" pagesize={6} /></Route>
            <Route exact path="/sports"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="sports" country="in" category="sports" pagesize={6} /></Route>
            <Route exact path="/technology"><News mode={mode} togglemode={togglemode} setProgress={setProgress} apikey={apikey} key="technology" country="in" category="technology" pagesize={6} /></Route>
            <Route exact path="/article"><Notes mode={mode} togglemode={togglemode} setProgress={setProgress} showAlert={showAlert}/></Route>
            <Route exact path="/article_news"><Article  mode={mode} togglemode={togglemode}  setProgress={setProgress} showAlert={showAlert} pagesize={6}/></Route>
            <Route exact path="/login"><Login mode={mode} togglemode={togglemode} setProgress={setProgress} showAlert={showAlert}/></Route>
            <Route exact path="/signup"><Signup mode={mode} togglemode={togglemode} setProgress={setProgress}  showAlert={showAlert}/></Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  )
}

export default App
