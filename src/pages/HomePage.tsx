import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-6) var(--space-3);
`;

const WelcomeImage = styled.img`
  max-width: 600px;
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
`;

const WelcomeTitle = styled.h1`
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
`;

const WelcomeText = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text);
  max-width: 600px;
  line-height: 1.6;
`;

const WillkommenText = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text);
  max-width: 600px;
  line-height: 1.6;
`;

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <HomeContainer>
        <WelcomeImage src="/images/team.jpg" alt="Welcome to Supporty" /> {/* Lokales Bild verwenden */}
        <WelcomeTitle>
          {user ? `Welcome back, ${user.username}!` : 'Welcome to Supporty'}
        </WelcomeTitle>
        <WelcomeText>
          Your comprehensive solution for ticket and knowledge management. 
          Streamline your support process, manage tickets efficiently, and 
          build a powerful knowledge base for your team.
        </WelcomeText>
         
        <WillkommenText>
          Ihre umfassende Lösung für Ticket- und Wissensmanagement.
          Optimieren Sie Ihren Supportprozess, verwalten Sie Tickets effizient und
          bauen Sie eine leistungsstarke Wissensdatenbank für Ihr Team auf.
        </WillkommenText>
      </HomeContainer>
    </Layout>
  );
};

export default HomePage;
