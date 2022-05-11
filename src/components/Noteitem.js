import React , {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const [disable, setDisable] = React.useState(false);
    return (<div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                
            
                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                    <i className={`fa${note.__v === 1 ? 'r' : 's'} fa-trash-alt mx-2`} disabled={disable} onClick={() =>{note.__v === 1 ? setDisable(true) && props.showAlert("Congratulation!! Your Article published Successfully", "success") : deleteNote(note._id) &&
                    props.showAlert("Deleted Successfully","success");}}></i>
                    <i className={`fa${note.__v === 1 ? 'r' : 's'} fa-edit`} disabled={disable} onClick={()=>{ note.__v === 1 ? setDisable(true)   : updateNote(note) }}></i>
                </div>
                <p className="card-text">{note.description}</p>

            </div>
        </div>
    </div>
    )
};

export default Noteitem;
