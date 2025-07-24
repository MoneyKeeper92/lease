// src/data/scenarios.js
const scenarios = [
  {
    id: 1,
    scenarioNumber: 1,
    leaseType: "finance",
    initialLeaseLiability: 250000,
    leaseTerm: "5 years",
    annualPayment: 25000,
    interestRate: 0.06,
    paymentTiming: "End of Year",
    difficulty: 1,
    task: "Record the first lease payment and the associated amortization.",
    solution: [
      {
        account: "Interest Expense",
        debit: 15000,
        credit: null
      },
      {
        account: "Lease Liability",
        debit: 10000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 25000
      },
      {
        account: "Amortization Expense (ROU Asset)",
        debit: 50000,
        credit: null
      },
      {
        account: "Accumulated Amortization - ROU Asset",
        debit: null,
        credit: 50000
      }
    ],
    keyCalculations: {
      overview: "This finance lease requires splitting the payment between interest and principal, plus recording ROU asset amortization. For finance leases under ASC 842, interest and amortization are recorded separately on the income statement.",
      interestExpense: "Initial Liability × Interest Rate = $250,000 × 6% = $15,000. Interest is calculated on the opening lease liability balance.",
      principalReduction: "Annual Payment - Interest Expense = $25,000 - $15,000 = $10,000. This portion reduces the lease liability on the balance sheet.",
      amortizationExpense: "Initial ROU Asset ÷ Lease Term = $250,000 ÷ 5 years = $50,000 per year. The ROU asset is amortized on a straight-line basis over the 5-year lease term.",
      journalLogic: "First, we record the cash payment, split between interest expense and liability reduction. Then, we separately record the amortization of the ROU asset, which is independent of the payment amount."
    },
    successMessage: "Correct! You've properly recorded both the finance lease payment and the associated amortization."
  },
  {
    id: 2,
    scenarioNumber: 2,
    leaseType: "finance",
    initialLeaseLiability: 200000,
    leaseTerm: "5 years",
    annualPayment: 15000,
    interestRate: 0.05,
    paymentTiming: "End of Year",
    difficulty: 1,
    task: "Record the first lease payment and the associated amortization.",
    solution: [
      {
        account: "Interest Expense",
        debit: 10000,
        credit: null
      },
      {
        account: "Lease Liability",
        debit: 5000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 15000
      },
      {
        account: "Amortization Expense (ROU Asset)",
        debit: 40000,
        credit: null
      },
      {
        account: "Accumulated Amortization - ROU Asset",
        debit: null,
        credit: 40000
      }
    ],
    keyCalculations: {
      overview: "This finance lease (initial liability $200,000, 5-year term, 5% interest rate) requires two distinct accounting treatments: (1) recording the cash payment split between interest and principal, and (2) recording the separate ROU asset amortization.",
      interestExpense: "Initial Liability × Interest Rate = $200,000 × 5% = $10,000. This represents the financing cost for the period based on the opening liability balance.",
      principalReduction: "Annual Payment - Interest Expense = $15,000 - $10,000 = $5,000. Only this portion reduces the lease liability on the balance sheet.",
      amortizationExpense: "Initial ROU Asset ÷ Lease Term = $200,000 ÷ 5 years = $40,000 per year. Finance leases typically amortize the ROU asset on a straight-line basis over the lease term.",
      journalLogic: "Unlike operating leases, finance leases show interest and amortization expenses separately on the income statement. This creates a front-loaded expense pattern, with higher total expenses in earlier years of the lease."
    },
    successMessage: "Well done! You've correctly recorded the finance lease payment and amortization entries."
  },
  {
    id: 3,
    scenarioNumber: 3,
    leaseType: "operating",
    initialLeaseLiability: 250000,
    annualPayment: 25000,
    interestRate: 0.06,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    solution: [
      {
        account: "Lease Expense",
        debit: 25000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 25000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 10000
      },
      {
        account: "Lease Liability",
        debit: 10000,
        credit: null
      }
    ],
    keyCalculations: {
      overview: "This operating lease with end-of-year payments ($250,000 initial liability, $25,000 annual payment, 6% interest) requires a single lease expense on the income statement, while the balance sheet accounts (ROU asset and lease liability) must be adjusted based on the effective interest method.",
      interest: "Initial Liability × Interest Rate = $250,000 × 6% = $15,000. For operating leases, this interest is implied but not shown separately in the journal entry. It's used only for calculating the liability reduction.",
      leaseExpense: "Full Cash Payment = $25,000. Operating leases under ASC 842 record the entire payment as a single expense line item on the income statement, regardless of the interest and principal components.",
      rouAssetAmortization: "Payment - Interest = $25,000 - $15,000 = $10,000. The ROU asset is reduced by the same amount as the lease liability to maintain balance sheet alignment.",
      liabilityReduction: "Payment - Interest = $25,000 - $15,000 = $10,000. Only the principal portion reduces the liability; the implied interest portion doesn't reduce the liability.",
      journalLogic: "The key difference from finance leases is that operating leases show a single expense line item rather than separate interest and amortization expenses, resulting in a straight-line expense pattern over the lease term."
    },
    successMessage: "Correct! Your journal entry accurately reflects operating lease accounting with end-of-year payments."
  },
  {
    id: 4,
    scenarioNumber: 4,
    leaseType: "operating",
    initialLeaseLiability: 200000,
    annualPayment: 15000,
    interestRate: 0.05,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    solution: [
      {
        account: "Lease Expense",
        debit: 15000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 15000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 5000
      },
      {
        account: "Lease Liability",
        debit: 5000,
        credit: null
      }
    ],
    keyCalculations: {
      overview: "This operating lease with end-of-year payments ($200,000 initial liability, $15,000 annual payment, 5% interest) demonstrates the core operating lease accounting principle: a single lease expense on the income statement, with balance sheet adjustments that reflect the economic reality of the lease.",
      interest: "Initial Liability × Interest Rate = $200,000 × 5% = $10,000 (implied). This interest component isn't shown separately in operating lease accounting but is necessary to calculate the correct liability reduction.",
      leaseExpense: "Full Cash Payment = $15,000. Operating leases record a single expense equal to the cash payment, creating a straight-line expense pattern over the lease term.",
      rouAssetAmortization: "Payment - Interest = $15,000 - $10,000 = $5,000. The ROU asset reduction equals the liability reduction to maintain balance sheet alignment.",
      liabilityReduction: "Payment - Interest = $15,000 - $10,000 = $5,000. Only the principal portion (payment minus implied interest) reduces the lease liability.",
      journalLogic: "The key accounting principle here is that operating leases show a constant expense pattern over time, whereas the balance sheet accounts (ROU asset and lease liability) fluctuate based on the effective interest method. This creates a balanced approach that reflects both the contractual payments and the financing element of the lease."
    },
    successMessage: "Great job! You've correctly applied operating lease accounting principles."
  },
  {
    id: 5,
    scenarioNumber: 5,
    leaseType: "operating",
    initialLeaseLiability: 300000,
    annualPayment: 30000,
    interestRate: 0.04,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario features an operating lease with an initial liability of $300,000, annual payments of $30,000, and a 4% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense
      2) The lease liability's implied interest is calculated (but not separately shown)
      3) Only the principal portion reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $300,000 × 4% = $12,000
      - Principal Portion: $30,000 - $12,000 = $18,000
      - Lease Expense: Full payment = $30,000
      - ROU Asset Adjustment: Same as liability reduction = $18,000

      Note that the higher the interest rate, the smaller the principal reduction portion in early years. Conversely, the lower the interest rate, the larger the principal reduction portion, as seen in this scenario with a relatively low 4% rate.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 30000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 30000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 18000
      },
      {
        account: "Lease Liability",
        debit: 18000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $300,000 × 4% = $12,000 (implied)",
      leaseExpense: "Full Cash Payment = $30,000",
      rouAssetAmortization: "Payment - Interest = $30,000 - $12,000 = $18,000",
      liabilityReduction: "Payment - Interest = $30,000 - $12,000 = $18,000"
    },
    successMessage: "Well done! You've correctly recorded the operating lease payment."
  },
  {
    id: 6,
    scenarioNumber: 6,
    leaseType: "operating",
    initialLeaseLiability: 100000,
    annualPayment: 20000,
    interestRate: 0.10,
    paymentTiming: "End of Year",
    difficulty: 3,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario involves an operating lease with a high interest rate - initial liability of $100,000, annual payments of $20,000, and a 10% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense
      2) The lease liability's implied interest is calculated internally
      3) Only the principal portion (payment minus interest) reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $100,000 × 10% = $10,000
      - Principal Portion: $20,000 - $10,000 = $10,000
      - Lease Expense: Full payment = $20,000
      - ROU Asset Adjustment: Same as liability reduction = $10,000

      Note that with this high 10% interest rate, exactly half of the payment ($10,000) goes to interest in the first year. This proportion will decrease in subsequent years as the lease liability decreases.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 20000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 20000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 10000
      },
      {
        account: "Lease Liability",
        debit: 10000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $100,000 × 10% = $10,000 (implied)",
      leaseExpense: "Full Cash Payment = $20,000",
      rouAssetAmortization: "Payment - Interest = $20,000 - $10,000 = $10,000",
      liabilityReduction: "Payment - Interest = $20,000 - $10,000 = $10,000"
    },
    successMessage: "Excellent work! You've handled this high-interest operating lease correctly."
  },
  {
    id: 7,
    scenarioNumber: 7,
    leaseType: "operating",
    initialLeaseLiability: 400000,
    annualPayment: 50000,
    interestRate: 0.07,
    paymentTiming: "End of Year",
    difficulty: 3,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario features a large operating lease with an initial liability of $400,000, annual payments of $50,000, and a 7% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense on the income statement
      2) We calculate implied interest on the lease liability
      3) Only the principal portion (payment minus interest) reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $400,000 × 7% = $28,000
      - Principal Portion: $50,000 - $28,000 = $22,000
      - Lease Expense: Full payment = $50,000
      - ROU Asset Adjustment: Same as liability reduction = $22,000

      Note that with larger lease liabilities, the implied interest component is more significant in absolute terms. Here, more than half of the payment ($28,000 of $50,000) represents interest in the first year.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 50000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 50000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 22000
      },
      {
        account: "Lease Liability",
        debit: 22000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $400,000 × 7% = $28,000 (implied)",
      leaseExpense: "Full Cash Payment = $50,000",
      rouAssetAmortization: "Payment - Interest = $50,000 - $28,000 = $22,000",
      liabilityReduction: "Payment - Interest = $50,000 - $28,000 = $22,000"
    },
    successMessage: "Excellent! You've correctly recorded this large operating lease payment."
  },
  {
    id: 8,
    scenarioNumber: 8,
    leaseType: "operating",
    initialLeaseLiability: 80000,
    annualPayment: 10000,
    interestRate: 0.05,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario involves a smaller operating lease with an initial liability of $80,000, annual payments of $10,000, and a 5% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as a single Lease Expense
      2) The lease liability accrues implicit interest over the year
      3) Only the principal portion reduces the lease liability
      4) The ROU asset is reduced by the same amount as the liability

      Calculations:
      - Implied Interest: $80,000 × 5% = $4,000
      - Principal Portion: $10,000 - $4,000 = $6,000
      - Lease Expense: Full payment = $10,000
      - ROU Asset Adjustment: Same as liability reduction = $6,000

      Even with smaller leases, the same principles apply - the lease expense is straight-lined, while the balance sheet accounts are adjusted based on the effective interest method.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 10000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 10000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 6000
      },
      {
        account: "Lease Liability",
        debit: 6000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $80,000 × 5% = $4,000 (implied)",
      leaseExpense: "Full Cash Payment = $10,000",
      rouAssetAmortization: "Payment - Interest = $10,000 - $4,000 = $6,000",
      liabilityReduction: "Payment - Interest = $10,000 - $4,000 = $6,000"
    },
    successMessage: "Looks good! You've correctly recorded this operating lease payment."
  },
  {
    id: 9,
    scenarioNumber: 9,
    leaseType: "operating",
    initialLeaseLiability: 120000,
    annualPayment: 12000,
    interestRate: 0.05,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario features an operating lease with an initial liability of $120,000, annual payments of $12,000, and a 5% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) We record the full payment as Lease Expense
      2) We calculate implied interest on the lease liability
      3) Only the principal portion (payment minus interest) reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $120,000 × 5% = $6,000
      - Principal Portion: $12,000 - $6,000 = $6,000
      - Lease Expense: Full payment = $12,000
      - ROU Asset Adjustment: Same as liability reduction = $6,000

      In this particular case, exactly half of the payment goes toward interest and half toward principal in the first year - a coincidental but instructive example.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 12000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 12000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 6000
      },
      {
        account: "Lease Liability",
        debit: 6000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $120,000 × 5% = $6,000 (implied)",
      leaseExpense: "Full Cash Payment = $12,000",
      rouAssetAmortization: "Payment - Interest = $12,000 - $6,000 = $6,000",
      liabilityReduction: "Payment - Interest = $12,000 - $6,000 = $6,000"
    },
    successMessage: "Nice work! You've correctly recorded this operating lease payment."
  },
  {
    id: 10,
    scenarioNumber: 10,
    leaseType: "operating",
    initialLeaseLiability: 500000,
    annualPayment: 40000,
    interestRate: 0.06,
    paymentTiming: "End of Year",
    difficulty: 3,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario involves a large operating lease with an initial liability of $500,000, annual payments of $40,000, and a 6% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense
      2) We calculate implied interest based on the liability balance
      3) Only the principal portion reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $500,000 × 6% = $30,000
      - Principal Portion: $40,000 - $30,000 = $10,000
      - Lease Expense: Full payment = $40,000
      - ROU Asset Adjustment: Same as liability reduction = $10,000

      This is a case where a significant majority of the payment (75% or $30,000) represents interest in the first year due to the large lease liability and the interest rate. This ratio will change over time as the principal is paid down.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 40000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 40000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 10000
      },
      {
        account: "Lease Liability",
        debit: 10000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $500,000 × 6% = $30,000 (implied)",
      leaseExpense: "Full Cash Payment = $40,000",
      rouAssetAmortization: "Payment - Interest = $40,000 - $30,000 = $10,000",
      liabilityReduction: "Payment - Interest = $40,000 - $30,000 = $10,000"
    },
    successMessage: "Correct! You've properly recorded this operating lease with a high interest component."
  },
  {
    id: 11,
    scenarioNumber: 11,
    leaseType: "operating",
    initialLeaseLiability: 600000,
    annualPayment: 60000,
    interestRate: 0.08,
    paymentTiming: "End of Year",
    difficulty: 3,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario features a very large operating lease with an initial liability of $600,000, annual payments of $60,000, and a high 8% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense
      2) We calculate implied interest on the lease liability
      3) Only the principal portion reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $600,000 × 8% = $48,000
      - Principal Portion: $60,000 - $48,000 = $12,000
      - Lease Expense: Full payment = $60,000
      - ROU Asset Adjustment: Same as liability reduction = $12,000

      This scenario demonstrates how with large liabilities and high interest rates, the majority of early payments go toward interest. Here, 80% of the first payment ($48,000 of $60,000) represents interest.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 60000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 60000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 12000
      },
      {
        account: "Lease Liability",
        debit: 12000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $600,000 × 8% = $48,000 (implied)",
      leaseExpense: "Full Cash Payment = $60,000",
      rouAssetAmortization: "Payment - Interest = $60,000 - $48,000 = $12,000",
      liabilityReduction: "Payment - Interest = $60,000 - $48,000 = $12,000"
    },
    successMessage: "Excellent! You've correctly recorded this large operating lease with high interest."
  },
  {
    id: 12,
    scenarioNumber: 12,
    leaseType: "operating",
    initialLeaseLiability: 50000,
    annualPayment: 10000,
    interestRate: 0.04,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario involves a smaller operating lease with an initial liability of $50,000, annual payments of $10,000, and a 4% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense
      2) The lease liability accrues implied interest
      3) Only the principal portion (payment minus interest) reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $50,000 × 4% = $2,000
      - Principal Portion: $10,000 - $2,000 = $8,000
      - Lease Expense: Full payment = $10,000
      - ROU Asset Adjustment: Same as liability reduction = $8,000

      In this case, with a relatively low interest rate and small liability, a significant portion of the payment (80% or $8,000) goes toward reducing the principal in the first year.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 10000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 10000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 8000
      },
      {
        account: "Lease Liability",
        debit: 8000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $50,000 × 4% = $2,000 (implied)",
      leaseExpense: "Full Cash Payment = $10,000",
      rouAssetAmortization: "Payment - Interest = $10,000 - $2,000 = $8,000",
      liabilityReduction: "Payment - Interest = $10,000 - $2,000 = $8,000"
    },
    successMessage: "Right on! You've correctly recorded this operating lease with a high principal component."
  },
  {
    id: 13,
    scenarioNumber: 13,
    leaseType: "operating",
    initialLeaseLiability: 250000,
    annualPayment: 25000,
    interestRate: 0.06,
    paymentTiming: "Beginning of Year",
    difficulty: 4,
    task: "Record the journal entry for the first lease payment (no interest yet).",
    solution: [
      {
        account: "Lease Expense",
        debit: 25000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 25000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 25000
      },
      {
        account: "Lease Liability",
        debit: 25000,
        credit: null
      }
    ],
    keyCalculations: {
      overview: "This operating lease with beginning-of-year payments ($250,000 initial liability, $25,000 annual payment, 6% interest) has a fundamentally different first payment treatment compared to end-of-year leases. The timing means no interest has accrued yet.",
      interest: "No interest accrued yet = $0. Since the payment occurs at the very beginning of the lease term, no time has passed for interest to accrue on the lease liability.",
      leaseExpense: "Full Cash Payment = $25,000. As with all operating leases, the entire payment is recorded as a single lease expense line item.",
      rouAssetAmortization: "Full Payment = $25,000 (no interest component). The entire payment reduces the ROU asset since there is no interest component to consider.",
      liabilityReduction: "Full Payment = $25,000 (no interest component). The entire payment reduces the lease liability, unlike end-of-year payments where only the principal portion (payment minus interest) reduces the liability.",
      journalLogic: "Beginning-of-year payments create a larger initial reduction in both the lease liability and ROU asset compared to end-of-year payments. This key timing difference impacts the balance sheet immediately, though the income statement impact (lease expense) is the same regardless of timing."
    },
    successMessage: "Nicely done! You've correctly accounted for a beginning-of-year payment where no interest has accrued yet."
  },
  {
    id: 14,
    scenarioNumber: 14,
    leaseType: "operating",
    initialLeaseLiability: 200000,
    annualPayment: 15000,
    interestRate: 0.05,
    paymentTiming: "Beginning of Year",
    difficulty: 4,
    task: "Record the journal entry for the first lease payment (no interest yet).",
    explanation: `
      This scenario involves an operating lease with an initial liability of $200,000, annual payments of $15,000, and a 5% interest rate with beginning-of-year payments.
      
      For operating leases with beginning-of-year payments:
      1) The first payment occurs immediately upon lease commencement
      2) No interest has accrued yet, so the full payment is principal reduction
      3) The full payment is recorded as Lease Expense
      4) The ROU asset is adjusted by the same amount as the liability

      Calculations:
      - Implied Interest: $0 (no time has passed for interest to accrue)
      - Principal Portion: Full payment = $15,000
      - Lease Expense: Full payment = $15,000
      - ROU Asset Adjustment: Same as liability reduction = $15,000

      The beginning-of-year payment timing creates a simpler first entry since no interest calculation is needed. Subsequent payments will involve an interest component based on the remaining lease liability.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 15000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 15000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 15000
      },
      {
        account: "Lease Liability",
        debit: 15000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "No interest accrued yet = $0",
      leaseExpense: "Full Cash Payment = $15,000",
      rouAssetAmortization: "Full Payment = $15,000 (no interest component)",
      liabilityReduction: "Full Payment = $15,000 (no interest component)"
    },
    successMessage: "Great! You've properly recorded this beginning-of-year operating lease payment."
  },
  {
    id: 15,
    scenarioNumber: 15,
    leaseType: "operating",
    initialLeaseLiability: 300000,
    annualPayment: 30000,
    interestRate: 0.04,
    paymentTiming: "Beginning of Year",
    difficulty: 4,
    task: "Record the journal entry for the first lease payment (no interest yet).",
    explanation: `
      This scenario involves an operating lease with an initial liability of $300,000, annual payments of $30,000, and a 4% interest rate with beginning-of-year payments.
      
      For operating leases with beginning-of-year payments:
      1) The first payment occurs immediately upon lease commencement
      2) No interest has had time to accrue, so the full payment reduces principal
      3) The full cash payment is recorded as Lease Expense
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $0 (no time has passed for interest to accrue)
      - Principal Portion: Full payment = $30,000
      - Lease Expense: Full payment = $30,000
      - ROU Asset Adjustment: Same as liability reduction = $30,000

      This beginning-of-year payment pattern results in larger initial reductions to both the lease liability and ROU asset compared to end-of-year payments, where a portion would go to interest.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 30000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 30000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 30000
      },
      {
        account: "Lease Liability",
        debit: 30000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "No interest accrued yet = $0",
      leaseExpense: "Full Cash Payment = $30,000",
      rouAssetAmortization: "Full Payment = $30,000 (no interest component)",
      liabilityReduction: "Full Payment = $30,000 (no interest component)"
    },
    successMessage: "All set! You've correctly recorded this beginning-of-year payment."
  },
  {
    id: 16,
    scenarioNumber: 16,
    leaseType: "operating",
    initialLeaseLiability: 100000,
    annualPayment: 20000,
    interestRate: 0.10,
    paymentTiming: "Beginning of Year",
    difficulty: 5,
    task: "Record the journal entry for the first lease payment (no interest yet).",
    explanation: `
      This scenario features an operating lease with an initial liability of $100,000, annual payments of $20,000, and a high 10% interest rate with beginning-of-year payments.
      
      For operating leases with beginning-of-year payments:
      1) The first payment is made at lease commencement
      2) No interest has accrued yet since no time has passed
      3) The full payment is recorded as Lease Expense
      4) The entire payment reduces the lease liability and ROU asset

      Calculations:
      - Implied Interest: $0 (no time has passed for interest to accrue)
      - Principal Portion: Full payment = $20,000
      - Lease Expense: Full payment = $20,000
      - ROU Asset Adjustment: Same as liability reduction = $20,000

      Note that even with this high 10% interest rate, the timing (beginning-of-year) means the first payment is entirely principal reduction. For subsequent years, interest will accrue on the reduced liability of $80,000.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 20000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 20000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 20000
      },
      {
        account: "Lease Liability",
        debit: 20000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "No interest accrued yet = $0",
      leaseExpense: "Full Cash Payment = $20,000",
      rouAssetAmortization: "Full Payment = $20,000 (no interest component)",
      liabilityReduction: "Full Payment = $20,000 (no interest component)"
    },
    successMessage: "Correct! You've properly handled this beginning-of-year payment with a high interest rate."
  },
  {
    id: 17,
    scenarioNumber: 17,
    leaseType: "operating",
    initialLeaseLiability: 400000,
    annualPayment: 50000,
    interestRate: 0.07,
    paymentTiming: "Beginning of Year",
    difficulty: 5,
    task: "Record the journal entry for the first lease payment (no interest yet).",
    explanation: `
      This scenario involves a large operating lease with an initial liability of $400,000, annual payments of $50,000, and a 7% interest rate with beginning-of-year payments.
      
      For operating leases with beginning-of-year payments:
      1) The payment occurs immediately at lease commencement
      2) No interest has accrued yet (no time has passed)
      3) The full payment is recorded as Lease Expense
      4) The ROU asset and lease liability are reduced by the full payment amount

      Calculations:
      - Implied Interest: $0 (no time has passed for interest to accrue)
      - Principal Portion: Full payment = $50,000
      - Lease Expense: Full payment = $50,000
      - ROU Asset Adjustment: Same as liability reduction = $50,000

      The larger payment amount here ($50,000) means a significant immediate reduction to both the lease liability and ROU asset - something that wouldn't happen with end-of-year payments, where a substantial portion would go to interest.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 50000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 50000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 50000
      },
      {
        account: "Lease Liability",
        debit: 50000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "No interest accrued yet = $0",
      leaseExpense: "Full Cash Payment = $50,000",
      rouAssetAmortization: "Full Payment = $50,000 (no interest component)",
      liabilityReduction: "Full Payment = $50,000 (no interest component)"
    },
    successMessage: "Perfect! You've correctly recorded this larger beginning-of-year payment."
  },
  {
    id: 18,
    scenarioNumber: 18,
    leaseType: "operating",
    initialLeaseLiability: 200000,
    interestRate: 0.05,
    annualPayment: 15000,
    firstPayment: 18000,
    paymentTiming: "End of Year",
    additionalInfo: "Includes $3,000 variable portion",
    difficulty: 6,
    task: "Record the first lease payment (with variable portion).",
    solution: [
      {
        account: "Lease Expense",
        debit: 18000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 18000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 8000
      },
      {
        account: "Lease Liability",
        debit: 8000,
        credit: null
      }
    ],
    keyCalculations: {
      overview: "This complex scenario involves an operating lease with a variable payment component (initial liability $200,000, standard payment $15,000, but first payment $18,000 including a $3,000 variable portion, 5% interest rate, end-of-year payment).",
      interest: "Initial Liability × Interest Rate = $200,000 × 5% = $10,000 (implied). Interest is calculated only on the fixed portion known at lease commencement.",
      leaseExpense: "Fixed Payment ($15,000) + Variable Payment ($3,000) = $18,000. The entire payment, including the variable portion, is expensed in the income statement.",
      liabilityCalculation: "Under ASC 842, variable lease payments that depend on an index or rate are included in the lease liability, but other variable payments are not. Here, the $3,000 variable portion isn't part of the original liability calculation.",
      rouAssetAmortization: "For this specific entry, the ROU asset is reduced by $8,000. The variable payment affects the lease expense but not the ROU asset amortization pattern.",
      liabilityReduction: "Calculated as $8,000, which represents the principal portion of the fixed payment component. The variable portion does not affect the liability reduction.",
      journalLogic: "Variable lease payments add complexity because they affect the total cash outflow and expense recognition but not the original lease liability calculation. They are expensed as incurred rather than included in the initial lease liability measurement."
    },
    successMessage: "Nice! You've correctly handled this more complex scenario with a variable payment component."
  },
  {
    id: 19,
    scenarioNumber: 19,
    leaseType: "operating",
    initialLeaseLiability: 250000,
    annualPayment: 25000,
    interestRate: 0.06,
    paymentTiming: "End of Year",
    difficulty: 2,
    task: "Record the journal entry for the first lease payment.",
    explanation: `
      This scenario involves an operating lease with an initial liability of $250,000, annual payments of $25,000, and a 6% interest rate with end-of-year payments.
      
      For operating leases with end-of-year payments:
      1) The full payment is recorded as Lease Expense
      2) We calculate implied interest on the lease liability
      3) Only the principal portion (payment minus interest) reduces the lease liability
      4) The ROU asset is adjusted by the same amount

      Calculations:
      - Implied Interest: $250,000 × 6% = $15,000
      - Principal Portion: $25,000 - $15,000 = $10,000
      - Lease Expense: Full payment = $25,000
      - ROU Asset Adjustment: Same as liability reduction = $10,000

      This is a typical operating lease scenario where a significant portion of the early payments (60% in this case) goes toward implied interest due to the relatively high balance of the lease liability.
    `,
    solution: [
      {
        account: "Lease Expense",
        debit: 25000,
        credit: null
      },
      {
        account: "Cash",
        debit: null,
        credit: 25000
      },
      {
        account: "Right-of-Use Asset",
        debit: null,
        credit: 10000
      },
      {
        account: "Lease Liability",
        debit: 10000,
        credit: null
      }
    ],
    keyCalculations: {
      interest: "Initial Liability × Interest Rate = $250,000 × 6% = $15,000 (implied)",
      leaseExpense: "Full Cash Payment = $25,000",
      rouAssetAmortization: "Payment - Interest = $25,000 - $15,000 = $10,000",
      liabilityReduction: "Payment - Interest = $25,000 - $15,000 = $10,000"
    },
    successMessage: "Congratulations! You've successfully completed all the lease journal entries in this app!"
  }
];

export default scenarios;