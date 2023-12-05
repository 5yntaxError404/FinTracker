import React from 'react';
import '../css/DashPage.css'; // Assuming your CSS file is correctly set up

const CircularProgress = ({ spent, income }) => {
  const radius = 90; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const progress = spent / income;
  const dashoffset = circumference * (1 - progress);

  return (
    <div className="circular-progress-container">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="circular-progress-bar"
      >
        <circle
          className="circular-bg"
          cx="150"
          cy="150"
          r={radius}
          fill="transparent"
          stroke="#ccc"
          strokeWidth="30"
        />
        <circle
          className="circle-progress"
          cx="-30"
          cy="150"
          r={radius}
          fill="transparent"
          stroke="#6e2b62"
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 60 60)"
        />
        <text
          x="50%"
          y="50%"
          className="circular-progress-text"
          dy=".3em"
          textAnchor="middle"
        >
          {`$${spent.toLocaleString()} spent / $${income.toLocaleString()} income`}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
