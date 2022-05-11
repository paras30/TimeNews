import { useState } from "react";
import NoteContext from "./noteContext";




const NoteState = (props) => {
    const host = "http://localhost:5000" 
    const notesInitial = [ ]
    const [notes, setNotes] = useState(notesInitial);  
    
    // Get all news
    const getNews = async () =>{
      // Todo api call
        // Api call
    const response = await fetch(`${host}/api/notes/fetchallnews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Get all notes
  const getNotes = async () =>{
    // Todo api call
      // Api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
  });
  const json = await response.json()
  console.log(json)
  setNotes(json)
}


    // Add note
    const addNote = async (title, description, tag) =>{
        // Todo api call
        // Api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // delete Note
    const deleteNote = async (id) => {
        // Api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json =  response.json();
      console.log(json)
        console.log("deleteing note ");
        // Todo api call
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)

    }


    // Edit a note
    const editNote = async (id, title, description, tag) =>{
      // Api call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json =  response.json();
      console.log(json);
    

      let newNotes = JSON.parse(JSON.stringify(notes))
      //Logic to edit in client side
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
        
      }
      setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{notes , addNote , deleteNote, editNote, getNotes, getNews}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;