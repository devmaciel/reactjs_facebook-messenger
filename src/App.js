import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Message from './Message';
import firebase from 'firebase';
import db from './firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core'; //wrap the icon as a button

function App() {

  // State (React Hooks)
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState('');

  // console.log(input);
  // console.log(messages);

  // UseEffect (run code on condition)
  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []) //[]condition, if(blank) code runs once when component loads

  // Firebase
  // onSnapshot -> get the database collection realtime
  // snasphot -> its all the data from that collection received from onSnapshot
  // snapshot.docs() is the docs from that collection
  // doc.data is the data inside that document
  // we can have more than one useEffect, that is a listenner from firestore
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
      })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //local timezone from the server
    });

    //local
    // setMessages([...messages, {username: username, text: input}]);
    setInput('');
  }

  return (
    <div className="App">
        <p>v1.0.0</p>
        <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt=""/>
        <h1>Facebook Messenger Clone</h1>
        <h2>Welcome, {username ? username : 'Unknown User'}</h2>

        <form className="app__form">
          <FormControl className="app__formControl">
            {/* <InputLabel>Enter a message...</InputLabel> */}
            <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />

            <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
            
          </FormControl>          
        </form>
        
        <FlipMove>
            <p>
              {
                messages.map(({id, message}) => (
                  <Message key={id} username={username} message={message} />
                ))
              }
            </p>
        </FlipMove>
    </div>
  );
}

export default App;
