import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://stark-cove-74055.herokuapp.com";

  const [notes, setNotes] = useState([]);

  //Get All Notes
  const getNotes = async () => {
    //api call
    const url = `${host}/api/notes/getallnotes`;
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
    const parsedData = await response.json();
    getUser();
    //Client
    setNotes(parsedData);
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //api call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({ title, description, tag }),
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
    const note = await response.json();
    //client 
    setNotes(notes.concat(note));
  }

  //Delete A Note
  const deleteNote = async (id) => {
    //Api Call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = response.json();
      console.log(json);
    //Client
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes);
  }

  //Edit Update a Note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const updatedNote = { title, description, tag };
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedNote),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);
    //client
    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newnotes.length; i++) {
      if (newnotes[i]._id === id) {
        newnotes[i].title = title;
        newnotes[i].description = description;
        newnotes[i].tag = tag;
        break;
      }
    }
    setNotes(newnotes);
  }

  //Getting user data
  const [name, setName] = useState(null);
  const getUser = async()=>{
    const url = `${host}/api/auth/getuser`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json.name);
    setName(json.name);

  }
  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote ,name}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;