import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--color-neutral-100);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: var(--font-size-lg);
  color: var(--color-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--color-neutral-300);
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--color-neutral-300);
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Nachricht erfolgreich gesendet!');
        setFormData({ name: '', email: '', message: '' }); // Formular leeren
      } else {
        const data = await response.json();
        alert(`Fehler: ${data.error}`);
      }
    } catch (error) {
      alert('Ein unerwarteter Fehler ist aufgetreten.');
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container>
        <Heading>Kontaktformular</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Nachricht"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Absenden</Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default Contact;
