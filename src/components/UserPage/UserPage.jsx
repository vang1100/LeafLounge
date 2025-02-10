import {React, useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import axios from 'axios';
import BookList from '../BookList/BookList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const user_id = useSelector(state=> state.user.id);

  console.log('what is user_id', user_id);

  const [randomQuote, setRandomQuote] = useState({ text: '', quote_by: '' });

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetchQuote();
    
  }, []);

  useEffect(() => {
    fetchBook();
  }, []);

  
  // axios to get random quote
 
 const fetchQuote = () => {

  axios.get('/api/quote').then((response) => {
   // console.log("SUCCESS!!!", response);
    // TODO - append quotes to the dom
    const quotes = response.data;

    //to get random quote - generates a random index from the quotes array
    // Math.random() generates a number between 0 & 1
    // Multiplying by quotes.length scales it to the array's size.

    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // This selects a random quote using the random index.
    // It then updates the state with the text of the selected quote.

    setRandomQuote({
      text: quotes[randomIndex].text,
      quote_by: quotes[randomIndex].quote_by
    } );

    }).catch((error) => { 
    console.log(error);
    alert('Something went wrong.');
});


}


const fetchBook = () => {
  //console.log('get books!');

  axios.get(`/api/book/${user_id}`).then((response) => {
    console.log('what is the book data', response.data);
    const book = response.data;
    setBookList(book);
  }).catch((error) => {
    console.log('error in getting book route', error);
    alert('something went wrong in /book route');
  });
}


  return (

    <div className="container">


     <p align="center"><i>"{randomQuote.text}" - {randomQuote.quote_by}</i></p>


<p>Book stuff</p>
    
    {/* {JSON.stringify(bookList)} */}

    {bookList.map((book, index) => (
        <div key={index}>
          <img width ="100"src={book.book_img} alt={book.book_title} />
          <h4>{book.book_title}</h4>
          <p>Author: {book.author}</p>
         
        </div>
      ))}


    

      <h5>Welcome, {user.username}!</h5>
      <BookList/>
      <br/>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
