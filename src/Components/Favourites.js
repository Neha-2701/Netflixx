import React, { Component } from 'react'
import { movies } from './GetMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genre:[],
            currGen:"All genre",
            movies:[],
            currText:"" ,
            limit:5,
            currPage:1
        }
    }

    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
        let data=JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp=[]
        data.forEach((movieObj) => {
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift("All genre")
        this.setState({
            genre:[...temp],
            movies:[...data]
        })
    }
    handleGenre(genre){
        this.setState({
            currGen:genre
        })
    }
    sortPopularityDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDelete=(id)=>{
        let newarr = [];
        newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr))
    }

    render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let filterArr=[]
    if(this.state.currText==""){
        filterArr=this.state.movies;
    }
    else{
        filterArr=this.state.movies.filter((movieObj)=>{
            let title=movieObj.original_title.toLowerCase();
            return title.includes(this.state.currText)
        })
    }
    if(this.state.currGen!="All genre"){
        filterArr=this.state.movies.filter((movieObj)=>
            genreids[movieObj.genre_ids[0]]==this.state.currGen
        )
    }
    let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArr = filterArr.slice(si,ei);
    // console.log(filterArr)
    return (
      <div>
        <div class="row fav-list">
        <div class="col-lg-3 ">
            <ul className='list-group '>
                {
                this.state.genre.map((genre)=>(
                    this.state.currGen==genre?
                    <li className='list-group-item' style={{background:"blue",fontWeight:"bold",color:"white"}}>{genre}</li>:
                    <li className='list-group-item' onClick={()=>this.handleGenre(genre)}>{genre}</li>
                ))}
            </ul>
        </div>
        <div class="col-lg-9">
            <div class="row">
                <input class="input-group-text col"  type="text" placeholder="SEARCH" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}></input>
                <input class="input-group-text col" type="number" placeholder="ROW COUNT" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
            
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}/>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterArr.map((movieObj)=>(
                            <tr>
                            <th scope="row">
                            <img class="card-img-top fav-img" style={{paddingRight:"0.3remsetu"}}src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="Card image cap"/>{movieObj.title}</th>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td><button type="button" class="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                {
                    pagesarr.map((page)=>(
                        <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                    ))
                }
            </ul>
        </nav>
        </div>
      </div>
    )
  }
}
