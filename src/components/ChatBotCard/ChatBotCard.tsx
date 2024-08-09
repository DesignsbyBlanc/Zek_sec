import React from 'react'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";





const ChatBotCard = () => {
  return (
    <div style={{ position: "relative", height: "24rem" }}>
  <MainContainer>
    <ChatContainer>
      <MessageList>
        <Message
          model={{
            message: `The video shows a basketball match between two teams. It's difficult to determine who is playing but the score is shown at the bottom of the screen.

0:00 - The score is 88 to 77 
0:21 - The score is 91 to 79
0:32 - The score is 100 to 89`,
            sentTime: "just now",
            sender: "Joe",
          }}
        />
      </MessageList>
      <MessageInput placeholder="Type message here" />
    </ChatContainer>
  </MainContainer>
</div>
  )
}

export default ChatBotCard



