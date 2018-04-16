import React, { Component } from 'react';

class Book extends Component {
    render() {
        let authors = null;
        if (this.props.authors) {
            authors = this.props.authors.map((author)=>(
                <div key={author} className="book-authors">{author}</div>
            ));
        }

        let defaultValue = null;
        if (this.props.shelf) {
            defaultValue = ['currentlyReading', 'wantToRead', 'read', 'none']
                .filter((label) => (
                    label.replace(/\s/g, '').toLowerCase() === this.props.shelf.toLowerCase()
                ));
        }
       defaultValue = defaultValue ? defaultValue[0] : 'none';
        const backgroundImage = this.props.imageLinks ? this.props.imageLinks.thumbnail : 'none';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select defaultValue={defaultValue}
                                onChange={(e)=>this.props.handleShelfChange(e.target.value, this.props.id)}>
                           <option value="none" disabled>Move to...</option>
                           <option value="currentlyReading">Currently Reading</option>
                           <option value="wantToRead">Want to Read</option>
                           <option value="read">Read</option>
                           <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                {authors}
            </div>
        )
    }
}

export default Book;
