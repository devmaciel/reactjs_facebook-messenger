import { CardContent, Card, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react' // component flip-move()
import './Message.css';

const Message = forwardRef(({message, username}, ref) => {

    // check currently user that input, to get diferent style in chat
    // const isUser = username === message.username;

    const isUser = username === message.username;

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
                <CardContent>
                    
                    <Typography 
                        className="typography"
                        color="white"
                        variant="h6"
                        component="h2"
                    >
                       <p className="typography__p">{!isUser && `${message.username || 'Unknown User'}:`}</p> <p>{message.message}</p> 
                       {/* {!isUser ? <p>{message.username || 'Unknown User'}</p> : <p>{message.message}</p>} */}
                    </Typography>

                </CardContent>
            </Card>
        </div>
    )   
})

export default Message
