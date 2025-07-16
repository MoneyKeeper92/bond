## Bond Tool Application - Project Specification

**Version:** (As of end of conversation)

**1. Project Overview & Goal:**

*   **Purpose:** The Bond Tool is an interactive, web-based educational application built with React. Its primary goal is to provide users with practice in creating accurate journal entries for common bond accounting scenarios.
*   **Target Audience:** Students or professionals learning or reviewing intermediate accounting concepts related to bonds payable.

**2. Core Functionality:**

*   **Scenario Presentation:** Displays one bond accounting scenario at a time to the user.
*   **Journal Entry Input:** Allows users to input multi-line journal entries (Account Name, Debit, Credit).
*   **Answer Validation:** Compares the user's submitted journal entry against a predefined correct solution for the current scenario.
*   **Feedback:** Provides immediate feedback to the user indicating whether their submitted entry is correct or incorrect. Displays a success message upon correct completion.
*   **Progress Tracking:** Tracks which scenarios the user has successfully completed.
*   **Navigation:** Allows users to manually advance to the next scenario after a correct answer, skip the current scenario, or reset the entire application state.

**3. Data Structure (`src/data/scenarios.js`):**

*   The application relies on an array of JavaScript objects, where each object represents a unique bond accounting scenario.
*   **Key Fields per Scenario Object:**
    *   `id`: Unique numerical identifier.
    *   `scenarioNumber`: User-facing sequential number for the scenario.
    *   `bondType`: Category of the bond (e.g., "face", "premium", "discount").
    *   `faceValue`: The principal amount of the bond.
    *   `statedRate`: The coupon interest rate stated on the bond indenture.
    *   `effectiveRate`: The market interest rate at the time of issuance.
    *   `lifeYears`: The term of the bond in years.
    *   `paymentFrequency`: How often interest is paid (e.g., "Annual", "Semi-annual").
    *   `issuePrice`: The cash proceeds received upon issuance.
    *   `amortizationMethod`: Method used for amortizing premium/discount (e.g., "Effective Interest", "Straight-Line", null).
    *   `scenarioDate`: The date relevant to the specific task (e.g., interest payment date, accrual date, issuance date).
    *   `carryingValueBOY`: Carrying value at the beginning of the relevant year (used for calculations). *Note: Some scenarios might have this as `null` if not applicable (e.g., issuance).*
    *   `difficulty`: A numerical rating of the scenario's complexity (1-4).
    *   `task`: A string describing the specific accounting action the user needs to perform (e.g., "Record the first interest payment..."). These descriptions have been simplified to focus on the core action.
    *   `solution`: An array of objects defining the correct journal entry lines. Each line object has:
        *   `account`: The correct account name (string).
        *   `debit`: The correct debit amount (number) or `null`.
        *   `credit`: The correct credit amount (number) or `null`.
    *   `keyCalculations`: An object containing textual explanations of how the solution figures were derived (e.g., `overview`, `interestExpense`, `premiumAmortization`, `pvFactors`, etc.).
    *   `successMessage`: A string displayed to the user upon successful completion of the scenario.
*   **Data Modifications:**
    *   The original set of scenarios was filtered and simplified to focus primarily on initial interest events (payments/accruals) or issuance calculations.
    *   The `issueDate` field was removed from scenario objects as it became redundant with the simplifications.
    *   `id` and `scenarioNumber` fields were renumbered sequentially after filtering and reordering.
    *   Scenarios were explicitly reordered based on a defined sequence (`1, 4, 13, 2, 3, 15, 19, 10, 11, 5, 6, 7, 8, 16, 17, 9, 12, 14, 18`).
    *   Several `task` descriptions were simplified for clarity.

**4. Key Components & Responsibilities:**

*   **`App.js`:**
    *   Main application container.
    *   Manages the overall application state, including the list of scenarios, the current scenario index, and completion status.
    *   Renders `ScenarioDetails` and `JournalEntryForm`.
    *   Contains the logic for checking submitted answers (`markCompleted`), advancing to the next scenario (`handleNext`), skipping (`handleSkip`), and resetting (`handleReset`).
    *   **Modification:** The `markCompleted` function was altered to remove the `setTimeout` that previously caused automatic advancement to the next question upon a correct answer. Advancement now requires user interaction via the "Next" button.
*   **`ScenarioDetails.js`:**
    *   Displays the details of the current bond scenario (`bondType`, `faceValue`, rates, etc.).
    *   **Modification:** Rendered fields were reduced. "Bond Type", "Amortization", "Scenario Date", "Carrying Value (Start)", and "Issue Date" are *no longer displayed* by this component to reduce redundancy.
    *   Displays the `task` description.
*   **`JournalEntryForm.js`:**
    *   Manages the state of the user's current journal entry attempt (an array of lines).
    *   Renders multiple `JournalLine` components.
    *   Provides functionality to add/remove journal lines.
    *   Handles the submission of the completed entry back to `App.js`.
    *   **Modification:** Removed state management (`showTips`, `handleToggleTips`) and the button/rendering logic related to the deleted `TipsComponent`. Removed an unused import (`useEffect`).
*   **`JournalLine.js`:**
    *   Represents a single row in the journal entry form.
    *   Contains inputs for Account Name, Debit, and Credit.
    *   **Modification (Account Input):** Replaced the `react-select` dropdown with a standard HTML `<input type="text">`. Implemented basic autocomplete functionality:
        *   As the user types in the account name input, a list of potential matching account names (derived from the current scenario's `solution` and potentially a broader list) is displayed below the input.
        *   Clicking a suggestion populates the input field.
    *   **Modification (Numeric Input):** Implemented rounding logic. The `onChange` handler for Debit and Credit inputs (`handleNumericChange`) now uses `Math.round()` on the entered value before updating the component's state. The `step="any"` attribute was removed from these inputs.
*   **`SolutionComponent.js` (Previously `solution.js`):**
    *   Displays the correct solution and key calculations after a user has attempted a scenario (likely shown on correct answer or potentially reveal). *Filename was changed during development.*
*   **`JournalTable.js`:**
    *   Likely responsible for rendering the journal entry in a table format, potentially used within `JournalEntryForm` or for displaying the solution.

**5. Styling (`src/styles/`):**

*   CSS modules or standard CSS files are used for styling components (e.g., `JournalEntry.css`, `ScenarioDetails.css`, `App.css`).
*   **Modification (`JournalEntry.css`):** Styles were added to correctly position the autocomplete suggestion list relative to the account name input field using `position: relative` on the container and `position: absolute` on the list.
*   **Deleted:** `src/styles/Tips.css` was removed along with its component.

**6. User Interaction Flow:**

1.  App loads, displaying the first scenario's details and task.
2.  User reviews the scenario and task.
3.  User inputs account names (using autocomplete suggestions if desired), debit amounts, and credit amounts into the `JournalEntryForm`. Debits/Credits are rounded upon entry.
4.  User adds/removes lines as needed.
5.  User submits the entry.
6.  `App.js` validates the entry against the `solution`.
7.  **If Correct:**
    *   Success message is shown.
    *   The scenario is marked complete.
    *   The "Next" button becomes active (or visible).
    *   User clicks "Next" to load the subsequent scenario.
8.  **If Incorrect:**
    *   An indication of error is shown (specifics not detailed in summary).
    *   The user can edit their existing entry in `JournalEntryForm` and resubmit.
9.  Users can choose to "Skip" the current question at any time to move to the next one.
10. Users can choose to "Reset" the quiz, clearing all progress and returning to the first scenario.

**7. State Management:**

*   Primarily managed within `App.js` using React's built-in state management (`useState`, potentially `useReducer` though not explicitly mentioned).
*   `JournalEntryForm` and `JournalLine` manage their own local state for user inputs before submission.

**8. Removed Features:**

*   **Tips Component:** A component (`TipsComponent.js`) that likely provided hints or relevant accounting rules was completely removed, along with its associated button in `JournalEntryForm` and CSS (`Tips.css`).
*   **Automatic Advance:** The application no longer automatically moves to the next scenario after a correct answer. User interaction is required.

**9. Dependencies:**

*   React
*   `react-select` (Initially used, but its primary use in `JournalLine` was replaced with custom autocomplete logic. It might still be used elsewhere or could be a candidate for removal).
*   Standard web development dependencies (managed via `package.json` and `npm`).

**10. Testing Strategy:**

*   End-to-end testing implemented using Playwright.
*   Test specifications are located in `tests/app.spec.js`.
*   Tests cover core user flows:
    *   Application loading and initial state.
    *   Submitting an incorrect journal entry.
    *   Submitting a correct journal entry.
    *   Correcting a previously incorrect entry.
    *   Using the account name autocomplete feature (typing, clicking suggestion).
    *   Skipping a scenario.
    *   Resetting the application.
*   Tests use selectors to interact with UI elements (e.g., inputs, buttons, progress indicators) and assert application state changes.
*   Helper functions (e.g., `fillJournalLine`) were created to encapsulate common test actions.
*   **Note:** Test execution requires the development server (`npm start`) to be running with the *latest* version of the code, particularly `scenarios.js`. Hot-reloading issues previously caused test failures due to mismatches in expected vs. actual scenario counts. 