import React,{useContext,useState} from 'react'
import NoteContext from '../Context/notes/noteContext'

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title:"",description:"",tag:""});

    const submitNote = (event)=>{
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""});
    }
    const onChange = (e) =>{
        setnote({...note,[e.target.name]: e.target.value});
    }
    return (
        <>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={note.title} minLength={5} required onChange={onChange} id="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" name='description' value={note.description}  minLength={5} required onChange={onChange} id="desc" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmai" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="tag" value={note.tag}onChange={onChange} id="exampleInputTag" aria-describedby="emailHelp" />
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5} type="button" onClick={submitNote} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
