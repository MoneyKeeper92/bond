// src/components/JournalTable.js
import React from 'react';
import JournalLine from './JournalLine';
import { formatCurrency } from '../utils/formatUtils';
import '../styles/JournalEntry.css';

const JournalTable = ({ journalLines, updateLine, removeLine, bondType }) => {
  // Calculate totals
  const totalDebit = journalLines.reduce(
    (sum, line) => sum + (parseFloat(line.debit) || 0), 0
  );
  
  const totalCredit = journalLines.reduce(
    (sum, line) => sum + (parseFloat(line.credit) || 0), 0
  );
  
  return (
    <div className="journal-table-container">
      <table className="journal-table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {journalLines.map((line, index) => (
            <JournalLine
              key={line.id}
              line={line}
              index={index}
              updateLine={updateLine}
              removeLine={removeLine}
              bondType={bondType}
            />
          ))}
          
          {/* Totals row */}
          <tr className="totals-row">
            <td>Total</td>
            <td className="text-right">{formatCurrency(totalDebit)}</td>
            <td className="text-right">{formatCurrency(totalCredit)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JournalTable;