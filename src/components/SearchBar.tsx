import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import Input from './Input';
import Button from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBarContainer = styled.div`
  display: flex;
  margin-bottom: var(--space-4);
`;

const SearchInput = styled.div`
  flex: 1;
  margin-right: var(--space-2);
`;

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  placeholder = 'Search...' 
}) => {
  const [query, setQuery] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <SearchBarContainer>
        <SearchInput>
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            icon={<Search size={18} />}
          />
        </SearchInput>
        <Button type="submit">Search</Button>
      </SearchBarContainer>
    </form>
  );
};

export default SearchBar;