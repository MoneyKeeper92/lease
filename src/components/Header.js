// src/components/Header.js
import React, { useState } from 'react';
import { formatPercentage } from '../utils/formatUtils';
import '../styles/Header.css';

const Header = ({
  completedCount,
  resetProgress,
  masteryLevel
}) => {
  const totalScenariosInApp = 19; // Total number of scenarios in the app
  const [showTooltip, setShowTooltip] = useState(false);
  
  const milestones = [25, 50, 75, 100];
  const getMilestoneMessage = (percentage) => {
    if (percentage >= 100) return "Completed!";
    if (percentage >= 75) return "Almost there!";
    if (percentage >= 50) return "Halfway there!";
    if (percentage >= 25) return "Nice start!";
    return "";
  };

  const masteryPercentage = masteryLevel * 100;

  return (
    <header className="header">
      <div className="header-content">
        <div className="progress-info">
          <div className="progress-text">
            Progress: {completedCount}/{totalScenariosInApp} Scenarios
          </div>
          <div
            className="progress-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Milestone markers */}
            <div className="milestone-markers">
              {milestones.map(milestone => (
                <div
                  key={milestone}
                  className="milestone-marker"
                  style={{ left: `${milestone}%` }}
                >
                  <div className="milestone-label">{milestone}%</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
              <div
                className={`progress-fill`}
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>

            {/* Tooltip */}
            {showTooltip && (
              <div className="progress-tooltip">
                <div>Mastery: {formatPercentage(masteryLevel)}</div>
                <div className="milestone-message">
                  {getMilestoneMessage(masteryPercentage)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="performance-metrics">
          <div className="mastery-level">
            Mastery: {formatPercentage(masteryLevel)}
          </div>
          <button
            className="reset-button"
            onClick={resetProgress}
          >
            Reset Progress
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;