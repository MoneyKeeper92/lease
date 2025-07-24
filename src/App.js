// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScenarioDetails from './components/ScenarioDetails';
import JournalEntryForm from './components/JournalEntryForm';
import Solution from './components/solution';
import scenarios from './data/scenarios';
import { getCookie, setCookie, clearAllCookies } from './utils/cookieManager';
import './styles/App.css';

// Sort scenarios by ID
const sortedScenarios = [...scenarios].sort((a, b) => a.id - b.id);

// Calculate mastery level based on completed scenarios
const calculateMasteryLevel = (completedScenarios) => {
  const totalScenarios = sortedScenarios.length;
  const correctlyCompletedScenarios = Object.entries(completedScenarios)
    .filter(([_, isCorrect]) => isCorrect)
    .length;
  return correctlyCompletedScenarios / totalScenarios;
};

function App() {
  // Current scenario ID (not index)
  const [currentId, setCurrentId] = useState(() => {
    const savedId = getCookie('currentScenarioId');
    return savedId ? parseInt(savedId, 10) : 1; // Start with ID 1
  });

  // Completed scenarios tracking
  const [completedScenarios, setCompletedScenarios] = useState(() => {
    const saved = getCookie('completedScenarios');
    return saved ? JSON.parse(saved) : {};
  });

  // UI states
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Get current scenario by ID
  const currentScenario = sortedScenarios.find(s => s.id === currentId);

  // Save current ID to cookie when it changes
  useEffect(() => {
    setCookie('currentScenarioId', currentId.toString(), 30);
  }, [currentId]);

  // Save completed scenarios to cookie when they change
  useEffect(() => {
    setCookie('completedScenarios', JSON.stringify(completedScenarios), 30);
  }, [completedScenarios]);

  // Navigation functions
  const nextScenario = () => {
    console.log('Current ID:', currentId);
    console.log('Total Scenarios:', sortedScenarios.length);
    
    // Find the next scenario ID
    const nextScenario = sortedScenarios.find(s => s.id > currentId);
    if (nextScenario) {
      console.log('Moving to next scenario with ID:', nextScenario.id);
      setCurrentId(nextScenario.id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      console.log('All scenarios completed!');
      setFeedbackMessage('Congratulations! You have finished all the lease journal entries in this app!');
      setShowFeedback(true);
    }
  };

  const previousScenario = () => {
    const currentIndex = sortedScenarios.findIndex(s => s.id === currentId);
    if (currentIndex > 0) {
      setCurrentId(sortedScenarios[currentIndex - 1].id);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  // Mark current scenario as completed and update performance
  const markCompleted = (isCorrect = true) => {
    const scenarioId = currentScenario.id;
    console.log('Marking scenario as completed:', scenarioId, 'Correct:', isCorrect);
    
    // Update completed scenarios
    setCompletedScenarios(prev => {
      const newCompleted = {
        ...prev,
        [scenarioId]: isCorrect
      };
      console.log('Completed Scenarios:', newCompleted);
      return newCompleted;
    });

    // Provide feedback based on performance
    if (isCorrect) {
      console.log('Answer correct, advancing to next scenario');
      // Check if this is the last scenario
      const isLastScenario = !sortedScenarios.find(s => s.id > currentScenario.id);
      setFeedbackMessage(isLastScenario 
        ? 'Congratulations! You have finished all the lease journal entries in this app!'
        : 'Great job! You\'re making progress!');
      setShowFeedback(true);
      setTimeout(() => {
        if (!isLastScenario) {
          nextScenario();
          setShowFeedback(false);
        }
      }, 4000);
    } else {
      console.log('Answer incorrect, staying on current scenario');
      setFeedbackMessage('Keep practicing! You\'ll get better with each attempt.');
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 4000);
    }
  };

  // Toggle solution visibility
  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  // Reset progress (clear cookies)
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      clearAllCookies();
      setCompletedScenarios({});
      setCurrentId(1); // Reset to first scenario (ID 1)
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((Object.keys(completedScenarios).length / sortedScenarios.length) * 100);

  return (
    <div className="app-container">
      <h1 className="main-title">Lease Accounting Tool</h1>
      <Header
        completedCount={Object.keys(completedScenarios).length}
        resetProgress={resetProgress}
        masteryLevel={calculateMasteryLevel(completedScenarios)}
      />
      
      <div className="container">
        {currentScenario && (
          <>
            <ScenarioDetails 
              scenario={currentScenario}
              attempts={completedScenarios[currentScenario.id] ? 1 : 0}
            />
            
            <JournalEntryForm
              scenario={currentScenario}
              onCheck={(result) => {
                setIsCorrect(result);
                if (result) {
                  markCompleted(true);
                }
              }}
              toggleSolution={toggleSolution}
              showSolution={showSolution}
              isCorrect={isCorrect}
              onAdvance={nextScenario}
              onPrevious={previousScenario}
              isFirstScenario={currentId === sortedScenarios[0]?.id}
            />
            
            {showSolution && (
              <Solution scenario={currentScenario} />
            )}

            {showFeedback && (
              <div className={`feedback-message ${isCorrect ? 'success' : 'error'}`}>
                {feedbackMessage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;