import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            parr:[1],
            currPage:1,
            movies:[],
            fav:[]
        }
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        const data=res.data
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data=res.data
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight=()=>{
        let temparr=[]
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i)
        }
        this.state.currPage==this.state.parr.length ?
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies): 
        this.setState({
            currPage:this.state.currPage+1
        },this.changeMovies)

    }
    handleLeft=()=>{
        this.setState({
            currPage:this.state.currPage-1
        },this.changeMovies)
    }
    handleClick=(value)=>{
        if(this.currPage!=value){
        this.setState({
            currPage:value
        },this.changeMovies)
    }
    }
    handleFavourites=(movieObj)=>{
        let oldData=JSON.parse(localStorage.getItem("movies-app")||"[]")
        if(this.state.fav.includes(movieObj.id)){
            oldData=oldData.filter((m)=>m.id!=movieObj.id)
        }else{
            oldData.push(movieObj)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            fav:[...temp]
        })
    }
    render() {
    return (
      <div>
        <h1 style={{display:"flex",justifyContent:"center"}}>Trending</h1>
        <div class="moviehead">
        {
            this.state.movies.map((movieobj)=>(
                <div class="card movieCard" >
                <img class="card-img-top movieImg" src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt="Card image cap"/>
                <div class="card-body movieBtn">
                    <h5 class="card-title CardTitle">{movieobj.original_title}</h5>
                    <a class="btn btn-primary" onClick={()=>this.handleFavourites(movieobj)}>{this.state.fav.includes(movieobj.id)?"Remove from Favourites":"Add to Favourites"}</a>
                </div>
                </div>
            )
            )
        }
        </div> 
        <nav aria-label="Page navigation example" className="pagin"> 
            <ul class="pagination">
                <li class="page-item" onClick={this.handleLeft}><a class="page-link" >Previous</a></li>
                {
                    this.state.parr.map((value)=>(
                        <li class="page-item" onClick={()=>this.handleClick(value)}><a class="page-link" >{value}</a></li>
                    ))
                }
                <li class="page-item" onClick={this.handleRight}><a class="page-link">Next</a></li>
            </ul>
        </nav>
      </div>
    )
  }
}
