import { test, expect } from '@playwright/test';
import scenarios from '../src/data/scenarios.js'; // Import the actual scenarios

// Helper function to fill a journal entry line (Improved based on Codegen)
async function fillJournalLine(page, rowIndex, account, debit, credit) {
  const rowSelector = `.journal-table tbody tr:nth-child(${rowIndex + 1})`;

  // Account Name - Type and click suggestion
  const accountInput = page.locator(`${rowSelector} .account-input`);
  await accountInput.waitFor({ state: 'visible', timeout: 5000 });
  await accountInput.fill(account); 
  // Wait for the specific suggestion to appear and click it
  const suggestionLocator = page.locator(`.suggestions-list .suggestion-item:text-is("${account}")`);
  await suggestionLocator.waitFor({ state: 'visible', timeout: 5000 }); 
  await suggestionLocator.click();

  // Debit
  if (debit !== null && debit !== undefined && debit !== '') {
    const debitInput = page.locator(`${rowSelector} .debit-input`);
    await debitInput.fill(debit.toString());
  }

  // Credit
  if (credit !== null && credit !== undefined && credit !== '') {
    const creditInput = page.locator(`${rowSelector} .credit-input`);
    await creditInput.fill(credit.toString());
  }
  await page.waitForTimeout(50); // Small delay for state
}

// Helper function to fill the entire journal entry form
async function fillJournalEntry(page, entries) {
  for (let i = 0; i < entries.length; i++) {
    const { account, debit, credit } = entries[i];
    const debitValue = debit !== null && debit !== undefined ? debit : '';
    const creditValue = credit !== null && credit !== undefined ? credit : '';
    // Clear existing values before filling new ones, especially important when correcting
    const rowSelector = `.journal-table tbody tr:nth-child(${i + 1})`;
    await page.locator(`${rowSelector} .account-input`).fill(''); // Clear account first
    await page.locator(`${rowSelector} .debit-input`).fill('');
    await page.locator(`${rowSelector} .credit-input`).fill('');
    // Now fill with new values
    await fillJournalLine(page, i, account, debitValue, creditValue);
  }
}

test.describe('Bond Tool Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('h3:text("Scenario Details")')).toBeVisible({ timeout: 10000 });
    await page.waitForSelector('.journal-table tbody tr .account-input', { state: 'visible', timeout: 10000 });
  });

  test('should load the first scenario correctly', async ({ page }) => {
    await expect(page.locator('h3:text("Scenario Details")')).toBeVisible();
    await expect(page.locator('.details-grid')).toContainText('Face Value:');
    await expect(page.locator('.details-grid')).toContainText('$100,000.00');
    await expect(page.locator('.scenario-task p')).toContainText('Record the first interest payment');
    await expect(page.locator('.journal-table tbody tr:has(.account-input)')).toHaveCount(scenarios[0].solution.length);
  });

  test('should show error for incorrect answer', async ({ page }) => {
    // Fill incorrect data for the first scenario
    await fillJournalLine(page, 0, 'Cash', '1000', '');
    await fillJournalLine(page, 1, 'Interest Expense', '', '1000');

    await page.click('button:text("Check My Answer")');

    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('isn\'t quite right');

    // Check header progress text remains at scenario 1 (index 0)
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios');
  });

  test('should show success and wait for "Next Question" click', async ({ page }) => {
    const firstScenarioSolution = scenarios[0].solution;
    await fillJournalEntry(page, firstScenarioSolution);

    await page.click('button:text("Check My Answer")');

    await expect(page.locator('.success-dialog')).toBeVisible();
    await expect(page.locator('.success-dialog .success-message')).toContainText('Great job!');
    await expect(page.locator('.success-dialog button:text("Next Question")')).toBeVisible();

    // Check header progress text shows completion of scenario 1
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 1 / 8 Scenarios');

    await page.click('.success-dialog button:text("Next Question")');

    // Check header progress text still shows 1 completed after moving to scenario 2
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 1 / 8 Scenarios', { timeout: 10000 });
    await expect(page.locator('.details-grid')).toContainText('$200,000.00'); // Scenario 2 detail
  });

  test('should skip to the next question', async ({ page }) => {
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios');
    await page.click('button:text("Skip Question")');
    // After skipping, progress count remains 0, still on scenario 2 (index 1)
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios', { timeout: 10000 });
    await expect(page.locator('.details-grid')).toContainText('$200,000.00'); // Scenario 2 detail
  });

  test('should reset progress', async ({ page }) => {
    await page.click('button:text("Skip Question")');
    await page.click('button:text("Skip Question")');
    // Now on Scenario 3 (index 2), progress count is 0
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios', { timeout: 10000 });

    page.on('dialog', dialog => dialog.accept());
    await page.click('button:text("Reset Progress")');

    // Back to Scenario 1 (index 0), progress count is 0
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios', { timeout: 10000 });
    await expect(page.locator('.details-grid')).toContainText('$100,000.00'); // Scenario 1 detail
    await expect(page.locator('.header .mastery-level')).toContainText('Mastery: 0.0%');
  });

  // New test based on Codegen correction flow for Scenario 3
  test('should allow correcting an incorrect answer (Scenario 3)', async ({ page }) => {
    // Skip to Scenario 3
    await page.click('button:text("Skip Question")');
    await page.click('button:text("Skip Question")');
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios', { timeout: 10000 });
    await expect(page.locator('.details-grid')).toContainText('$150,000.00'); // Verify Scenario 3 Face Value

    // Define incorrect entries based loosely on Codegen
    const incorrectEntries = [
      { account: "Cash", debit: '', credit: '10000' }, // Incorrect amount
      { account: "Interest Expense", debit: '10000', credit: '' }, // Incorrect amount
      { account: "Discount on Bonds Payable", debit: '', credit: '5000' } // Incorrect amount/side
    ];

    // Fill the incorrect entries
    await fillJournalEntry(page, incorrectEntries);

    // Check Answer (should fail)
    await page.click('button:text("Check My Answer")');
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('isn\'t quite right');

    // Verify still on Scenario 3
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 0 / 8 Scenarios');

    // (Optional: Click show solution - skipped for brevity in test)
    // await page.click('button:text("Show Solution")');
    // await expect(page.locator('.solution-container')).toBeVisible();
    // await page.click('button:text("Hide Solution")');

    // Get the correct solution for Scenario 3 (index 2)
    const correctSolution = scenarios[2].solution;

    // Fill the correct entries (fillJournalEntry will clear previous values)
    await fillJournalEntry(page, correctSolution);

    // Check Answer again (should succeed)
    await page.click('button:text("Check My Answer")');
    await expect(page.locator('.success-dialog')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.success-dialog .success-message')).toContainText('Nice!');
    await expect(page.locator('.success-dialog button:text("Next Question")')).toBeVisible();

    // Verify progress updated for Scenario 3
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 1 / 8 Scenarios');

    // Click Next Question
    await page.click('.success-dialog button:text("Next Question")');

    // Verify moved to Scenario 4
    await expect(page.locator('.header .progress-text')).toContainText('Progress: 1 / 8 Scenarios', { timeout: 10000 });
    await expect(page.locator('.details-grid')).toContainText('$300,000.00'); // Scenario 4 Face Value
  });

  // Optional: Add a test loop for all scenarios later if needed
  // scenarios.forEach((scenario, index) => {
  //   test(`should correctly solve Scenario ${index + 1}`, async ({ page }) => {
  //     // Skip previous scenarios if not the first one
  //     for (let i = 0; i < index; i++) {
  //       await page.click('button:text("Skip Question")');
  //       // Wait for scenario details to update - check scenario number in header
  //       await expect(page.locator('.header .progress-text')).toContainText(`Scenario ${i + 2} /`, { timeout: 10000 });
  //     }
  //
  //     // Verify we are on the correct scenario
  //     await expect(page.locator('.header .progress-text')).toContainText(`Scenario ${index + 1} /`);
  //
  //     // Fill the entry
  //     await fillJournalEntry(page, scenario.solution);
  //
  //     // Check answer
  //     await page.click('button:text("Check My Answer")');
  //
  //     // Check for success
  //     await expect(page.locator('.success-dialog')).toBeVisible({ timeout: 10000 });
  //     await expect(page.locator('.success-dialog button:text("Next Question")')).toBeVisible();
  //
  //     // Check if it's the last scenario
  //     const isLastScenario = index === scenarios.length - 1;
  //
  //     if (isLastScenario) {
  //        // Check for completion message in the success dialog/feedback area
  //        await expect(page.locator('.success-dialog .success-message')).toContainText('Congratulations!');
  //     } else {
  //       // Click next
  //       await page.click('.success-dialog button:text("Next Question")');
  //       // Verify next scenario loaded
  //       await expect(page.locator('.header .progress-text')).toContainText(`Scenario ${index + 2} /`, { timeout: 10000 });
  //     }
  //   });
  // });
}); 