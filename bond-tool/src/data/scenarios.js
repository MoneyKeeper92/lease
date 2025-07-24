// src/data/scenarios.js
const scenarios = [
  {
    id: 1,
    scenarioNumber: 1,
    bondType: "par",
    faceValue: 100000,
    couponRate: 0.08,
    marketRate: 0.08,
    term: 5, // years
    paymentFrequency: "annual", // can be annual, semiannual
    issuePrice: 100000,
    difficulty: 1,
    task: "Record the issuance of bonds at par.",
    solution: [
      {
        account: "Cash",
        debit: 100000,
        credit: null
      },
      {
        account: "Bonds Payable",
        debit: null,
        credit: 100000
      }
    ],
    keyCalculations: {
      overview: "Bonds issued at par mean the coupon rate equals the market rate. The company receives cash equal to the face value.",
      issuePrice: "Face Value = $100,000 (since Coupon Rate = Market Rate)",
      journalLogic: "Debit Cash for the proceeds received, Credit Bonds Payable for the face value of the obligation."
    },
    successMessage: "Correct! Bonds issued at par."
  },
  {
    id: 2,
    scenarioNumber: 2,
    bondType: "discount",
    faceValue: 100000,
    couponRate: 0.06,
    marketRate: 0.08,
    term: 5, // years
    paymentFrequency: "annual", 
    issuePrice: 92015, // Example calculated PV
    difficulty: 2,
    task: "Record the issuance of bonds at a discount.",
    solution: [
      {
        account: "Cash",
        debit: 92015,
        credit: null
      },
      {
        account: "Discount on Bonds Payable",
        debit: 7985, 
        credit: null
      },
      {
        account: "Bonds Payable",
        debit: null,
        credit: 100000
      }
    ],
    keyCalculations: {
      overview: "Bonds issued at a discount mean the coupon rate is less than the market rate. The company receives less cash than the face value.",
      issuePrice: "Present Value of Face Value + Present Value of Interest Payments (using market rate) = $92,015 (example)",
      discount: "Face Value - Issue Price = $100,000 - $92,015 = $7,985",
      journalLogic: "Debit Cash for proceeds, Debit Discount (contra-liability) for the difference, Credit Bonds Payable for face value."
    },
    successMessage: "Correct! Bonds issued at a discount."
  },
  {
    id: 3,
    scenarioNumber: 3,
    bondType: "premium",
    faceValue: 100000,
    couponRate: 0.10,
    marketRate: 0.08,
    term: 5, // years
    paymentFrequency: "annual",
    issuePrice: 107985, // Example calculated PV
    difficulty: 2,
    task: "Record the issuance of bonds at a premium.",
    solution: [
      {
        account: "Cash",
        debit: 107985,
        credit: null
      },
      {
        account: "Premium on Bonds Payable",
        debit: null,
        credit: 7985
      },
      {
        account: "Bonds Payable",
        debit: null,
        credit: 100000
      }
    ],
    keyCalculations: {
      overview: "Bonds issued at a premium mean the coupon rate is greater than the market rate. The company receives more cash than the face value.",
      issuePrice: "Present Value of Face Value + Present Value of Interest Payments (using market rate) = $107,985 (example)",
      premium: "Issue Price - Face Value = $107,985 - $100,000 = $7,985",
      journalLogic: "Debit Cash for proceeds, Credit Premium (adjunct liability), Credit Bonds Payable for face value."
    },
    successMessage: "Correct! Bonds issued at a premium."
  },
  {
    id: 4, // Assuming this follows the discount bond (ID 2)
    scenarioNumber: 4,
    bondType: "discount",
    faceValue: 100000,
    couponRate: 0.06,
    marketRate: 0.08,
    carryingValueStart: 92015,
    term: 5, // years
    paymentFrequency: "annual",
    amortizationMethod: "effective interest", // or straight-line
    difficulty: 3,
    task: "Record the first annual interest payment and discount amortization using the effective interest method.",
    solution: [
      {
        account: "Interest Expense",
        debit: 7361, // Carrying Value * Market Rate = 92015 * 0.08
        credit: null
      },
      {
        account: "Discount on Bonds Payable",
        debit: null,
        credit: 1361 // Interest Expense - Cash Interest = 7361 - 6000
      },
      {
        account: "Cash",
        debit: null,
        credit: 6000 // Face Value * Coupon Rate = 100000 * 0.06
      }
    ],
    keyCalculations: {
      overview: "Interest payment involves paying cash based on coupon rate, recording interest expense based on market rate and carrying value, and amortizing the discount.",
      cashInterest: "Face Value × Coupon Rate = $100,000 × 6% = $6,000",
      interestExpense: "Carrying Value × Market Rate = $92,015 × 8% = $7,361",
      discountAmortization: "Interest Expense - Cash Interest = $7,361 - $6,000 = $1,361",
      journalLogic: "Debit Interest Expense, Credit Discount (reducing it), Credit Cash."
    },
    successMessage: "Correct! Interest payment and discount amortization recorded."
  }
  // --- Add more scenarios for premium amortization, bond retirement, etc. ---
];

export default scenarios; 