// frontend/src/components/TransitionWrapper.tsx
import React, { useRef, useState } from 'react'; // Import useState
import { useLocation, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from './Loader';

interface TransitionWrapperProps {
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
        onEnter={() => setIsTransitioning(true)}
        onExited={() => setIsTransitioning(false)}
      >
        <div ref={nodeRef} className="relative w-full h-full">
          {isTransitioning && <Loader />}
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
