// src/components/ScenarioDetails.js
import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatUtils';
import '../styles/ScenarioDetails.css';

const ScenarioDetails = ({ scenario, attempts }) => {
  if (!scenario) {
    return <div>Loading scenario details...</div>;
  }

  // Helper function to format rate, handling potential null/undefined
  const formatRate = (rate) => rate ? formatPercentage(rate) : 'N/A';

  return (
    <div className="scenario-details-container">
      <h3>Scenario Details</h3>
      <div className="details-grid">
        {/* Basic Info - Removed Bond Type */}
        <div className="detail-item">
          <label>Face Value:</label>
          <span>{formatCurrency(scenario.faceValue)}</span>
        </div>
         <div className="detail-item">
           <label>Issue Price:</label>
           <span>{formatCurrency(scenario.issuePrice)}</span>
         </div>
         <div className="detail-item">
           <label>Bond Life (Years):</label>
           <span>{scenario.lifeYears || 'N/A'}</span>
         </div>

        {/* Rates */}
        <div className="detail-item">
          <label>Stated Rate (Coupon):</label>
          <span>{formatRate(scenario.statedRate)}</span>
        </div>
        <div className="detail-item">
          <label>Effective Rate (Market):</label>
          <span>{formatRate(scenario.effectiveRate)}</span>
        </div>

        {/* Dates & Timing - Removed Scenario Date and Issue Date */}
        <div className="detail-item">
           <label>Payment Frequency:</label>
           <span>{scenario.paymentFrequency || 'N/A'}</span>
        </div>

         {/* Other Details - Removed Amortization & Carrying Value */}
      </div>

      {/* Task & Overview */}
      <div className="scenario-task">
        <h4>Task</h4>
        <p>{scenario.task}</p>
      </div>
    </div>
  );
};

export default ScenarioDetails;