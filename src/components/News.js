import React, { useEffect , useState } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

const News  = (props) => {
    
    const [articles, setArticles] = useState([])
    const [page, setpage] = useState(0)
    const [totalResult, settotalResult] = useState(0)

    
    
    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&${props.pagesize}`;  
        let data = await fetch(url);
        props.setProgress(40);
        let parceData = await data.json()
        props.setProgress(70);
        setArticles(parceData.articles)
        settotalResult(parceData.totalResults)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line 
    }, [])


   /* const handlePervClick = async () => {
        setpage(page-1);
        updateNews();

    }
    const handleNextClick = async () => {
        setpage(page + 1);
        updateNews();
    }
    */
    const fetchMoreData = async () => {
       setpage(page + 1);
       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&${props.pagesize}`;
       let data = await fetch(url);
       let parceData = await data.json()
       setArticles(articles.concat(parceData.articles))
       settotalResult(parceData.totalResults)
    }

    const mode = props.mode ;
    const togglemode = props.togglemode ;
    
        return (
            <>
                <h1 className="text-center" style={{ margin: "95px 0" , color: props.mode === 'dark'?'white':'black'}}>TimeNews - daily news update</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner/>}
                >
                    
                    <div className="container ">
                    <div className="row">

                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem mode={mode} togglemode={togglemode} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>

               {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePervClick}>&larr; Pervious</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>*/}
            </>
        )
    
}

News.defaultProps = {
    country: "in",
    pagesize: 6,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}

export default News
