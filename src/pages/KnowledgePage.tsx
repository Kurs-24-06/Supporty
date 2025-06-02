import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlusCircle, Edit2, Trash2, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import SearchBar from '../components/SearchBar';
import { useAlert } from '../context/AlertContext';

interface KnowledgeItem {
  id: number;
  title: string;
  solution: string;
  createdAt: string;
  updatedAt: string;
}

const KnowledgeContainer = styled.div`
  margin-top: var(--space-4);
`;

const KnowledgeHeader = styled.div`
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

const KnowledgeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const KnowledgeItemCard = styled(Card)`
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const KnowledgeTitle = styled.h3`
  margin: 0;
  font-size: var(--font-size-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemId = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  font-weight: normal;
`;

const KnowledgeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
`;

const KnowledgeSolution = styled.div`
  margin: var(--space-3) 0;
  color: var(--color-neutral-800);
  line-height: 1.6;
  word-break: break-word;
  white-space: pre-wrap;
`;

const ItemActions = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-3);
  justify-content: flex-end;
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
  max-width: 600px;
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

const ConfirmationModal = styled(Modal)``;
const ConfirmationContent = styled.div`
  background-color: white;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
`;

const ConfirmationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-3);
  color: var(--color-error);
`;

const ConfirmationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-4);
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

const KnowledgePage: React.FC = () => {
  const { showAlert } = useAlert();
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<KnowledgeItem | null>(null);
  const [title, setTitle] = useState('');
  const [solution, setSolution] = useState('');
  
  // Load knowledge base from localStorage on mount
  useEffect(() => {
    const storedKnowledge = localStorage.getItem('knowledgeBase');
    if (storedKnowledge) {
      const parsedKnowledge = JSON.parse(storedKnowledge);
      setKnowledgeItems(parsedKnowledge);
      setFilteredItems(parsedKnowledge);
    }
  }, []);
  
  const openModal = () => {
    setIsModalOpen(true);
    setCurrentItem(null);
    setTitle('');
    setSolution('');
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setTitle('');
    setSolution('');
  };
  
  const openEditModal = (item: KnowledgeItem) => {
    setCurrentItem(item);
    setTitle(item.title);
    setSolution(item.solution);
    setIsModalOpen(true);
  };
  
  const openDeleteConfirm = (item: KnowledgeItem) => {
    setCurrentItem(item);
    setIsConfirmOpen(true);
  };
  
  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setCurrentItem(null);
  };
  
  const searchKnowledge = (query: string) => {
    if (!query.trim()) {
      setFilteredItems(knowledgeItems);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = knowledgeItems.filter(
      item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.solution.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredItems(filtered);
  };
  
  const handleSaveItem = () => {
    if (!title.trim()) {
      showAlert('Please enter a title', 'error');
      return;
    }
    
    if (!solution.trim()) {
      showAlert('Please enter a solution', 'error');
      return;
    }
    
    const now = new Date().toISOString();
    
    if (currentItem) {
      // Update existing item
      const updatedItems = knowledgeItems.map(item => 
        item.id === currentItem.id 
          ? { ...item, title, solution, updatedAt: now }
          : item
      );
      
      setKnowledgeItems(updatedItems);
      setFilteredItems(updatedItems);
      localStorage.setItem('knowledgeBase', JSON.stringify(updatedItems));
      showAlert('Knowledge item updated successfully', 'success');
    } else {
      // Create new item
      const nextId = knowledgeItems.length > 0 
        ? Math.max(...knowledgeItems.map(item => item.id)) + 1 
        : 1;
      
      const newItem: KnowledgeItem = {
        id: nextId,
        title,
        solution,
        createdAt: now,
        updatedAt: now
      };
      
      const updatedItems = [...knowledgeItems, newItem];
      setKnowledgeItems(updatedItems);
      setFilteredItems(updatedItems);
      localStorage.setItem('knowledgeBase', JSON.stringify(updatedItems));
      showAlert('Knowledge item created successfully', 'success');
    }
    
    closeModal();
  };
  
  const handleDeleteItem = () => {
    if (!currentItem) return;
    
    const updatedItems = knowledgeItems.filter(item => item.id !== currentItem.id);
    setKnowledgeItems(updatedItems);
    setFilteredItems(updatedItems);
    localStorage.setItem('knowledgeBase', JSON.stringify(updatedItems));
    showAlert('Knowledge item deleted', 'info');
    closeConfirm();
  };
  
  return (
    <Layout>
      <h1>Knowledge Base</h1>
      
      <SearchBar onSearch={searchKnowledge} placeholder="Search knowledge base..." />
      
      <KnowledgeHeader>
        <h2>All Items ({filteredItems.length})</h2>
        <Button onClick={openModal}>
          <PlusCircle size={18} />
          New Entry
        </Button>
      </KnowledgeHeader>
      
      <KnowledgeContainer>
        {filteredItems.length > 0 ? (
          <KnowledgeList>
            {filteredItems.map(item => (
              <KnowledgeItemCard key={item.id} variant="default">
                <KnowledgeTitle>
                  {item.title}
                  <ItemId>#{item.id}</ItemId>
                </KnowledgeTitle>
                <KnowledgeSolution>{item.solution}</KnowledgeSolution>
                <KnowledgeMeta>
                  <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
                </KnowledgeMeta>
                <ItemActions>
                  <Button variant="outline" size="sm" onClick={() => openEditModal(item)}>
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => openDeleteConfirm(item)}>
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </ItemActions>
              </KnowledgeItemCard>
            ))}
          </KnowledgeList>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <PlusCircle size={48} />
            </EmptyStateIcon>
            <h3>No knowledge base items</h3>
            <p>Create your first knowledge base entry to get started</p>
            <Button 
              variant="primary" 
              onClick={openModal} 
              style={{ marginTop: 'var(--space-3)' }}
            >
              <PlusCircle size={18} />
              New Entry
            </Button>
          </EmptyState>
        )}
      </KnowledgeContainer>
      
      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {currentItem ? 'Edit Knowledge Item' : 'New Knowledge Item'}
            </ModalTitle>
            <ModalClose onClick={closeModal}>&times;</ModalClose>
          </ModalHeader>
          
          <Input
            label="Title"
            placeholder="Enter knowledge item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          
          <Textarea
            label="Solution"
            placeholder="Enter the solution..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            fullWidth
            style={{ minHeight: '200px' }}
          />
          
          <ModalFooter>
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSaveItem}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <ConfirmationModal isOpen={isConfirmOpen}>
        <ConfirmationContent>
          <ConfirmationHeader>
            <AlertCircle size={24} style={{ marginRight: 'var(--space-2)' }} />
            <h3 style={{ margin: 0 }}>Confirm Delete</h3>
          </ConfirmationHeader>
          
          <p>Are you sure you want to delete "{currentItem?.title}"?</p>
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>
            This action cannot be undone.
          </p>
          
          <ConfirmationActions>
            <Button variant="secondary" onClick={closeConfirm}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteItem}>Delete</Button>
          </ConfirmationActions>
        </ConfirmationContent>
      </ConfirmationModal>
    </Layout>
  );
};

export default KnowledgePage;