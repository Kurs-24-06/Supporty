import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const CardContainer = styled.div<{ variant: string; padding: string }>`
  border-radius: var(--radius-md);
  overflow: hidden;
  
  ${({ variant }) => {
    switch (variant) {
      case 'outlined':
        return css`
          border: 1px solid var(--color-neutral-200);
        `;
      case 'elevated':
        return css`
          box-shadow: var(--shadow-md);
        `;
      default:
        return css`
          background-color: white;
          border: 1px solid var(--color-neutral-200);
          box-shadow: var(--shadow-sm);
        `;
    }
  }}
`;

const CardHeader = styled.div`
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-neutral-200);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: var(--color-neutral-900);
  font-size: var(--font-size-lg);
`;

const CardBody = styled.div<{ padding: string }>`
  ${({ padding }) => {
    switch (padding) {
      case 'none':
        return css`padding: 0;`;
      case 'small':
        return css`padding: var(--space-2);`;
      case 'large':
        return css`padding: var(--space-4);`;
      default:
        return css`padding: var(--space-3);`;
    }
  }}
`;

const CardFooter = styled.div`
  padding: var(--space-3);
  background-color: var(--color-neutral-50);
  border-top: 1px solid var(--color-neutral-200);
`;

const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  variant = 'default',
  padding = 'medium',
}) => {
  return (
    <CardContainer variant={variant} padding={padding}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardBody padding={padding}>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;