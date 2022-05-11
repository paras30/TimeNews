import React , { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { Addnote } from './Addnote';
import Noteitem from './Noteitem';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



  



const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
                 getNotes();
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line 
    }, []);
    const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag:"default"});
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id, etitle:currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
       
    }
    const ref = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        e.preventDefault();
        handleClose();
        props.showAlert("Updated Successfully And Send To The NEWS Editor For Ckecking","success");
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const mode = props.mode ;
    const togglemode = props.togglemode ;


    return (
        <>
            <Addnote mode={mode} togglemode={togglemode} showAlert={props.showAlert} />

            <Button ref={ref} variant="primary d-none" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3" >
                            <label htmlFor="title" className="form-label" >Title Of Article</label>
                            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="description" className="form-control" id="edescription" name='edescription' value={note.edescription}  onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Auther Name</label>
                            <input type="text" className="form-control" id="etag" name='etag' value={note.etag}  onChange={onChange} />
                        </div>
                    </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.etitle.length<5 || note.edescription.length<5} variant="primary" onClick={handleClick}>
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>




            <div className='container row my-3' >
            
                <h2 style={{  color: props.mode === 'dark'?'white':'black'}}>Your Atrticles</h2>
                {notes.length===0 && <div className='container'>No! Notes to display.</div>}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}

            </div>
        </>
    )
};


export default Notes;