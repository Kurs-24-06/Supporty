import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

type AlertVariant = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  variant: AlertVariant;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const AlertContainer = styled.div<{ variant: AlertVariant; isVisible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 400px;
  box-shadow: var(--shadow-md);
  transform: translateX(${props => props.isVisible ? '0' : '120%'});
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition: all var(--transition-normal);
  z-index: 1000;
  
  ${({ variant }) => {
    switch (variant) {
      case 'success':
        return css`
          background-color: var(--color-success-light);
          color: var(--color-success-dark);
          border-left: 4px solid var(--color-success);
        `;
      case 'info':
        return css`
          background-color: var(--color-primary-light);
          color: var(--color-primary-dark);
          border-left: 4px solid var(--color-primary);
        `;
      case 'warning':
        return css`
          background-color: var(--color-warning-light);
          color: var(--color-warning-dark);
          border-left: 4px solid var(--color-warning);
        `;
      case 'error':
        return css`
          background-color: var(--color-error-light);
          color: var(--color-error-dark);
          border-left: 4px solid var(--color-error);
        `;
      default:
        return '';
    }
  }}
`;

const IconContainer = styled.div`
  margin-right: var(--space-2);
`;

const Message = styled.p`
  margin: 0;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: var(--space-1);
  margin-left: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const getIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'info':
      return <Info size={20} />;
    case 'warning':
      return <AlertTriangle size={20} />;
    case 'error':
      return <AlertCircle size={20} />;
    default:
      return null;
  }
};

const Alert: React.FC<AlertProps> = ({ 
  variant, 
  message, 
  isVisible, 
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, autoClose, autoCloseTime]);
  
  return (
    <AlertContainer variant={variant} isVisible={isVisible}>
      <IconContainer>{getIcon(variant)}</IconContainer>
      <Message>{message}</Message>
      <CloseButton onClick={onClose} aria-label="Close">
        <X size={16} />
      </CloseButton>
    </AlertContainer>
  );
};

export default Alert;