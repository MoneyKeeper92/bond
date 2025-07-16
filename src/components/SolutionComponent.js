// Create this file at: src/components/solution.js
import React from 'react';
import { formatCurrency } from '../utils/formatUtils';
import '../styles/Solution.css';

// Helper function to format calculation keys (copied from JournalEntryForm)
const formatCalcKey = (key) => {
  // Convert camelCase to Title Case
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Renamed component to Solution to match import in App.js, but kept structure
const Solution = ({ scenario }) => {
  if (!scenario || !scenario.solution) {
    return <div className="solution-container">No solution available for this scenario.</div>;
  }

  // Determine the title based on bond type or scenario specifics
  const solutionTitle = scenario.bondType ?
    `${scenario.bondType.charAt(0).toUpperCase() + scenario.bondType.slice(1)} Bond Solution` :
    'Solution';

  // Calculate totals of the solution
  const totalDebit = scenario.solution.reduce(
    (sum, line) => sum + (line.debit || 0), 0
  );
  
  const totalCredit = scenario.solution.reduce(
    (sum, line) => sum + (line.credit || 0), 0
  );
  
  return (
    <div className="solution-container">
      <h3>{solutionTitle}</h3>
      <div className="solution-content">
        {/* Display Journal Entries Table First */}
        <div className="journal-entries-solution">
          <h4>Correct Journal Entries</h4>
          <table className="solution-table">
             <thead>
               <tr>
                 <th>Account</th>
                 <th>Debit</th>
                 <th>Credit</th>
               </tr>
             </thead>
             <tbody>
               {scenario.solution.map((line, index) => (
                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                   <td>{line.account}</td>
                   <td>{line.debit ? formatCurrency(line.debit) : ''}</td>
                   <td>{line.credit ? formatCurrency(line.credit) : ''}</td>
                 </tr>
               ))}
               {/* Totals row */}
               <tr className="solution-table-totals">
                 <td>Total</td>
                 <td>{formatCurrency(totalDebit)}</td>
                 <td>{formatCurrency(totalCredit)}</td>
               </tr>
             </tbody>
           </table>
         </div>

        {/* Display Key Calculations Second */}
        {scenario.keyCalculations && Object.keys(scenario.keyCalculations).length > 0 && (
          <div className="key-calculations-solution">
            <h4>Key Calculations Breakdown</h4>
             <div className="calculation-details-solution"> {/* Added class for potential specific styling */}
               {/* Iterate over keyCalculations object */}
               {Object.entries(scenario.keyCalculations).map(([key, value]) => (
                 // Don't display overview here
                 key !== 'overview' && (
                   <div className="calculation-detail-item" key={key}>
                     <span className="calculation-label">{formatCalcKey(key)}:</span>
                     <span className="calculation-value">{value}</span>
                   </div>
                 )
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solution; // Exporting as Solution to match App.js import