import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  border: 1px solid transparent;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ isLoading }) => isLoading && css`
    opacity: 0.7;
    cursor: not-allowed;
  `}
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          font-size: var(--font-size-xs);
          padding: var(--space-1) var(--space-2);
          height: 2rem;
        `;
      case 'lg':
        return css`
          font-size: var(--font-size-md);
          padding: var(--space-2) var(--space-4);
          height: 3rem;
        `;
      default:
        return css`
          font-size: var(--font-size-sm);
          padding: var(--space-2) var(--space-3);
          height: 2.5rem;
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: var(--color-primary);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-primary-dark);
          }
        `;
      case 'secondary':
        return css`
          background-color: var(--color-secondary);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-secondary-dark);
          }
        `;
      case 'success':
        return css`
          background-color: var(--color-success);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-success-dark);
          }
        `;
      case 'danger':
        return css`
          background-color: var(--color-error);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-error-dark);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: var(--color-primary);
          border-color: var(--color-primary);
          &:hover:not(:disabled) {
            background-color: var(--color-primary-light);
            color: white;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: var(--color-neutral-700);
          &:hover:not(:disabled) {
            background-color: var(--color-neutral-100);
          }
        `;
      default:
        return '';
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${props => props.children ? 'var(--space-2)' : '0'};
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      isLoading={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;