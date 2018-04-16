import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class MainPage extends Component {
    render() {
        const bookshelves = ['Currently Reading', 'Want to Read', 'Read'].map(
            title=>(
                <Bookshelf key={title}
                           title={title}
                           books={this.props.books}
                           handleShelfChange={this.props.handleShelfChange}/>
            ));
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {bookshelves}
                </div>
                <div className="open-search">
                    <Link to='/search'
                          className='close-search' >
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }

}
export default MainPage;
