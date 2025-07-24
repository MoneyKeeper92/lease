// Create this file at: src/components/solution.js
import React from 'react';
import { formatCurrency } from '../utils/formatUtils';
import '../styles/Solution.css';

const Solution = ({ scenario }) => {
  // Calculate totals of the solution
  const totalDebit = scenario.solution.reduce(
    (sum, line) => sum + (line.debit || 0), 0
  );
  
  const totalCredit = scenario.solution.reduce(
    (sum, line) => sum + (line.credit || 0), 0
  );
  
  return (
    <div className="solution-container">
      <h3 className="solution-heading">Solution:</h3>
      
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
      
      {scenario.keyCalculations && (
        <div className="calculations-container">
          <p className="calculations-heading">Key Calculations:</p>
          
          {scenario.leaseType === 'operating' ? (
            <div className="calculation-details">
              {scenario.keyCalculations.interest !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">Interest:</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.interest ? scenario.keyCalculations.interest : 
                     `${formatCurrency(scenario.initialLeaseLiability)} × ${scenario.interestRate * 100}% = ${formatCurrency(scenario.initialLeaseLiability * scenario.interestRate)}`}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.leaseExpense !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">Lease expense (single line item):</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.leaseExpense || formatCurrency(scenario.keyCalculations.leaseExpense)}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.rouAssetAmortization !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">ROU Asset amortization:</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.rouAssetAmortization || formatCurrency(scenario.keyCalculations.rouAssetAmortization)}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.liabilityReduction !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">Liability reduction:</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.liabilityReduction || formatCurrency(scenario.keyCalculations.liabilityReduction)}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.journalLogic && (
                <div className="calculation-section">
                  <p className="calculation-title">Journal Logic:</p>
                  <p className="calculation-explanation">{scenario.keyCalculations.journalLogic}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="calculation-details">
              {scenario.keyCalculations.interestExpense !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">Interest expense:</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.interestExpense || `${formatCurrency(scenario.initialLeaseLiability)} × ${scenario.interestRate * 100}% = ${formatCurrency(scenario.keyCalculations.interestExpense)}`}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.principalReduction !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">Principal reduction:</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.principalReduction || formatCurrency(scenario.keyCalculations.principalReduction)}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.amortizationExpense !== undefined && (
                <div className="calculation-section">
                  <p className="calculation-title">Amortization expense (ROU Asset):</p>
                  <p className="calculation-explanation">
                    {scenario.keyCalculations.amortizationExpense || formatCurrency(scenario.keyCalculations.amortizationExpense)}
                  </p>
                </div>
              )}
              
              {scenario.keyCalculations.journalLogic && (
                <div className="calculation-section">
                  <p className="calculation-title">Journal Logic:</p>
                  <p className="calculation-explanation">{scenario.keyCalculations.journalLogic}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Solution;