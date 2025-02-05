import {React, useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import axios from 'axios';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);


  const [randomQuote, setRandomQuote] = useState({ text: '', quote_by: '' });

  useEffect(() => {
    fetchQuote();
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


 


  return (

    <div className="container">

     <p>"{randomQuote.text}" - {randomQuote.quote_by}</p>
{/* 
    {JSON.stringify(quoteList)} */}

    

      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
