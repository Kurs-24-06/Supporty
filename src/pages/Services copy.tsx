import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Layout from '../components/Layout';

// Verbindung zum WebSocket-Server
const socket = io('http://localhost:3006');

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--color-neutral-100);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: var(--font-size-lg);
  color: var(--color-primary);
`;

const ChatContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid var(--color-neutral-300);
  margin-top: 20px;
`;

const Input = styled.input`
  width: calc(100% - 80px);
  padding: 10px;
  margin-top: 10px;
  border: 1px solid var(--color-neutral-400);
`;

const Button = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
`;

const Services: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chatMessage', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <Layout>
      <Container>
        <Heading>Realtime Chat</Heading>
        <ChatContainer>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </ChatContainer>
        <div>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Schreibe eine Nachricht..."
          />
          <Button onClick={sendMessage}>Senden</Button>
        </div>
      </Container>
    </Layout>
  );
};

export default Services;
