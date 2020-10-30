import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Message from './Message';

function App() {

  // State (React Hooks)
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{username: 'jao', text:'nice'}, {}, {}]);

  const [username, setUsername] = useState('');

  // console.log(input);
  // console.log(messages);

  // UseEffect (run code on condition)
  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []) //[]condition, if(blank) code runs once when component loads

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username: username, text: input}]);
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
        
        { // MESSAGES
          messages.map(message => (
            <Message username={message.username} text={message.text} />
          ))
        }
    </div>
  );
}

export default App;
