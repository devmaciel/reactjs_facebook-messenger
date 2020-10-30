import { CardContent, Card, Typography } from '@material-ui/core'
import React from 'react'
import './Message.css';

function Message({message, username}) {

    // check currently user that input, to get diferent style in chat
    const isUser = username === message.username;

    return (
        <div className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
                <CardContent>
                    
                    <Typography 
                        color="white"
                        variant="h5"
                        component="h2"
                    >
                        {message.username}: {message.message}
                    </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default Message
