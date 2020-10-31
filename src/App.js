import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Message from './Message';
import firebase from 'firebase';
import db from './firebase';
import FlipMove from 'react-flip-move';

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
        <h1>Hello, Messenger</h1>
        <h2>Welcome {username}</h2>

        <form>
          <FormControl>
            <InputLabel>Enter a message...</InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} />
            <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>
          </FormControl>          
        </form>
        
        <FlipMove>
          { // MESSAGES
            messages.map(({id, message}) => (
              <Message key={id} username={username} message={message} />
            ))
          }
        </FlipMove>
    </div>
  );
}

export default App;
