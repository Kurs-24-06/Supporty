import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--color-neutral-100);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: var(--font-size-lg);
  color: var(--color-primary);
`;

const Text = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-neutral-700);
`;

const Support: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Heading>Support or anythink else</Heading>
        <Text>in Development</Text>
        <Text></Text>
      </Container>
    </Layout>
  );
};

export default Support;