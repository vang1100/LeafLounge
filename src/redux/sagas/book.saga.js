import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchBooks(action) {
  console.log('fetchBooks saga started', action);
 try {

    const booksResponse = yield axios.get(`/api/book/${action.payload}`)

    console.log('booksResponse:', booksResponse);


    yield put({ 
      type: 'SET_BOOKS', 
      payload: booksResponse.data
    });

    console.log('tesing out the details response', booksResponse);

  } catch(error){
    console.log('error in fetch movie details', error);

  }
}

function* booksSaga() {
yield takeEvery('FETCH_BOOKS', fetchBooks)
}

export default booksSaga;