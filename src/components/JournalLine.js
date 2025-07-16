// src/components/JournalLine.js
import React, { useState, useEffect, useRef } from 'react';

const JournalLine = ({ line, index, updateLine, removeLine, bondType }) => {
  const [accountInput, setAccountInput] = useState(line.account || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  // Update local input state when the line prop changes (e.g., scenario change)
  useEffect(() => {
    setAccountInput(line.account || '');
  }, [line.account]);

  const handleAccountChange = (selectedOption) => {
    updateLine(line.id, 'account', selectedOption ? selectedOption.value : '');
  };

  // Define standard account names based on bond type
  let standardAccounts = [
    // Common accounts
    { value: 'Cash', label: 'Cash' },
    { value: 'Bonds Payable', label: 'Bonds Payable' },
    { value: 'Interest Expense', label: 'Interest Expense' },
    { value: 'Interest Payable', label: 'Interest Payable' },
    { value: 'Loss on Bond Retirement', label: 'Loss on Bond Retirement' }, // Added for retirement scenario
    { value: 'Gain on Bond Retirement', label: 'Gain on Bond Retirement' }, // Added for completeness
  ];

  if (bondType === 'premium') {
    standardAccounts.push({ value: 'Premium on Bonds Payable', label: 'Premium on Bonds Payable' });
  } else if (bondType === 'discount') {
    standardAccounts.push({ value: 'Discount on Bonds Payable', label: 'Discount on Bonds Payable' });
  }
  // 'face' bonds don't need extra accounts beyond common ones

  // Ensure unique accounts and sort alphabetically by label
  const uniqueAccounts = Array.from(new Set(standardAccounts.map(a => a.value)))
      .map(value => {
          return standardAccounts.find(a => a.value === value)
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  // Filter suggestions based on input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setAccountInput(value); // Update local state for input field
    updateLine(line.id, 'account', value); // Update parent state

    if (value.length > 0) {
      const filteredSuggestions = uniqueAccounts.filter(
        option => option.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
      setSelectedIndex(filteredSuggestions.length > 0 ? 0 : -1); // Select first suggestion or none
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle keyboard navigation and selection
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Scroll suggestions into view
  useEffect(() => {
    if (showSuggestions && selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex, showSuggestions]);

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    setAccountInput(suggestion.label);
    updateLine(line.id, 'account', suggestion.value);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current.focus(); // Keep focus on the input
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler for numeric inputs (Debit/Credit) with rounding
  const handleNumericChange = (field, value) => {
    if (value === '' || value === '-') { // Allow empty or just negative sign temporarily
      updateLine(line.id, field, value);
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const roundedValue = Math.round(num);
      updateLine(line.id, field, roundedValue.toString());
    } else {
      // If input is not a valid number (e.g., letters), clear it or keep previous value
      // Here, we'll clear it by setting to empty string via updateLine
      updateLine(line.id, field, ''); 
    }
  };

  return (
    <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
      <td className="account-cell">
        <div className="autocomplete-container">
          <input
            ref={inputRef}
            type="text"
            className="account-input"
            value={accountInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type account name..."
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list" ref={suggestionsRef}>
              {suggestions.map((suggestion, idx) => (
                <li
                  key={suggestion.value}
                  className={`suggestion-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(idx)} // Highlight on hover
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </td>
      <td>
        <div className="amount-input-container">
          <span className="currency-symbol">$</span>
          <input
            className="amount-input debit-input"
            placeholder="0"
            type="number" // Keep type number for potential mobile numeric keypad benefits
            value={line.debit}
            onChange={(e) => handleNumericChange('debit', e.target.value)}
            disabled={!!line.credit} // Disable if credit has value
          />
        </div>
      </td>
      <td>
        <div className="amount-input-container">
          <span className="currency-symbol">$</span>
          <input
            className="amount-input credit-input"
            placeholder="0"
            type="number" // Keep type number
            value={line.credit}
            onChange={(e) => handleNumericChange('credit', e.target.value)}
            disabled={!!line.debit} // Disable if debit has value
          />
        </div>
      </td>
      {/* Optional: Add remove button if needed, currently handled in JournalTable based on structure */}
      {/* 
      <td>
        <button onClick={() => removeLine(line.id)} className="remove-line-button">X</button>
      </td> 
      */}
    </tr>
  );
};

export default JournalLine;