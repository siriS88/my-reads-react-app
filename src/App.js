import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Search from './Search';
import MainPage from './MainPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books:[],

  };

  getAllBooks = () => {
    BooksAPI.getAll()
            .then((books) => {
              this.setState({books});
            })
  };

  componentDidMount() {
    this.getAllBooks();
  }

  handleShelfChange = (newShelfValue, bookId) => {
    console.log(newShelfValue);
    console.log(bookId);
    BooksAPI.update({id:bookId}, newShelfValue)
            .then(()=>{
              this.getAllBooks(); //TODO: just update the books in state with returned updated book
            })
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/search'
            render={()=>(
                <Search handleShelfChange={this.handleShelfChange}/>
            )}
        />
        <Route exact path='/'
            render={()=>(
                <MainPage books={this.state.books}
                          handleShelfChange={this.handleShelfChange}
                />)}
        />
      </div>
    )
  }
}

export default BooksApp
