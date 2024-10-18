import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../LoginModal';
import Navbar from '../Navbar';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-black flex flex-col gap-8 p-20">
        {children}
      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default PageWrapper;
