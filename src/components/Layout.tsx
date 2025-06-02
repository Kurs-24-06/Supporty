import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import Footer from './Footer';
import LoginForm from './LoginForm';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-neutral-200);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: var(--shadow-sm);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary);
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background);
    display: flex;
    flex-direction: column;
    padding: var(--space-5);
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform var(--transition-normal);
    z-index: 20;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-5);
  }
`;

const NavItem = styled.li<{ active: boolean }>`
  margin-right: var(--space-3);
  
  a {
    display: block;
    padding: var(--space-2);
    color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text)'};
    font-weight: ${props => props.active ? '600' : '400'};
    border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
    
    &:hover {
      color: var(--color-primary);
    }
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: var(--space-2);
    
    a {
      font-size: var(--font-size-lg);
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  cursor: pointer;
  font-size: var(--font-size-xl);
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: var(--space-3);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo>Supporty</Logo>
          
          <MobileMenuButton onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </MobileMenuButton>
          
          <Nav isOpen={isMenuOpen}>
            <CloseButton onClick={closeMenu}>
              <X size={24} />
            </CloseButton>
            
            <NavList>
              <NavItem active={location.pathname === '/'}>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); closeMenu(); }}>
                  {t('home')}
                </a>
              </NavItem>
              {user && (
                <>
                  <NavItem active={location.pathname === '/tickets'}>
                    <a href="/tickets" onClick={(e) => { e.preventDefault(); navigate('/tickets'); closeMenu(); }}>
                      {t('Ticketssystem')}
                    </a>
                  </NavItem>
                  <NavItem active={location.pathname === '/knowledge'}>
                    <a href="/knowledge" onClick={(e) => { e.preventDefault(); navigate('/knowledge'); closeMenu(); }}>
                      {t('knowledgeBase')}
                    </a>
                    </NavItem>
                  <NavItem active={location.pathname === '/Services'}>
                    <a href="/Services"   onClick={(e) => { e.preventDefault(); navigate('/Services');   closeMenu(); }}>
                      {t('Services')}
                    </a>
                  </NavItem>
                  <NavItem active={location.pathname === '/Support'}>
                    <a href="/Support"   onClick={(e) => { e.preventDefault(); navigate('/Support');   closeMenu(); }}>
                      {t('[Support]')}
                    </a>
                  </NavItem>
          
                  <NavItem active={location.pathname === '/ArbeitsSchutz'}>
                    <a href="/ArbeitsSchutz"   onClick={(e) => { e.preventDefault(); navigate('/ArbeitsSchutz');   closeMenu(); }}>
                      {t('[ArbSCHG]')}
                    </a>
                  </NavItem>
                </>
              )}
            </NavList>
          </Nav>
          
          <HeaderActions>
            <LanguageToggle />
            <ThemeToggle />
            {user ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
                {t('logout')}
              </Button>
            ) : (
              <LoginForm />
            )}
          </HeaderActions>
        </HeaderContent>
      </Header>
      
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;