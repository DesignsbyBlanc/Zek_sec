import React, { useState, useEffect } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";





const ChatBotCard = () => {
  const [data, setData] = useState('Loading...');
  const [error, setError] = useState(null);
  // Function to fetch or refresh data
  // const refreshData = () => {
  //   // Here, you would fetch new data from an API or perform some action
  //   // For demo purposes, we'll just update with the current time
  //   const newData = `Refreshed at ${new Date().toLocaleTimeString()}`;
  //   setData(newData);
  // };

  const refreshData = async () => {
    try {
      // Replace this URL with the actual endpoint you want to fetch data from
      const response = await fetch('http://192.168.1.152:8000/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.Chat); // Update state with the fetched data
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    }
  };
  
  useEffect(() => {
    // Refresh data immediately when the component mounts
    refreshData();

    // Set up interval to refresh data every minute (60000 milliseconds)
    const intervalId = setInterval(refreshData, 60000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ position: "relative", height: "24rem" }}>
  <MainContainer>
    <ChatContainer>
      <MessageList>
        <Message
          model={{
            message: ` ${data} `,
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



