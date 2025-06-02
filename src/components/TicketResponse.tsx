import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

const ResponseContainer = styled.div`
  margin-top: var(--space-4);
  border-top: 1px solid var(--color-neutral-200);
  padding-top: var(--space-4);
`;

const ResponseTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: var(--space-2);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-3);
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
  }
`;

interface TicketResponseProps {
  onSubmit: (response: string) => void;
}

const TicketResponse: React.FC<TicketResponseProps> = ({ onSubmit }) => {
  const [response, setResponse] = React.useState('');
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(response);
      setResponse('');
    }
  };

  return (
    <ResponseContainer>
      <h3>{t('ticketResponse')}</h3>
      <ResponseTextarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder={t('ticketResponse')}
      />
      <Button onClick={handleSubmit}>{t('save')}</Button>
    </ResponseContainer>
  );
};

export default TicketResponse;