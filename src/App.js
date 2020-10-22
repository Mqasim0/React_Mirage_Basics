import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [books, setBooks] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const fetchBooks = async()=>{
    const res = await fetch('/api/books')
    const data = await res.json()
    setBooks(data)
  }

  useEffect(() => {
    setInterval(() => {
      fetchBooks()
    },2000)
  
  },[])

  const submitHandler = async(e) => {
   e.preventDefault();
  

   const res = fetch('/api/add', {
     method:"POST",
     body: JSON.stringify({title, author})
   })
   const data = res.json
   
  }
  return (
    <div className="App">
      {!books.length ? <h1>Loading...</h1> :   <ul><h2>Available books</h2>
         {books.map((book, index) => {
           return (
          <div key={index}>
           <li><b>Book Name : </b>{book.title} <b>Author name :</b> {book.author}</li>
           
           </div>
           ) 
         })}
        </ul>}
       <div className="add_user">
         <form onSubmit={submitHandler}>
         <label>Title : &nbsp; &nbsp; &nbsp; &nbsp;
         <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
         </label>
         <br/>
         <br/>
         <label>Author : &nbsp; &nbsp;
         <input type="text" value={author} onChange={(e) => {setAuthor(e.target.value)}}  />
         </label>
         <br/>
         <br/>
         <button type="submit">Add Books</button>
        </form>
      </div>

       
       
    </div>
  );
}

export default App;
