import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NoteContext from '../Context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            history.push("/login");
        }
    });

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }
    const submitChanges = (event) => {
        event.preventDefault();
        editNote(note._id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" minLength={5} required onChange={onChange} value={note.title} name="title" id="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" minLength={5} required onChange={onChange} value={note.description} name='description' id="edesc" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmai" className="form-label">Tag</label>
                                    <input type="text" className="form-control" onChange={onChange} value={note.tag} name="tag" id="eTag" aria-describedby="emailHelp" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={submitChanges} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddNote />
            <h2>Your Notes</h2>
            <div className="row my-3">
                <div className=" mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map(note => {
                    return (
                        <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes
