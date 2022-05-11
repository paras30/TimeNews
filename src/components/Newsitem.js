import React from 'react';
import loading from './logo.jpg';

const Newsitem = (props) => {
    
        let { title, description, imageUrl, newsUrl, author, date , source} = props;
        return (
            <div className="my-3" >
                <div className="card" style={{backgroundColor: props.mode === 'dark'?"black":"white"}}  >
                <span className={`position-absolute top-10  translate-middle badge rounded-pill bg-${props.mode === 'dark'?'danger':'info' } `}style={{right:"0"}} >{source}</span>
                    <img width="240px"  height="180px" src={!imageUrl ? loading : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body" style={{backgroundColor : props.mode === 'dark'?'black':'white' , color: props.mode === 'dark'?'white':'black'}} >
                        <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}....</p>
                            <p className="card-text"><small className="text-muted">By {!author ? "TimeNews" : author} on  {new Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className={`btn btn-outline-${props.mode === 'dark'?'primary':'dark'}`}>Read More</a>
                        </div>
                    </div>


                </div>

                )
                
    }


export default Newsitem
