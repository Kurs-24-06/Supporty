import React from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const InputContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-3);
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const InputLabel = styled.label`
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-1);
  color: var(--color-neutral-700);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError: boolean; hasIcon: boolean }>`
  padding: var(--space-2);
  height: 2.5rem;
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-neutral-300);
  width: 100%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  
  ${props => props.hasIcon && css`
    padding-left: 2.5rem;
  `}
  
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

const IconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-500);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const ErrorMessage = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-1);
  margin-bottom: 0;
`;

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  fullWidth = false, 
  icon,
  ...props 
}) => {
  const id = React.useId();
  
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput 
          id={id}
          hasError={!!error} 
          hasIcon={!!icon}
          aria-invalid={!!error}
          {...props} 
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;