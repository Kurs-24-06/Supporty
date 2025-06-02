import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Lock, User, UserPlus } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAlert } from '../context/AlertContext';

enum AuthMode {
  LOGIN = 'login',
  REGISTER = 'register'
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-3);
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: var(--space-4);
`;

const FormContainer = styled.div`
  margin-top: var(--space-3);
`;

const FormFooter = styled.div`
  margin-top: var(--space-4);
  text-align: center;
`;

const ModeToggle = styled.button`
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (mode === AuthMode.REGISTER && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const endpoint = mode === AuthMode.LOGIN ? '/api/login' : '/api/register';
      const response = await fetch(`http://backend:3002${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(data.message || 'An error occurred', 'error');
        return;
      }

      if (mode === AuthMode.LOGIN) {
        // Store token if returned
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        showAlert('Successfully logged in!', 'success');
        navigate('/tickets');
      } else {
        showAlert('Registration successful. You can now log in.', 'success');
        setMode(AuthMode.LOGIN);
      }
    } catch (err) {
      showAlert('Server not reachable.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      {loading && <LoadingOverlay>Loading...</LoadingOverlay>}

      <LoginCard variant="elevated" padding="large">
        <Logo>Supporty</Logo>

        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          {mode === AuthMode.LOGIN ? 'Welcome Back!' : 'Create Account'}
        </h2>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              placeholder="Enter your username"
              icon={<User size={18} />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              fullWidth
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
            />

            {mode === AuthMode.REGISTER && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={<Lock size={18} />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                fullWidth
              />
            )}

            <Button type="submit" fullWidth style={{ marginTop: 'var(--space-3)' }}>
              {mode === AuthMode.LOGIN ? 'Login' : 'Register'}
            </Button>
          </form>
        </FormContainer>

        <FormFooter>
          {mode === AuthMode.LOGIN ? (
            <p>
              Don't have an account?{' '}
              <ModeToggle type="button" onClick={toggleMode}>
                <UserPlus size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Register
              </ModeToggle>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <ModeToggle type="button" onClick={toggleMode}>
                Login
              </ModeToggle>
            </p>
          )}
        </FormFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
