import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Lock } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';

const LoginContainer = styled.div`
  position: relative;
`;

const LoginButton = styled(Button)`
  min-width: 100px;
`;

const LoginPopup = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--space-2);
  background-color: var(--color-background);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-md);
  width: 300px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const FormToggle = styled.button`
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  margin-top: var(--space-2);
  cursor: pointer;
  text-align: center;
  width: 100%;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const { showAlert } = useAlert();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
      }
      
      const storedUsers = localStorage.getItem('ticketapp_users');
      const users = storedUsers ? JSON.parse(storedUsers) : {};
      
      if (users[username]) {
        showAlert('Username already exists', 'error');
        return;
      }
            
      users[username] = { password, role: 'user' };
      localStorage.setItem('ticketapp_users', JSON.stringify(users));
      
      showAlert('Registration successful! You can now log in.', 'success');
      setIsRegistering(false);
      setPassword('');
      setConfirmPassword('');
    } else {
      try {
        const success = await login(username, password);
        if (success) {
          showAlert('Successfully logged in!', 'success');
          setIsOpen(false);
          setUsername('');
          setPassword('');
        } else {
          showAlert('Invalid credentials', 'error');
        }
      } catch (error) {
        showAlert('Error logging in', 'error');
      }
    }
  };
  
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setPassword('');
    setConfirmPassword('');
  };
  
  return (
    <LoginContainer>
      <LoginButton variant="primary" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Login'}
      </LoginButton>
      
      <LoginPopup isOpen={isOpen}>
        <Form onSubmit={handleSubmit}>
          <h3>{isRegistering ? 'Create Account' : 'Login'}</h3>
          
          <Input
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<User size={18} />}
            fullWidth
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
            fullWidth
          />
          
          {isRegistering && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={18} />}
              fullWidth
            />
          )}
          
          <Button type="submit" fullWidth>
            {isRegistering ? 'Register' : 'Sign In'}
          </Button>
          
          <FormToggle type="button" onClick={toggleMode}>
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </FormToggle>
        </Form>
      </LoginPopup>
    </LoginContainer>
  );
};

export default LoginForm;