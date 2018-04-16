import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from "./BooksAPI";
import { Link } from 'react-router-dom';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state= {
            books: [],
        }
    }

    handleSearchQueryChange = (e) => {
        if (e.target.value !== '') {
            BooksAPI.search(e.target.value)
                .then((searchedBooks) => {
                    let booksWithShelf = searchedBooks.map((book)=> {
                        // returns the .then() returns value when this promise resolves
                       return BooksAPI.get(book.id).then((bookWithShelf)=>{
                           return bookWithShelf;
                       })
                    });
                    Promise.all(booksWithShelf).then(values =>{
                        this.setState({
                            books: values,
                        });
                    })
                });
        } else{
            this.setState({
                books: [],
            });
        }
    };

    render() {
        const searchedBooksWithShelf = this.state.books.map((book)=>(
            <li key={book.id}>
                <Book title={book.title}
                      authors={book.authors}
                      imageLinks={book.imageLinks}
                      id={book.id}
                      shelf={book.shelf}
                      handleShelfChange={this.props.handleShelfChange}
                />
            </li>
        ));
        return(
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/'
                      className='close-search' >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                           placeholder="Search by title or author"
                           onChange={this.handleSearchQueryChange}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {searchedBooksWithShelf}
                </ol>
            </div>
        </div>
        )
    }
}

export default Search;