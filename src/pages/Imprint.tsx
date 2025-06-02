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

const Imprint: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Heading>Impressum</Heading>
        <Text>MASKO - Markus S. Kornmann</Text>
        <Text>Roonstraße 72, 46049 Oberhausen</Text>
        <Text>E-Mail: info@markuskornmann.de</Text>
        <Text>Telefon: +49 176 43716700</Text>
        <Text></Text>
        <Text>GitHub: MarkusKornmann@githib.com</Text>
      </Container>
    </Layout>
  );
};

export default Imprint;