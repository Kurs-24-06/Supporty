import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-3);
`;

const Spinner = styled.div<{ size: string; color: string }>`
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  border-style: solid;
  border-color: ${props => `${props.color} transparent ${props.color} transparent`};
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          width: 1.5rem;
          height: 1.5rem;
          border-width: 2px;
        `;
      case 'lg':
        return `
          width: 3rem;
          height: 3rem;
          border-width: 4px;
        `;
      default:
        return `
          width: 2rem;
          height: 2rem;
          border-width: 3px;
        `;
    }
  }}
`;

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md',
  color = 'var(--color-primary)'
}) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} />
    </SpinnerContainer>
  );
};

export default Loading;