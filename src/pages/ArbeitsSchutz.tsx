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
  margin-bottom: 20px;
`;

const SubHeading = styled.h2`
  font-size: var(--font-size-md);
  color: var(--color-secondary);
  margin-top: 20px;
`;

const Text = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-neutral-700);
`;

const Image = styled.img`
  width: 100%;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const ArbeitsSchutz: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Heading>Arbeitsschutz</Heading>
        <Text>Arbeitsschutz umfasst alle Maßnahmen, die dazu dienen, die Sicherheit und Gesundheit der Mitarbeiter am Arbeitsplatz zu gewährleisten. Dazu gehören präventive Sicherheitsmaßnahmen, Notfallpläne und die kontinuierliche Verbesserung der Arbeitsbedingungen.</Text>
        <Image src="/images/arbeitsschutz.jpg" alt="Arbeitsschutzmaßnahmen" />

        <SubHeading>Fluchtwege & Evakuierungspläne</SubHeading>
        <Text>In Notfallsituationen ist eine schnelle Evakuierung entscheidend. Fluchtwege müssen regelmäßig überprüft und frei gehalten werden. Notfallübungen helfen Mitarbeitern, sich mit den Evakuierungsplänen vertraut zu machen und im Ernstfall richtig zu reagieren.</Text>
        <Image src="/images/fluchtwege.jpg" alt="Fluchtwegeplan" />

        <SubHeading>Betriebsanweisungen</SubHeading>
        <Text>Betriebsanweisungen legen fest, wie Mitarbeiter sicher mit Maschinen umgehen, Gefahrstoffe handhaben und sich in Notfällen verhalten. Diese Anweisungen sollten gut sichtbar ausgehängt und regelmäßig aktualisiert werden.</Text>
        <Image src="/images/betriebsanweisung.jpg" alt="Betriebsanweisungen" />

        <SubHeading>Persönliche Schutzausrüstung (PSA)</SubHeading>
        <Text>Die Persönliche Schutzausrüstung (PSA) umfasst Helme, Schutzbrillen, Handschuhe und andere Ausrüstung, die Arbeitnehmer vor Gefahren schützt. Arbeitgeber sind verpflichtet, PSA bereitzustellen und deren Nutzung zu schulen.</Text>
        <Image src="/images/psa.jpg" alt="Persönliche Schutzausrüstung" />

        <SubHeading>Gefährdungsbeurteilungen</SubHeading>
        <Text>Die regelmäßige Durchführung von Gefährdungsbeurteilungen stellt sicher, dass Risiken frühzeitig erkannt und minimiert werden. Dabei werden physische, chemische und psychische Belastungen am Arbeitsplatz analysiert.</Text>
        <Image src="/images/gefaehrdungsbeurteilung.jpg" alt="Gefährdungsbeurteilung" />

        <SubHeading>Erste Hilfe & Notfallmanagement</SubHeading>
        <Text>Jeder Betrieb sollte über gut ausgestattete Erste-Hilfe-Kästen und geschulte Ersthelfer verfügen. Ein klar definierter Notfallplan mit Ansprechpartnern und Abläufen ist essenziell, um im Ernstfall schnell handeln zu können.</Text>
        <Image src="/images/erste-hilfe.jpg" alt="Erste-Hilfe Maßnahmen" />
      </Container>
    </Layout>
  );
};

export default ArbeitsSchutz;

