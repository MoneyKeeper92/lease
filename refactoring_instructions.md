# Refactoring Instructions

This document provides a condensed set of instructions for refactoring the header and adding previous/next navigation to your React applications.

---

### Summary of Changes

These instructions will guide you through:
1.  **Refactoring the App Title**: Moving the main application title from the `Header` component to the main `App.js` component to improve reusability and fix layout issues.
2.  **Implementing Previous/Next Navigation**: Replacing a "Skip" button with "Previous" and "Next" buttons and wiring up the necessary state and logic to navigate between items.

---

### Step 1: Refactor the App Title

The goal is to make your `Header` component reusable by removing the hardcoded title and placing it in the main `App` component instead.

1.  **Move the Title to `App.js`**:
    In `src/App.js`, add an `<h1>` tag for your application title directly inside the main `div`, just before the `<Header>` component.

    ```javascript
    // src/App.js
    // ...
    return (
      <div className="app-container">
        <h1 className="main-title">Your App Name Here</h1>
        <Header {...yourProps} />
        {/* ... rest of your app */}
      </div>
    );
    ```

2.  **Clean up `Header.js`**:
    Remove the old title `<h1>` and its container from `src/components/Header.js`.

    ```javascript
    // src/components/Header.js
    // ...
    return (
      <header className="header">
        <div className="header-content">
          {/* REMOVE the title section from here */}
          <div className="progress-info">
            {/* ... progress bar elements */}
          </div>
          {/* ... other header elements */}
        </div>
      </header>
    );
    ```

3.  **Adjust CSS for Layout**:
    Update your stylesheets to center the new title and fix the header alignment.

    *   In `src/styles/App.css`, style the new title:
        ```css
        /* src/styles/App.css */
        .main-title {
          text-align: center;
          color: #2d3748;
          margin-bottom: 1rem;
        }
        ```
    *   In `src/styles/Header.css`, adjust the header content and progress bar layout:
        ```css
        /* src/styles/Header.css */
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-info {
          display: flex;
          flex-direction: column; /* Stack progress text and bar */
          align-items: flex-start;
          flex-grow: 1; /* Allow it to take available space */
          margin: 0 1.5rem;
        }

        .progress-container {
          width: 100%; /* Ensure progress bar has a width */
        }
        ```

---

### Step 2: Add Previous/Next Navigation

This replaces a single navigation button with separate "Previous" and "Next" controls.

1.  **Add Navigation Logic in `App.js`**:
    *   Create a function to handle moving to the *previous* item.
    *   Pass the `previousScenario`, `nextScenario`, and a flag for the first item down to your form component.

    ```javascript
    // src/App.js
    function App() {
      // ... your existing state (currentId, scenarios, etc.)

      const nextScenario = () => { /* ... your existing logic ... */ };

      const previousScenario = () => {
        const currentIndex = sortedScenarios.findIndex(s => s.id === currentId);
        if (currentIndex > 0) {
          setCurrentId(sortedScenarios[currentIndex - 1].id);
          // ... reset other state like showSolution, etc.
        }
      };

      return (
        // ...
            <JournalEntryForm
              // ... other props
              onAdvance={nextScenario}
              onPrevious={previousScenario}
              isFirstScenario={currentId === sortedScenarios[0]?.id}
            />
        // ...
      );
    }
    ```

2.  **Update the Form Component**:
    In your component that contains the buttons (e.g., `JournalEntryForm.js`), replace the old button with the new navigation controls.

    ```javascript
    // src/components/JournalEntryForm.js
    const JournalEntryForm = ({ onAdvance, onPrevious, isFirstScenario, ... }) => {
      return (
        <div>
          {/* ... your form ... */}

          {/* Remove the old button container */}

          <div className="navigation-controls">
            <button
              className="btn-secondary"
              onClick={onPrevious}
              disabled={isFirstScenario}
            >
              Previous
            </button>
            <button
              className="btn-primary"
              onClick={onAdvance}
            >
              Next
            </button>
          </div>
        </div>
      );
    };
    ```

3.  **Add CSS for Buttons**:
    In the corresponding CSS file (e.g., `src/styles/JournalEntry.css`), add styles for the new buttons.

    ```css
    /* src/styles/JournalEntry.css */
    .navigation-controls {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: 1px solid transparent;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .btn-primary {
      background-color: #207bb5;
      color: white;
    }

    .btn-secondary {
      background-color: #f0f4f8;
      color: #4b556a;
      border-color: #d1d9e6;
    }

    .btn-primary:disabled, .btn-secondary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    ``` 