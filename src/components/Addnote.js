import React, { useState,useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context; 
    const [note, setNote] = useState({title: "", description: "", tag:""});
    
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag:""});
        props.showAlert("Submitted Successfully And Send To The NEWS Editor For Ckecking","success");

    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-5'>
            <div className="container mt-5">
                <h2 style={{  color: props.mode === 'dark'?'white':'black'}}>Add Article</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" style={{  color: props.mode === 'dark'?'white':'black'}}>Title Of Article</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"  value={note.title}  onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" style={{  color: props.mode === 'dark'?'white':'black'}}>Description</label>
                        <input type="text" className="form-control" id="description" name='description'  value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" style={{  color: props.mode === 'dark'?'white':'black'}}>Auther Name</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag}  onChange={onChange} />
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className={`btn btn-outline-${props.mode === 'dark'?'primary':'dark'}`} onClick={handleClick}>Add Article</button>
                </form>
            </div>
            
        </div>)
};
