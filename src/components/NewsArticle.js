import React,{ useState} from 'react'
import loading from './logo.jpg';


function ReadMore({children}, props) {
    const text = children;

    const [isShow, setIsShowLess] = useState(true)
    const result = isShow ? text.slice(0,115): text;

    function toggleIsShow(){
        setIsShowLess((!isShow));

    }

    return(
        <p>
            {result}
            <a rel="noreferrer" onClick={toggleIsShow} target="_blank" className={`btn btn-outline-${props.mode === 'dark'?'primary':'dark'}`}  style={{marginTop:"2 px"}}>{isShow ? 'Read More' : 'Read Less'}</a>
        </p>
    )

}
const NewsArticle = (props) => {
    const { note } = props;
    const mode = props.mode ;
    const togglemode = props.togglemode ;
    return (
        <div className='container col-md-5'>
             <div className="card my-3">
            <div className="card-body" style={{backgroundColor: props.mode === 'dark'?"black":"white"}}  >
            <span className={`position-absolute top-10  translate-middle badge rounded-pill bg-${props.mode === 'dark'?'danger':'info' } `}style={{right:"0"}} >Time News</span>
                <img width="240px"  height="180px" src={loading} className="card-img-top" alt="..." />
                <div className="card-body" style={{backgroundColor : props.mode === 'dark'?'black':'white' , color: props.mode === 'dark'?'white':'black'}} >
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text"><small className="text-muted">By {!(note.tag) ? "TimeNews" : (note.tag)} on  {new Date(note.date).toGMTString()}</small></p>
                    <p className="card-text">
                        <ReadMore mode={mode} togglemode={togglemode}>{note.description}
                        </ReadMore>
                        </p>
                       
                    </div>
                </div>
                </div>


            </div>

            )
            
}

export default NewsArticle
