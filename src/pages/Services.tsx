import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext'; // Auth-System importieren

const socket = io('http://localhost:3006'); // Neuer WebSocket-Port 3006

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--color-neutral-100);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ChatContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid var(--color-neutral-300);
  margin-top: 20px;
`;

const Input = styled.input`
  width: calc(100% - 120px);
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

const MicButton = styled.button`
  padding: 10px;
  background-color: var(--color-secondary);
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;

const Services: React.FC = () => {
  const { user } = useAuth(); // Benutzer aus dem Auth-System holen
  const [messages, setMessages] = useState<{ username: string; text?: string; audio?: string }[]>([]);
  const [message, setMessage] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    socket.on('chatMessage', (msg: { username: string; text?: string; audio?: string }) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && user) {
      socket.emit('chatMessage', { username: user.username, text: message });
      setMessage('');
    }
  };

  const startRecording = async () => {
    try {
      console.log('Starte Aufnahme...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log('Audio gespeichert:', audioUrl);

        socket.emit('chatMessage', { username: user?.username, audio: audioUrl });
      };

      recorder.start();
      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Fehler bei der Aufnahme:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <Layout>
      <Container>
        <h2>RTC | under Development</h2> {/* Neue Überschrift */}
        <ChatContainer>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}</strong>: {msg.text}
              {msg.audio && (
                <>
                  <audio controls src={msg.audio}></audio>
                  <p>Audio-URL: {msg.audio}</p>
                </>
              )}
            </div>
          ))}
        </ChatContainer>
        <div>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Schreibe eine Nachricht..."
          />
          <Button onClick={sendMessage} disabled={!user}>Senden</Button>
          {recording ? (
            <MicButton onClick={stopRecording}>⏹ Stop</MicButton>
          ) : (
            <MicButton onClick={startRecording}>🎤 Aufnahme</MicButton>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Services;
