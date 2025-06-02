// src/services/api.ts
import axios from 'axios';

// API Basisadresse - kann in eine Konfigurationsdatei verschoben werden
const API_URL = 'http://localhost:5100/api';

// Ticket Interface
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  created_at: string;
  created_by: string;
}

// Knowledge Base Item Interface
export interface KnowledgeItem {
  id: number;
  title: string;
  solution: string;
  created_at: string;
  created_by: string;
}

// Tickets API Service
export const TicketsService = {
  // Alle Tickets abrufen
  getAllTickets: async () => {
    const response = await axios.get<Ticket[]>(`${API_URL}/tickets`);
    return response.data;
  },
  
  // Tickets eines bestimmten Benutzers abrufen
  getUserTickets: async (username: string) => {
    const response = await axios.get<Ticket[]>(`${API_URL}/tickets/user/${username}`);
    return response.data;
  },
  
  // Ticket erstellen
  createTicket: async (ticket: { title: string; description: string; createdBy: string }) => {
    const response = await axios.post<Ticket>(`${API_URL}/tickets`, ticket);
    return response.data;
  },
  
  // Ticket aktualisieren
  updateTicket: async (id: number, updates: { title?: string; description?: string; status?: string }) => {
    const response = await axios.put<Ticket>(`${API_URL}/tickets/${id}`, updates);
    return response.data;
  },
  
  // Ticket löschen
  deleteTicket: async (id: number) => {
    const response = await axios.delete(`${API_URL}/tickets/${id}`);
    return response.data;
  },
  
  // Tickets durchsuchen
  searchTickets: async (query: string) => {
    const response = await axios.get<Ticket[]>(`${API_URL}/tickets/search/${query}`);
    return response.data;
  }
};

// Knowledge Base API Service
export const KnowledgeService = {
  // Alle Einträge abrufen
  getAllItems: async () => {
    const response = await axios.get<KnowledgeItem[]>(`${API_URL}/knowledge`);
    return response.data;
  },
  
  // Knowledgebase durchsuchen
  searchKnowledge: async (query: string) => {
    const response = await axios.get<KnowledgeItem[]>(`${API_URL}/knowledge/search/${query}`);
    return response.data;
  },
  
  // Neuen Eintrag erstellen
  createKnowledgeItem: async (item: { title: string; solution: string; createdBy: string }) => {
    const response = await axios.post<KnowledgeItem>(`${API_URL}/knowledge`, item);
    return response.data;
  }
};

// Fallback-Service für Übergangsphase (localStorage > MySQL Migration)
export const LocalStorageService = {
  // Tickets aus localStorage abrufen
  getTicketsFromStorage: () => {
    const storedTickets = localStorage.getItem('tickets');
    if (!storedTickets) return [];
    try {
      return JSON.parse(storedTickets) as Ticket[];
    } catch (err) {
      console.error('Error parsing stored tickets:', err);
      return [];
    }
  },
  
  // Knowledge Base aus localStorage abrufen
  getKnowledgeFromStorage: () => {
    const storedKnowledge = localStorage.getItem('knowledgeBase');
    if (!storedKnowledge) return [];
    try {
      return JSON.parse(storedKnowledge) as KnowledgeItem[];
    } catch (err) {
      console.error('Error parsing stored knowledge base:', err);
      return [];
    }
  }
};