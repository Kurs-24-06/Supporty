// migration.js
// Dieses Skript überträgt alle Daten vom LocalStorage in die MySQL-Datenbank

require('dotenv').config();
const mysql = require('mysql2/promise');
const readline = require('readline');

// Datenbankverbindung herstellen
const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '2025',
      database: process.env.DB_NAME || 'supportydb',
    });
    console.log('Mit der Datenbank verbunden');
    return connection;
  } catch (error) {
    console.error('Fehler bei der Datenbankverbindung:', error);
    process.exit(1);
  }
};

// Eingabe vom Benutzer abfragen
const askQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// LocalStorage-Daten konvertieren
const loadLocalStorageData = (localStorageJson) => {
  try {
    // Überprüfen, ob es sich um einen gültigen JSON-String handelt
    const data = JSON.parse(localStorageJson);
    return data;
  } catch (error) {
    console.error('Fehler beim Parsen der LocalStorage-Daten:', error);
    return null;
  }
};

// Tickets in die Datenbank einfügen
const migrateTickets = async (connection, tickets) => {
  if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
    console.log('Keine Tickets zum Migrieren gefunden.');
    return;
  }

  try {
    console.log(`Migriere ${tickets.length} Tickets...`);
    
    // Bestehende Tabelle zuerst leeren
    const [clearResult] = await connection.execute('TRUNCATE TABLE tickets');
    
    for (const ticket of tickets) {
      // Datumsformat anpassen
      const createdAt = new Date(ticket.createdAt || ticket.created_at).toISOString().slice(0, 19).replace('T', ' ');
      
      // Ticket in die Datenbank einfügen
      await connection.execute(
        'INSERT INTO tickets (id, title, description, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?)',
        [
          ticket.id, 
          ticket.title, 
          ticket.description, 
          ticket.status || 'open',
          createdAt,
          ticket.createdBy || ticket.created_by || 'unknown'
        ]
      );
    }
    
    console.log('Ticket-Migration abgeschlossen!');
  } catch (error) {
    console.error('Fehler bei der Ticket-Migration:', error);
  }
};

// Knowledge Base-Einträge in die Datenbank einfügen
const migrateKnowledgeBase = async (connection, knowledgeBaseItems) => {
  if (!knowledgeBaseItems || !Array.isArray(knowledgeBaseItems) || knowledgeBaseItems.length === 0) {
    console.log('Keine Knowledge-Base-Einträge zum Migrieren gefunden.');
    return;
  }

  try {
    console.log(`Migriere ${knowledgeBaseItems.length} Knowledge-Base-Einträge...`);
    
    // Bestehende Tabelle zuerst leeren
    const [clearResult] = await connection.execute('TRUNCATE TABLE knowledge_base');
    
    for (const item of knowledgeBaseItems) {
      // Datumsformat anpassen oder aktuelles Datum verwenden
      const createdAt = item.created_at 
        ? new Date(item.created_at).toISOString().slice(0, 19).replace('T', ' ')
        : new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      // Eintrag in die Datenbank einfügen
      await connection.execute(
        'INSERT INTO knowledge_base (id, title, solution, created_at, created_by) VALUES (?, ?, ?, ?, ?)',
        [
          item.id, 
          item.title, 
          item.solution, 
          createdAt,
          item.created_by || 'unknown'
        ]
      );
    }
    
    console.log('Knowledge-Base-Migration abgeschlossen!');
  } catch (error) {
    console.error('Fehler bei der Knowledge-Base-Migration:', error);
  }
};

// Hauptfunktion zur Migration
const migrateData = async () => {
  // Verbindung zur Datenbank herstellen
  const connection = await createConnection();
  
  // Ticket-Daten aus LocalStorage abfragen
  console.log('\n=== TICKET-MIGRATION ===');
  const ticketsJson = await askQuestion('Bitte füge den LocalStorage-JSON-String für "tickets" ein (oder drücke Enter für keine Tickets): ');
  
  if (ticketsJson.trim()) {
    const tickets = loadLocalStorageData(ticketsJson);
    if (tickets) {
      await migrateTickets(connection, tickets);
    }
  }
  
  // Knowledge-Base-Daten aus LocalStorage abfragen
  console.log('\n=== KNOWLEDGE-BASE-MIGRATION ===');
  const knowledgeJson = await askQuestion('Bitte füge den LocalStorage-JSON-String für "knowledgeBase" ein (oder drücke Enter für keine Knowledge-Base): ');
  
  if (knowledgeJson.trim()) {
    const knowledgeBase = loadLocalStorageData(knowledgeJson);
    if (knowledgeBase) {
      await migrateKnowledgeBase(connection, knowledgeBase);
    }
  }
  
  console.log('\nMigration abgeschlossen!');
  
  // Verbindung schließen
  await connection.end();
  process.exit(0);
};

// Migration starten
migrateData().catch(error => {
  console.error('Fehler bei der Migration:', error);
  process.exit(1);
});