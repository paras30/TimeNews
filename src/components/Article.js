import React , { useContext, useEffect,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NewsArticle from './NewsArticle';



  



const Article = (props) => {
    props.setProgress(10);
    const context = useContext(noteContext);
    const { notes, getNews} = context;
    props.setProgress(50);
    useEffect(() => {
                 getNews();
        
        // eslint-disable-next-line 
    }, []);
    props.setProgress(90);
    const mode = props.mode ;
    const togglemode = props.togglemode ;
    props.setProgress(100); 
    return (
        <>
            



            <div className='container ' >
            
            <h1 className="text-center" style={{color: props.mode === 'dark'?'white':'black'}}>TimeNews - New Article </h1>
                {notes.length===0 && <div className='container'>No! Notes to display.</div>}
                {notes.map((note) => {
                    return <NewsArticle key={note._id}  note={note} showAlert={props.showAlert}  mode={mode} togglemode={togglemode}  />
                })}
               
            </div>
        </>
    )
     
   
};


export default Article