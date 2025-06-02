import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--color-neutral-100);
  padding: var(--space-3);
  margin-top: auto;
  border-top: 1px solid var(--color-neutral-200);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: var(--space-3);
  
  a {
    color: var(--color-neutral-700);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const FooterDiv = styled.div`
  display: flex;
  gap: var(--space-3);
  
  a {
    color: var(--color-neutral-700);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const Copyright = styled.div`
  color: var(--color-neutral-600);
  font-size: var(--font-size-sm);
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <a href="/imprint">Site Notice</a>
          <a href="/contact">How can we Help</a>
        </FooterLinks>
        <Copyright>|</Copyright>
        <FooterDiv>
        <a href="/copyright">© 2025 by MaSKo</a>
        </FooterDiv>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;