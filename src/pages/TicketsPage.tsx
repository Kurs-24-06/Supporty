import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlusCircle, Search, FileText, Trash2, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import SearchBar from '../components/SearchBar';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string;
  createdBy: string;
}

const TicketsContainer = styled.div`
  margin-top: var(--space-4);
`;

const TicketsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }
`;

const TicketsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-3);
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TicketCard = styled(Card)`
  transition: transform var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TicketTitle = styled.h3`
  margin: 0;
  font-size: var(--font-size-lg);
`;

const TicketMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
`;

const TicketStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  
  background-color: ${props => {
    switch (props.status) {
      case 'open':
        return 'var(--color-warning-light)';
      case 'in-progress':
        return 'var(--color-primary-light)';
      case 'closed':
        return 'var(--color-success-light)';
      default:
        return 'var(--color-neutral-200)';
    }
  }};
  
  color: ${props => {
    switch (props.status) {
      case 'open':
        return 'var(--color-warning-dark)';
      case 'in-progress':
        return 'var(--color-primary-dark)';
      case 'closed':
        return 'var(--color-success-dark)';
      default:
        return 'var(--color-neutral-700)';
    }
  }};
`;

const TicketDescription = styled.p`
  margin: var(--space-2) 0;
  color: var(--color-neutral-700);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: var(--font-size-sm);
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  max-width: 500px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  color: var(--color-neutral-600);
  
  &:hover {
    color: var(--color-neutral-900);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-4);
`;

const KnowledgeSearchContainer = styled.div`
  margin-top: var(--space-4);
  border-top: 1px solid var(--color-neutral-200);
  padding-top: var(--space-4);
`;

const KnowledgeSearchResults = styled.div`
  margin-top: var(--space-3);
`;

const KnowledgeItem = styled.div`
  padding: var(--space-3);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-neutral-50);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: var(--color-neutral-50);
  border-radius: var(--radius-md);
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: var(--color-neutral-400);
  margin-bottom: var(--space-3);
`;

const DeleteConfirmModal = styled(Modal)``;

const DeleteConfirmContent = styled.div`
  background-color: white;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
`;

const DeleteConfirmHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-error);
  margin-bottom: var(--space-3);
`;

const DeleteConfirmActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-4);
`;

const ItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-2);
`;

const TicketsPage: React.FC = () => {
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [knowledgeQuery, setKnowledgeQuery] = useState('');
  const [knowledgeResults, setKnowledgeResults] = useState<any[]>([]);
  
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets);
      // Filter tickets based on user role
      const visibleTickets = user?.role === 'admin' 
        ? parsedTickets 
        : parsedTickets.filter((ticket: Ticket) => ticket.createdBy === user?.username);
      setTickets(visibleTickets);
      setFilteredTickets(visibleTickets);
    }
  }, [user]);
  
  const openModal = () => {
    setIsModalOpen(true);
    setCurrentTicket(null);
    setTitle('');
    setDescription('');
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTicket(null);
    setTitle('');
    setDescription('');
    setKnowledgeQuery('');
    setKnowledgeResults([]);
  };
  
  const openTicket = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setTitle(ticket.title);
    setDescription(ticket.description);
    setIsModalOpen(true);
  };
  
  const searchTickets = (query: string) => {
    if (!query.trim()) {
      setFilteredTickets(tickets);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = tickets.filter(
      ticket => 
        ticket.title.toLowerCase().includes(lowerQuery) || 
        ticket.description.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredTickets(filtered);
  };
  
  const searchKnowledgeBase = (query: string) => {
    if (!query.trim()) {
      setKnowledgeResults([]);
      return;
    }
    
    setKnowledgeQuery(query);
    
    setTimeout(() => {
      const storedKnowledge = localStorage.getItem('knowledgeBase');
      if (storedKnowledge) {
        const knowledgeBase = JSON.parse(storedKnowledge);
        const lowerQuery = query.toLowerCase();
        
        const results = knowledgeBase.filter(
          (item: any) => 
            item.title.toLowerCase().includes(lowerQuery) || 
            item.solution.toLowerCase().includes(lowerQuery)
        );
        
        setKnowledgeResults(results);
      } else {
        setKnowledgeResults([]);
      }
    }, 500);
  };
  
  const handleSaveTicket = () => {
    if (!title.trim()) {
      showAlert('Please enter a title for the ticket', 'error');
      return;
    }
    
    if (currentTicket) {
      // Only allow editing if admin or ticket creator
      if (user?.role !== 'admin' && currentTicket.createdBy !== user?.username) {
        showAlert('You do not have permission to edit this ticket', 'error');
        return;
      }
      
      const updatedTickets = tickets.map(ticket => 
        ticket.id === currentTicket.id 
          ? { ...ticket, title, description }
          : ticket
      );
      
      const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const finalTickets = allTickets.map((ticket: Ticket) =>
        ticket.id === currentTicket.id
          ? { ...ticket, title, description }
          : ticket
      );
      
      setTickets(updatedTickets);
      setFilteredTickets(updatedTickets);
      localStorage.setItem('tickets', JSON.stringify(finalTickets));
      showAlert('Ticket updated successfully', 'success');
    } else {
      const newTicket: Ticket = {
        id: Date.now(),
        title,
        description,
        status: 'open',
        createdAt: new Date().toISOString(),
        createdBy: user?.username || 'unknown'
      };
      
      const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const finalTickets = [...allTickets, newTicket];
      
      const visibleTickets = user?.role === 'admin'
        ? finalTickets
        : finalTickets.filter(ticket => ticket.createdBy === user?.username);
      
      setTickets(visibleTickets);
      setFilteredTickets(visibleTickets);
      localStorage.setItem('tickets', JSON.stringify(finalTickets));
      showAlert('Ticket created successfully', 'success');
    }
    
    closeModal();
  };
  
  const handleSetStatus = (status: 'open' | 'in-progress' | 'closed') => {
    if (!currentTicket) return;
    
    const updatedTickets = tickets.map(ticket => 
      ticket.id === currentTicket.id ? { ...ticket, status } : ticket
    );
    
    setTickets(updatedTickets);
    setFilteredTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    showAlert(`Ticket status updated to ${status}`, 'success');
    closeModal();
  };
  
  const importFromKnowledge = (item: any) => {
    setDescription(prev => `${prev}\n\nFrom Knowledge Base #${item.id}:\n${item.solution}`);
  };

  const openDeleteModal = (ticket: Ticket, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentTicket(null);
  };

  const handleDeleteTicket = () => {
    if (!currentTicket) return;

    const updatedTickets = tickets.filter(ticket => ticket.id !== currentTicket.id);
    setTickets(updatedTickets);
    setFilteredTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    showAlert('Ticket deleted successfully', 'success');
    closeDeleteModal();
  };
  
  return (
    <Layout>
      <h1>Ticket System {user?.role === 'admin' && '(Admin View)'}</h1>
      
      <SearchBar onSearch={searchTickets} placeholder="Search tickets..." />
      
      <TicketsHeader>
        <h2>All Tickets ({filteredTickets.length})</h2>
        <Button onClick={openModal}>
          <PlusCircle size={18} />
          New Ticket
        </Button>
      </TicketsHeader>
      
      <TicketsContainer>
        {filteredTickets.length > 0 ? (
          <TicketsList>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} variant="default">
                <div onClick={() => openTicket(ticket)}>
                  <TicketTitle>{ticket.title}</TicketTitle>
                  <TicketDescription>{ticket.description}</TicketDescription>
                  <TicketMeta>
                    <TicketStatus status={ticket.status}>
                      {ticket.status}
                    </TicketStatus>
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </TicketMeta>
                </div>
                <ItemActions>
                  <Button variant="danger" size="sm" onClick={(e) => openDeleteModal(ticket, e)}>
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </ItemActions>
              </TicketCard>
            ))}
          </TicketsList>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <FileText size={48} />
            </EmptyStateIcon>
            <h3>No tickets found</h3>
            <p>Create a new ticket to get started</p>
            <Button 
              variant="primary" 
              onClick={openModal} 
              style={{ marginTop: 'var(--space-3)' }}
            >
              <PlusCircle size={18} />
              New Ticket
            </Button>
          </EmptyState>
        )}
      </TicketsContainer>
      
      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{currentTicket ? 'Edit Ticket' : 'New Ticket'}</ModalTitle>
            <ModalClose onClick={closeModal}>&times;</ModalClose>
          </ModalHeader>
          
          <Input
            label="Title"
            placeholder="Enter ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          
          <Textarea
            label="Description"
            placeholder="Enter ticket description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          
          <KnowledgeSearchContainer>
            <h3>Search Knowledge Base</h3>
            <p style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)' }}>
              Find solutions from the knowledge base to help resolve this ticket.
            </p>
            
            <Input
              placeholder="Search knowledge base..."
              value={knowledgeQuery}
              onChange={(e) => searchKnowledgeBase(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
            
            {knowledgeResults.length > 0 && (
              <KnowledgeSearchResults>
                <h4 style={{ marginBottom: 'var(--space-2)' }}>Results:</h4>
                {knowledgeResults.map(item => (
                  <KnowledgeItem key={item.id} onClick={() => importFromKnowledge(item)}>
                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                    <p style={{ 
                      margin: 'var(--space-1) 0', 
                      fontSize: 'var(--font-size-sm)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.solution}
                    </p>
                  </KnowledgeItem>
                ))}
              </KnowledgeSearchResults>
            )}
            
            {knowledgeQuery && knowledgeResults.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--color-neutral-600)', padding: 'var(--space-3)' }}>
                No results found in knowledge base.
              </p>
            )}
          </KnowledgeSearchContainer>
          
          <ModalFooter>
            {currentTicket && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => handleSetStatus('open')}
                  disabled={currentTicket.status === 'open'}
                >
                  Set Open
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSetStatus('in-progress')}
                  disabled={currentTicket.status === 'in-progress'}
                >
                  Set In Progress
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => handleSetStatus('closed')}
                  disabled={currentTicket.status === 'closed'}
                >
                  Close Ticket
                </Button>
              </>
            )}
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSaveTicket}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <DeleteConfirmModal isOpen={isDeleteModalOpen}>
        <DeleteConfirmContent>
          <DeleteConfirmHeader>
            <AlertCircle size={24} />
            <h3>Delete Ticket</h3>
          </DeleteConfirmHeader>
          
          <p>Are you sure you want to delete this ticket?</p>
          <p><strong>Title:</strong> {currentTicket?.title}</p>
          
          <DeleteConfirmActions>
            <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteTicket}>Delete</Button>
          </DeleteConfirmActions>
        </DeleteConfirmContent>
      </DeleteConfirmModal>
    </Layout>
  );
};

export default TicketsPage;