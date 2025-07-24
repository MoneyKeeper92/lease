import { test, expect } from '@playwright/test';

test.describe('Lease Tool Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('http://localhost:3000');
  });

  const scenarios = [
    {
      name: 'Finance Lease - Scenario 1',
      entries: [
        { account: 'Interest Expense', debit: '15000', credit: '0' },
        { account: 'Lease Liability', debit: '10000', credit: '0' },
        { account: 'Cash', debit: '0', credit: '25000' },
        { account: 'Amortization Expense (ROU Asset)', debit: '50000', credit: '0' },
        { account: 'Accumulated Amortization - ROU Asset', debit: '0', credit: '50000' }
      ]
    },
    {
      name: 'Finance Lease - Scenario 2',
      entries: [
        { account: 'Interest Expense', debit: '10000', credit: '0' },
        { account: 'Lease Liability', debit: '5000', credit: '0' },
        { account: 'Cash', debit: '0', credit: '15000' },
        { account: 'Amortization Expense (ROU Asset)', debit: '40000', credit: '0' },
        { account: 'Accumulated Amortization - ROU Asset', debit: '0', credit: '40000' }
      ]
    },
    // Operating lease scenarios
    ...Array(17).fill(null).map((_, index) => {
      const scenarioData = {
        3: { expense: '25000', cash: '25000', rou: '10000', liability: '10000' },
        4: { expense: '15000', cash: '15000', rou: '5000', liability: '5000' },
        5: { expense: '30000', cash: '30000', rou: '18000', liability: '18000' },
        6: { expense: '20000', cash: '20000', rou: '10000', liability: '10000' },
        7: { expense: '50000', cash: '50000', rou: '22000', liability: '22000' },
        8: { expense: '10000', cash: '10000', rou: '6000', liability: '6000' },
        9: { expense: '12000', cash: '12000', rou: '6000', liability: '6000' },
        10: { expense: '40000', cash: '40000', rou: '10000', liability: '10000' },
        11: { expense: '60000', cash: '60000', rou: '12000', liability: '12000' },
        12: { expense: '10000', cash: '10000', rou: '8000', liability: '8000' },
        13: { expense: '25000', cash: '25000', rou: '25000', liability: '25000' },
        14: { expense: '15000', cash: '15000', rou: '15000', liability: '15000' },
        15: { expense: '30000', cash: '30000', rou: '30000', liability: '30000' },
        16: { expense: '20000', cash: '20000', rou: '20000', liability: '20000' },
        17: { expense: '50000', cash: '50000', rou: '50000', liability: '50000' },
        18: { expense: '18000', cash: '18000', rou: '8000', liability: '8000' },
        19: { expense: '25000', cash: '25000', rou: '10000', liability: '10000' }
      }[index + 3];

      if (!scenarioData) return null;

      return {
        name: `Operating Lease - Scenario ${index + 3}`,
        entries: [
          { account: 'Lease Expense', debit: scenarioData.expense, credit: '0' },
          { account: 'Cash', debit: '0', credit: scenarioData.cash },
          { account: 'Right-of-Use Asset', debit: '0', credit: scenarioData.rou },
          { account: 'Lease Liability', debit: scenarioData.liability, credit: '0' }
        ]
      };
    }).filter(Boolean)
  ];

  // Create a test for each scenario
  scenarios.forEach((scenario, index) => {
    test(`should correctly solve ${scenario.name}`, async ({ page }) => {
      // If not first scenario, need to skip to this scenario
      for (let i = 0; i < index; i++) {
        await page.click('button:text("Skip Question")');
        await page.waitForLoadState('networkidle');
      }

      // For scenario 19, add extra logging
      if (scenario.name === 'Operating Lease - Scenario 19') {
        console.log('Testing Scenario 19 with entries:', JSON.stringify(scenario.entries, null, 2));
      }

      // Fill in the correct answer
      await fillJournalEntry(page, scenario.entries);

      // For scenario 19, verify form state before submitting
      if (scenario.name === 'Operating Lease - Scenario 19') {
        for (let i = 0; i < scenario.entries.length; i++) {
          const entry = scenario.entries[i];
          const rowSelector = `.journal-table tr:nth-child(${i + 1})`;
          
          // Log the current values in the form
          const accountName = await page.inputValue(`${rowSelector} input[placeholder="Enter account name"]`);
          const debitValue = await page.locator(`${rowSelector} td:nth-child(2) input`).first().inputValue();
          const creditValue = await page.locator(`${rowSelector} td:nth-child(3) input`).first().inputValue();
          
          console.log(`Row ${i + 1} values:`, { accountName, debitValue, creditValue });
        }
      }

      // Submit answer
      await page.click('button:text("Check My Answer")');

      // For the last scenario, look for either success dialog or completion message
      if (scenario.name === 'Operating Lease - Scenario 19') {
        await Promise.race([
          page.waitForSelector('.success-dialog', { timeout: 10000 }),
          page.waitForSelector('.feedback-message.success', { timeout: 10000 })
        ]);

        // Verify the completion message
        await expect(page.locator('.feedback-message.success')).toContainText('Congratulations! You have finished all the lease journal entries in this app!', { timeout: 10000 });
      } else {
        await expect(page.locator('.success-dialog')).toBeVisible({ timeout: 10000 });
      }
    });
  });

  test('should handle incorrect answer', async ({ page }) => {
    // Fill in an incorrect answer
    await fillJournalEntry(page, [
      { account: 'Interest Expense', debit: '1000', credit: '0' },
      { account: 'Cash', debit: '0', credit: '1000' }
    ]);

    // Click check answer
    await page.click('button:text("Check My Answer")');

    // Verify error message
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Try again');

    // Verify we stay on same scenario
    await expect(page.locator('.progress-text')).toContainText('Progress: 0/19 Scenarios');
  });

  test('should complete all scenarios in order', async ({ page }) => {
    // Solutions for all scenarios
    const solutions = [
      // Scenario 1 - Finance lease
      [
        { account: 'Interest Expense', debit: '15000', credit: '0' },
        { account: 'Lease Liability', debit: '10000', credit: '0' },
        { account: 'Cash', debit: '0', credit: '25000' },
        { account: 'Amortization Expense (ROU Asset)', debit: '50000', credit: '0' },
        { account: 'Accumulated Amortization - ROU Asset', debit: '0', credit: '50000' }
      ],
      // Scenario 2 - Finance lease
      [
        { account: 'Interest Expense', debit: '10000', credit: '0' },
        { account: 'Lease Liability', debit: '5000', credit: '0' },
        { account: 'Cash', debit: '0', credit: '15000' },
        { account: 'Amortization Expense (ROU Asset)', debit: '40000', credit: '0' },
        { account: 'Accumulated Amortization - ROU Asset', debit: '0', credit: '40000' }
      ],
      // Scenarios 3-19 - Operating leases
      ...Array(17).fill(null).map((_, index) => {
        const scenarioData = {
          3: { expense: '25000', cash: '25000', rou: '10000', liability: '10000' },
          4: { expense: '15000', cash: '15000', rou: '5000', liability: '5000' },
          5: { expense: '30000', cash: '30000', rou: '18000', liability: '18000' },
          6: { expense: '20000', cash: '20000', rou: '10000', liability: '10000' },
          7: { expense: '50000', cash: '50000', rou: '22000', liability: '22000' },
          8: { expense: '10000', cash: '10000', rou: '6000', liability: '6000' },
          9: { expense: '12000', cash: '12000', rou: '6000', liability: '6000' },
          10: { expense: '40000', cash: '40000', rou: '10000', liability: '10000' },
          11: { expense: '60000', cash: '60000', rou: '12000', liability: '12000' },
          12: { expense: '10000', cash: '10000', rou: '8000', liability: '8000' },
          13: { expense: '25000', cash: '25000', rou: '25000', liability: '25000' },
          14: { expense: '15000', cash: '15000', rou: '15000', liability: '15000' },
          15: { expense: '30000', cash: '30000', rou: '30000', liability: '30000' },
          16: { expense: '20000', cash: '20000', rou: '20000', liability: '20000' },
          17: { expense: '50000', cash: '50000', rou: '50000', liability: '50000' },
          18: { expense: '18000', cash: '18000', rou: '8000', liability: '8000' },
          19: { expense: '25000', cash: '25000', rou: '10000', liability: '10000' }
        }[index + 3];

        if (!scenarioData) return null;

        if (index + 3 <= 2) {
          // Finance lease scenarios
          return [
            { account: 'Interest Expense', debit: scenarioData.interest, credit: '0' },
            { account: 'Lease Liability', debit: scenarioData.principal, credit: '0' },
            { account: 'Cash', debit: '0', credit: scenarioData.cash },
            { account: 'Amortization Expense (ROU Asset)', debit: scenarioData.amortization, credit: '0' },
            { account: 'Accumulated Amortization - ROU Asset', debit: '0', credit: scenarioData.amortization }
          ];
        } else {
          // Operating lease scenarios
          return [
            { account: 'Lease Expense', debit: scenarioData.expense, credit: '0' },
            { account: 'Cash', debit: '0', credit: scenarioData.cash },
            { account: 'Right-of-Use Asset', debit: '0', credit: scenarioData.rou },
            { account: 'Lease Liability', debit: scenarioData.liability, credit: '0' }
          ];
        }
      }).filter(Boolean)
    ];

    // Go through each scenario
    for (let i = 0; i < solutions.length; i++) {
      console.log(`Testing scenario ${i + 1}`);
      
      // Wait for the journal table to be ready
      await page.waitForSelector('.journal-table', { state: 'visible', timeout: 10000 });
      
      // Fill in the correct answer
      await fillJournalEntry(page, solutions[i]);

      // Click check answer and wait for success
      await page.click('button:text("Check My Answer")');

      // For the last scenario, look for either success dialog or completion message
      if (i === solutions.length - 1) {
        // Wait for either the success dialog or the feedback message
        await Promise.race([
          page.waitForSelector('.success-dialog', { state: 'visible', timeout: 10000 }),
          page.waitForSelector('.feedback-message.success', { state: 'visible', timeout: 10000 })
        ]);

        // Wait for the completion message to appear
        await expect(page.locator('.feedback-message.success')).toContainText('Congratulations! You have finished all the lease journal entries in this app!', { timeout: 10000 });
      } else {
        // For all other scenarios, wait for success dialog and next scenario
        await Promise.race([
          page.waitForSelector('.success-dialog', { state: 'visible', timeout: 10000 }),
          page.waitForSelector('.feedback-message.success', { state: 'visible', timeout: 10000 })
        ]);

        // Wait for any animations and state updates
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        await page.waitForTimeout(2000); // Increased timeout to ensure state updates complete
      }
    }

    // Verify final state
    await expect(page.locator('.progress-text')).toContainText('Progress: 19/19 Scenarios', { timeout: 10000 });
    await expect(page.locator('.mastery-level')).toContainText('Mastery: 100.0%', { timeout: 10000 });
  });

  test('should handle skip question functionality', async ({ page }) => {
    // Get initial lease liability amount
    const initialLiability = await page.textContent('.detail-item:nth-child(2) span');
    
    // Click skip button
    await page.click('button:text("Skip Question")');
    
    // Wait for the lease liability to change
    await page.waitForFunction(
      (initialAmount) => {
        const liabilityElement = document.querySelector('.detail-item:nth-child(2) span');
        return liabilityElement && liabilityElement.textContent !== initialAmount;
      },
      initialLiability,
      { timeout: 5000 }
    );

    // Get new lease liability amount
    const newLiability = await page.textContent('.detail-item:nth-child(2) span');

    // Verify we moved to next scenario by checking the lease liability changed
    expect(newLiability).not.toBe(initialLiability);

    // Verify progress not affected
    await expect(page.locator('.progress-text')).toContainText('Progress: 0/19 Scenarios');
  });

  test('should handle show/hide solution', async ({ page }) => {
    // Initially solution should be hidden
    await expect(page.locator('.solution-container')).not.toBeVisible();

    // Show solution
    await page.click('button:text("Show Solution")');
    await expect(page.locator('.solution-container')).toBeVisible();

    // Hide solution
    await page.click('button:text("Hide Solution")');
    await expect(page.locator('.solution-container')).not.toBeVisible();
  });

  test('should handle reset progress', async ({ page }) => {
    // Fill in a correct answer first
    await fillJournalEntry(page, [
      { account: 'Interest Expense', debit: '15000', credit: '0' },
      { account: 'Lease Liability', debit: '10000', credit: '0' },
      { account: 'Cash', debit: '0', credit: '25000' },
      { account: 'Amortization Expense (ROU Asset)', debit: '50000', credit: '0' },
      { account: 'Accumulated Amortization - ROU Asset', debit: '0', credit: '50000' }
    ]);

    // Click check answer and wait for success
    await page.click('button:text("Check My Answer")');
    await page.waitForSelector('.success-dialog');
    await page.waitForTimeout(2000);

    // Set up dialog handler before clicking reset
    page.once('dialog', dialog => dialog.accept());
    
    // Click reset progress and wait for reset to complete
    await page.click('button:text("Reset Progress")');
    await page.waitForTimeout(2000);

    // Wait for any animations to complete
    await page.waitForLoadState('networkidle');

    // Reload the page to ensure reset took effect
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify reset
    await expect(page.locator('.progress-text')).toContainText('Progress: 0/19 Scenarios');
    await expect(page.locator('.mastery-level')).toContainText('Mastery: 0.0%');
  });
});

// Helper function to fill in journal entries
async function fillJournalEntry(page, entries) {
  await page.waitForSelector('.journal-table', { state: 'visible', timeout: 10000 });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const rowSelector = `.journal-table tr:nth-child(${i + 1})`;
    
    // Fill account name in first column
    await page.fill(`${rowSelector} input[placeholder="Enter account name"]`, entry.account);
    
    // Fill debit amount in second column
    if (entry.debit !== '0') {
      await page.locator(`${rowSelector} td:nth-child(2) input`).first().fill(entry.debit);
    }
    
    // Fill credit amount in third column
    if (entry.credit !== '0') {
      await page.locator(`${rowSelector} td:nth-child(3) input`).first().fill(entry.credit);
    }

    // Small wait between entries to prevent overwhelming the app
    await page.waitForTimeout(100);
  }

  // Wait for all inputs to settle
  await page.waitForTimeout(500);
} 