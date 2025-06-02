import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';

const ToggleButton = styled.button`
  background: none;
  border: 1px solid var(--color-neutral-300);
  color: inherit;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  
  &:hover {
    background-color: var(--color-neutral-100);
  }
`;

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <ToggleButton onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}>
      {language.toUpperCase()}
    </ToggleButton>
  );
};

export default LanguageToggle;