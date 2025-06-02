import React from 'react';
import styled, { css } from 'styled-components';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextareaContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-3);
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const TextareaLabel = styled.label`
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-1);
  color: var(--color-neutral-700);
`;

const StyledTextarea = styled.textarea<{ hasError: boolean }>`
  padding: var(--space-2);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-neutral-300);
  width: 100%;
  min-height: 120px;
  resize: vertical;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }
  
  ${props => props.hasError && css`
    border-color: var(--color-error);
    
    &:focus {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(224, 49, 49, 0.1);
    }
  `}
  
  &:disabled {
    background-color: var(--color-neutral-100);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-1);
  margin-bottom: 0;
`;

const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  fullWidth = false, 
  ...props 
}) => {
  const id = React.useId();
  
  return (
    <TextareaContainer fullWidth={fullWidth}>
      {label && <TextareaLabel htmlFor={id}>{label}</TextareaLabel>}
      <StyledTextarea 
        id={id}
        hasError={!!error} 
        aria-invalid={!!error}
        {...props} 
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextareaContainer>
  );
};

export default Textarea;