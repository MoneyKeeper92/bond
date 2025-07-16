// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ScenarioDetails from './components/ScenarioDetails';
import JournalEntryForm from './components/JournalEntryForm';
import Solution from './components/SolutionComponent';
import scenarios from './data/scenarios';
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
  // Student and UI states
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [currentId, setCurrentId] = useState(1);
  const [completedScenarios, setCompletedScenarios] = useState({});
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Get current scenario by ID
  const currentScenario = sortedScenarios.find(s => s.id === currentId);

  // Function to log an attempt
  const logAttempt = useCallback(async (scenarioId, isCorrect) => {
    if (!studentEmail) return;

    try {
      await fetch('/api/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: studentEmail,
          scenario_id: scenarioId,
          is_correct: isCorrect,
        }),
      });
    } catch (error) {
      console.error('Error logging attempt:', error);
    }
  }, [studentEmail]);

  // On initial load, get student details from URL and load their progress
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');
    const firstName = queryParams.get('first_name');

    if (firstName) {
      setStudentName(firstName);
    }
    
    if (email) {
      setStudentEmail(email);
      // Fetch user progress from the backend
      const fetchProgress = async () => {
        try {
          const response = await fetch(`/api/progress?email=${encodeURIComponent(email)}`);
          if (response.ok) {
            const data = await response.json();
            setCompletedScenarios(data.completedScenarios || {});
            setCurrentId(data.currentId || 1);
          } else {
            console.log('No saved progress found for this user.');
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      };
      fetchProgress();
    }
  }, []);

  // Save progress to the backend whenever it changes
  const saveProgress = useCallback(async () => {
    if (!studentEmail) return; // Don't save if there's no email

    try {
      await fetch(`/api/progress?email=${encodeURIComponent(studentEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completedScenarios,
          currentId,
        }),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [studentEmail, completedScenarios, currentId]);

  // useEffect to trigger saveProgress
  useEffect(() => {
    saveProgress();
  }, [saveProgress]);


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
      setFeedbackMessage('Congratulations! You have finished all the bond journal entries in this app!');
      setShowFeedback(true);
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
      console.log('Answer correct, waiting for user to advance');
      // Check if this is the last scenario
      const isLastScenario = !sortedScenarios.find(s => s.id > currentScenario.id);
      setFeedbackMessage(isLastScenario 
        ? 'Congratulations! You have finished all the bond journal entries in this app!'
        : 'Great job! You\'re making progress!');
      setShowFeedback(true);
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
      // Clear local state
      setCompletedScenarios({});
      setCurrentId(1);
      setShowSolution(false);
      setIsCorrect(null);
      setShowFeedback(false);

      // Also clear backend data
      if (studentEmail) {
        // Here you might want to make a DELETE request to your API
        // For this example, we'll just save empty progress
        saveProgress();
      }
    }
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((Object.keys(completedScenarios).length / sortedScenarios.length) * 100);

  return (
    <div className="app-container">
      <Header 
        studentName={studentName}
        currentIndex={currentId - 1} // Convert ID to 0-based index for display
        totalScenarios={sortedScenarios.length}
        progressPercentage={progressPercentage}
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
                if (result !== null) { // Log both correct and incorrect attempts
                  logAttempt(currentScenario.id, result);
                }
                if (result) {
                  markCompleted(true);
                }
              }}
              toggleSolution={toggleSolution}
              showSolution={showSolution}
              isCorrect={isCorrect}
              onAdvance={nextScenario}
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