// src/data/scenarios.js
const scenarios = [
  // === ANNUAL - FACE VALUE – FIRST PAYMENT ===
  {
    id: 1,
    scenarioNumber: 1,
    bondType: "face",
    faceValue: 100000,
    statedRate: 0.05,
    effectiveRate: 0.05,
    lifeYears: 5,
    paymentFrequency: "Annual",
    issuePrice: 100000,
    amortizationMethod: null,
    scenarioDate: "2024-12-31",
    carryingValueBOY: 100000,
    difficulty: 1,
    task: "Record the first interest payment on a bond issued at face value.",
    solution: [
      { account: "Interest Expense", debit: 5000, credit: null },
      { account: "Cash",             debit: null, credit: 5000 }
    ],
    keyCalculations: {
      overview: "Because the stated and effective rates are equal, the bond was issued at par. Each annual payment is simply interest cash outflow.",
      interestExpense: "$100,000 × 5% = $5,000",
      journalLogic: "Only two lines are needed: debit the expense and credit cash. No premium/discount amortization applies."
    },
    successMessage: "Great job! You recorded the interest expense correctly for a par-value bond."
  },

  // === ANNUAL - PREMIUM BOND – FIRST PAYMENT ===
  {
    id: 2,
    scenarioNumber: 2,
    bondType: "premium",
    faceValue: 200000,
    statedRate: 0.06,
    effectiveRate: 0.05,
    lifeYears: 4,
    paymentFrequency: "Annual",
    issuePrice: 207092,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2024-12-31",
    carryingValueBOY: 207092,
    difficulty: 2,
    task: "Record the first interest payment for a premium bond using the effective-interest method.",
    solution: [
      { account: "Interest Expense",          debit: 10355, credit: null },
      { account: "Premium on Bonds Payable",  debit: 1645,  credit: null },
      { account: "Cash",                      debit: null,  credit: 12000 }
    ],
    keyCalculations: {
      overview: "Cash interest equals the coupon (6%) while expense is based on the carrying amount at the market (5%). The excess cash over expense reduces the premium.",
      cashInterest: "$200,000 × 6% = $12,000",
      interestExpense: "$207,092 × 5% = $10,355",
      premiumAmortization: "$12,000 - $10,355 ≈ $1,645",
      journalLogic: "Debit expense, debit premium (to reduce it), credit the cash paid."
    },
    successMessage: "Correct! You applied the effective-interest method and reduced the premium."
  },

  // === ANNUAL - DISCOUNT BOND – FIRST PAYMENT ===
  {
    id: 3,
    scenarioNumber: 3,
    bondType: "discount",
    faceValue: 150000,
    statedRate: 0.04,
    effectiveRate: 0.05,
    lifeYears: 3,
    paymentFrequency: "Annual",
    issuePrice: 145864,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2024-12-31",
    carryingValueBOY: 145864,
    difficulty: 2,
    task: "Record the first interest payment for a discount bond using the effective-interest method.",
    solution: [
      { account: "Interest Expense",           debit: 7293, credit: null },
      { account: "Discount on Bonds Payable",  debit: null, credit: 1293 },
      { account: "Cash",                       debit: null, credit: 6000 }
    ],
    keyCalculations: {
      overview: "Because the coupon (4%) is below the market (5%) the bond sold at a discount. Interest expense therefore exceeds the cash paid, and the discount is amortized (credited).",
      cashInterest: "$150,000 × 4% = $6,000",
      interestExpense: "$145,864 × 5% = $7,293",
      discountAmortization: "$7,293 - $6,000 = $1,293"
    },
    successMessage: "Nice! You increased the carrying value by amortizing the discount."
  },

  // === SEMI-ANNUAL - FACE VALUE – FIRST PAYMENT ===
  {
    id: 4,
    scenarioNumber: 4,
    bondType: "face",
    faceValue: 300000,
    statedRate: 0.04,
    effectiveRate: 0.04,
    lifeYears: 2,
    paymentFrequency: "Semi-annual",
    issuePrice: 300000,
    amortizationMethod: null,
    scenarioDate: "2024-06-30",
    carryingValueBOY: 300000,
    difficulty: 1,
    task: "Record the first semi-annual payment on a par bond.",
    solution: [
      { account: "Interest Expense", debit: 6000, credit: null },
      { account: "Cash",             debit: null, credit: 6000 }
    ],
    keyCalculations: {
      interestExpense: "$300,000 × 2% = $6,000 for six months"
    },
    successMessage: "Great! Semi-annual at par is as easy as it gets."
  },

  // === SEMI-ANNUAL - PREMIUM – FIRST PAYMENT ===
  {
    id: 5,
    scenarioNumber: 5,
    bondType: "premium",
    faceValue: 500000,
    statedRate: 0.05,
    effectiveRate: 0.04,
    lifeYears: 3,
    paymentFrequency: "Semi-annual",
    issuePrice: 514015,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2024-06-30",
    carryingValueBOY: 514015,
    difficulty: 3,
    task: "Record the first semi-annual payment for a premium bond.",
    solution: [
      { account: "Interest Expense",          debit: 10280, credit: null },
      { account: "Premium on Bonds Payable",  debit: 2220,  credit: null },
      { account: "Cash",                      debit: null,  credit: 12500 }
    ],
    keyCalculations: {
      cashInterest: "$500,000 × 2.5% = $12,500",
      interestExpense: "$514,015 × 2% = $10,280",
      premiumAmortization: "$12,500 - $10,280 = $2,220"
    },
    successMessage: "Spot on! You reduced the premium for the first time."
  },

  // === SEMI-ANNUAL - DISCOUNT – FIRST PAYMENT ===
  {
    id: 6,
    scenarioNumber: 6,
    bondType: "discount",
    faceValue: 400000,
    statedRate: 0.03,
    effectiveRate: 0.04,
    lifeYears: 2,
    paymentFrequency: "Semi-annual",
    issuePrice: 392447,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2024-06-30",
    carryingValueBOY: 392447,
    difficulty: 3,
    task: "Record the first semi-annual payment for a discount bond.",
    solution: [
      { account: "Interest Expense",           debit: 7849, credit: null },
      { account: "Discount on Bonds Payable",  debit: null, credit: 1849 },
      { account: "Cash",                       debit: null, credit: 6000 }
    ],
    keyCalculations: {
      cashInterest: "$400,000 × 1.5% = $6,000",
      interestExpense: "$392,447 × 2% = $7,849",
      discountAmortization: "$7,849 - $6,000 = $1,849"
    },
    successMessage: "Good! The carrying amount increased via discount amortization."
  },

  // === ACCRUAL - PREMIUM – FIRST ACCRUAL (Mid-Year Issue) ===
  {
    id: 7,
    scenarioNumber: 7,
    bondType: "premium",
    faceValue: 300000,
    statedRate: 0.06,
    effectiveRate: 0.05,
    lifeYears: 4,
    paymentFrequency: "Annual (30-Jun)",
    issuePrice: 308527,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2024-12-31",
    carryingValueBOY: 308527,
    difficulty: 4,
    task: "Accrue six-months interest (Jul-Dec) on a premium bond at fiscal year-end.",
    solution: [
      { account: "Interest Expense",          debit: 7713, credit: null },
      { account: "Premium on Bonds Payable",  debit: 1287, credit: null },
      { account: "Interest Payable",          debit: null, credit: 9000 }
    ],
    keyCalculations: {
      interestExpense: "$308,527 × 5% × 6/12 = $7,713",
      cashInterest6mo: "$300,000 × 6% × 6/12 = $9,000",
      premiumAmortization: "$9,000 - $7,713 = $1,287"
    },
    successMessage: "Accrual done! You'll reverse this when cash is paid on 30-Jun."
  },

  // === ACCRUAL - DISCOUNT – FIRST ACCRUAL (Mid-Year Issue) ===
  {
    id: 8,
    scenarioNumber: 8,
    bondType: "discount",
    faceValue: 250000,
    statedRate: 0.04,
    effectiveRate: 0.05,
    lifeYears: 3,
    paymentFrequency: "Annual (30-Jun)",
    issuePrice: 245055,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2024-12-31",
    carryingValueBOY: 245055,
    difficulty: 4,
    task: "Accrue six-months interest (Jul-Dec) on a discount bond at fiscal year-end.",
    solution: [
      { account: "Interest Expense",           debit: 6126, credit: null },
      { account: "Discount on Bonds Payable",  debit: null, credit: 1126 },
      { account: "Interest Payable",           debit: null, credit: 5000 }
    ],
    keyCalculations: {
      overview: "This is an accrual entry only - no cash is paid at this time. Cash payment will occur on the next coupon date (June 30).",
      cashInterest6mo: "$250,000 × 4% × 6/12 = $5,000 (accrued but not paid)",
      interestExpense: "$245,055 × 5% × 6/12 = $6,126",
      discountAmortization: "$6,126 - $5,000 = $1,126",
      journalLogic: "Interest Payable is credited instead of Cash since no payment occurs on Dec 31"
    },
    successMessage: "Good accrual! The discount winnows down even without cash."
  },

  // Scenario 9 - Fixed bond price calculations using provided PV factors
  {
    id: 9,
    scenarioNumber: 9,
    bondType: "discount",
    faceValue: 500000,
    statedRate: 0.05,
    effectiveRate: 0.06,
    lifeYears: 6,
    paymentFrequency: "Semi-annual",
    issuePrice: 475125, // Corrected calculation
    amortizationMethod: "Effective Interest",
    scenarioDate: "2025-01-01",
    carryingValueBOY: null, // Not applicable for initial entry
    difficulty: 3,
    task: "Using the provided present value factors, calculate the bond issuance price for Hanover Corp. and record the initial journal entry (rounded to nearest dollar).",
    pvFactors: {
      title: "Present Value Factors",
      factors: [
        { description: "PV of $1 at 2.5% for 12 periods", value: 0.7428 },
        { description: "PV of $1 at 3% for 12 periods", value: 0.7014 },
        { description: "PV of an annuity of $1 at 2.5% for 12 periods", value: 10.2578 },
        { description: "PV of an annuity of $1 at 3% for 12 periods", value: 9.9540 }
      ],
      hint: "Remember to use the appropriate semi-annual rates and periods for your calculations."
    },
    solution: [
      { account: "Cash", debit: 475125, credit: null },
      { account: "Discount on Bonds Payable", debit: 24875, credit: null },
      { account: "Bonds Payable", debit: null, credit: 500000 }
    ],
    keyCalculations: {
      overview: "Since the stated rate (5%) is less than the market rate (6%), the bond will sell at a discount.",
      semiAnnualInterest: "$500,000 × 5% ÷ 2 = $12,500 per period",
      semiAnnualRate: "Stated: 5% ÷ 2 = 2.5%; Market: 6% ÷ 2 = 3%",
      numberOfPeriods: "6 years × 2 payments per year = 12 periods",
      pvFaceValue: "$500,000 × 0.7014 = $350,700",
      pvInterestPayments: "$12,500 × 9.9540 = $124,425",
      bondPrice: "$350,700 + $124,425 = $475,125",
      discount: "$500,000 - $475,125 = $24,875",
      journalLogic: "The bond is issued at a discount, so we debit Cash for the proceeds, debit Discount on Bonds Payable for the difference, and credit Bonds Payable for the face value."
    },
    successMessage: "Well done! You've correctly calculated the bond price using present value factors and recorded the initial journal entry for a discount bond."
  },

  // Scenario 10 - No errors reported
  {
    id: 10,
    scenarioNumber: 10,
    bondType: "discount",
    faceValue: 400000,
    statedRate: 0.06,
    effectiveRate: 0.07,
    lifeYears: 5,
    paymentFrequency: "Annual",
    issuePrice: 383605,
    amortizationMethod: "Effective Interest",
    scenarioDate: "2025-01-01",
    carryingValueBOY: null, // Not applicable for initial entry
    difficulty: 3,
    task: "Using the provided present value factors, calculate the bond issuance price for Meridian Industries and record the initial journal entry (rounded to nearest dollar).",
    pvFactors: {
      title: "Present Value Factors",
      factors: [
        { description: "PV of $1 at 6% for 5 periods", value: 0.7473 },
        { description: "PV of $1 at 7% for 5 periods", value: 0.7130 },
        { description: "PV of an annuity of $1 at 6% for 5 periods", value: 4.2124 },
        { description: "PV of an annuity of $1 at 7% for 5 periods", value: 4.1002 }
      ],
      hint: "Since these are annual payments, use the annual rates directly with the corresponding factors."
    },
    solution: [
      { account: "Cash", debit: 383605, credit: null },
      { account: "Discount on Bonds Payable", debit: 16395, credit: null },
      { account: "Bonds Payable", debit: null, credit: 400000 }
    ],
    keyCalculations: {
      overview: "Since the stated rate (6%) is less than the market rate (7%), the bond will sell at a discount. With annual payments, we use the annual rates directly in our calculations.",
      annualInterest: "$400,000 × 6% = $24,000 per year",
      pvFaceValue: "$400,000 × 0.7130 = $285,200",
      pvInterestPayments: "$24,000 × 4.1002 = $98,405",
      bondPrice: "$285,200 + $98,405 = $383,605",
      discount: "$400,000 - $383,605 = $16,395",
      journalLogic: "The bond is issued at a discount, so we debit Cash for the proceeds received, debit Discount on Bonds Payable for the difference between face value and proceeds, and credit Bonds Payable for the face value."
    },
    successMessage: "Excellent! You've correctly calculated the bond price using present value factors and recorded the initial journal entry for a discount bond with annual payments."
  },

  // Scenario 11 - Fixed premium bond price calculations
  {
    id: 11,
    scenarioNumber: 11,
    bondType: "premium",
    faceValue: 600000,
    statedRate: 0.09,
    effectiveRate: 0.07,
    lifeYears: 4,
    paymentFrequency: "Annual",
    issuePrice: 640649, // Corrected calculation
    amortizationMethod: "Effective Interest",
    scenarioDate: "2025-01-01",
    carryingValueBOY: null, // Not applicable for initial entry
    difficulty: 3,
    task: "Using the provided present value factors, calculate the bond issuance price for Aspen Technologies and record the initial journal entry (rounded to nearest dollar).",
    pvFactors: {
      title: "Present Value Factors",
      factors: [
        { description: "PV of $1 at 7% for 4 periods", value: 0.7629 },
        { description: "PV of $1 at 9% for 4 periods", value: 0.7084 },
        { description: "PV of an annuity of $1 at 7% for 4 periods", value: 3.3872 },
        { description: "PV of an annuity of $1 at 9% for 4 periods", value: 3.2397 }
      ],
      hint: "Use the market rate (7%) for discounting both the face value and the interest payments."
    },
    solution: [
      { account: "Cash", debit: 640649, credit: null },
      { account: "Premium on Bonds Payable", debit: null, credit: 40649 },
      { account: "Bonds Payable", debit: null, credit: 600000 }
    ],
    keyCalculations: {
      overview: "Since the stated rate (9%) is higher than the market rate (7%), the bond will sell at a premium.",
      annualInterest: "$600,000 × 9% = $54,000 per year",
      pvFaceValue: "$600,000 × 0.7629 = $457,740",
      pvInterestPayments: "$54,000 × 3.3872 = $182,909",
      bondPrice: "$457,740 + $182,909 = $640,649",
      premium: "$640,649 - $600,000 = $40,649",
      journalLogic: "The bond is issued at a premium, so we debit Cash for the proceeds received, credit Premium on Bonds Payable for the excess over face value, and credit Bonds Payable for the face value."
    },
    successMessage: "Excellent! You've correctly calculated the bond price using present value factors and recorded the initial journal entry for a premium bond with annual payments."
  },

  // Scenario 12 - Fixed discount bond price calculations
  {
    id: 12,
    scenarioNumber: 12,
    bondType: "discount",
    faceValue: 1000000,
    statedRate: 0.05,
    effectiveRate: 0.06,
    lifeYears: 8,
    paymentFrequency: "Semi-annual",
    issuePrice: 921648, // Corrected calculation
    amortizationMethod: "Effective Interest",
    scenarioDate: "2025-01-01",
    carryingValueBOY: null, // Not applicable for initial entry
    difficulty: 4,
    task: "Using the provided present value factors, calculate the bond issuance price for Crescent Manufacturing and record the initial journal entry (rounded to nearest dollar).",
    pvFactors: {
      title: "Present Value Factors",
      factors: [
        { description: "PV of $1 at 2.5% for 16 periods", value: 0.6723 },
        { description: "PV of $1 at 3% for 16 periods", value: 0.6232 },
        { description: "PV of an annuity of $1 at 2.5% for 16 periods", value: 12.5611 },
        { description: "PV of an annuity of $1 at 3% for 16 periods", value: 11.9379 }
      ],
      hint: "Remember to convert annual rates to semi-annual rates and identify the correct number of semi-annual periods."
    },
    solution: [
      { account: "Cash", debit: 921648, credit: null },
      { account: "Discount on Bonds Payable", debit: 78352, credit: null },
      { account: "Bonds Payable", debit: null, credit: 1000000 }
    ],
    keyCalculations: {
      overview: "Since the stated rate (5%) is lower than the market rate (6%), the bond will sell at a discount. With semi-annual payments, we need to convert the annual rates to semi-annual rates.",
      semiAnnualInterest: "$1,000,000 × 5% ÷ 2 = $25,000 per period",
      semiAnnualRates: "Stated: 5% ÷ 2 = 2.5%; Market: 6% ÷ 2 = 3%",
      numberOfPeriods: "8 years × 2 payments per year = 16 periods",
      pvFaceValue: "$1,000,000 × 0.6232 = $623,200",
      pvInterestPayments: "$25,000 × 11.9379 = $298,448",
      bondPrice: "$623,200 + $298,448 = $921,648",
      discount: "$1,000,000 - $921,648 = $78,352",
      journalLogic: "The bond is issued at a discount, so we debit Cash for the proceeds received, debit Discount on Bonds Payable for the difference between face value and proceeds, and credit Bonds Payable for the face value."
    },
    successMessage: "Well done! You've correctly calculated the bond price using present value factors and recorded the initial journal entry for a discount bond with semi-annual payments."
  },

  // Scenario 13 - No errors reported
  {
    id: 13,
    scenarioNumber: 13,
    bondType: "face",
    faceValue: 500000,
    statedRate: 0.08,
    effectiveRate: 0.08,
    lifeYears: 10,
    paymentFrequency: "Semi-annual",
    issuePrice: 500000,
    amortizationMethod: null,
    scenarioDate: "February 28, Year 1",
    carryingValueBOY: 500000,
    difficulty: 2,
    task: "Phoenix Corp. issued $500,000 maturity value, 8 percent bonds for $500,000 cash on February 28, Year 1. The bonds are dated January 31, Year 1, and mature on January 31, Year 11. Interest is paid semi-annually on July 31 and January 31. What amount of accrued interest payable should Phoenix report in its May 31, Year 1, balance sheet?",
    solution: [
      { account: "Interest Expense", debit: 10000, credit: null },
      { account: "Interest Payable",  debit: null, credit: 10000 }
    ],
    keyCalculations: {
      overview: "This problem requires calculating interest that has accrued since the last interest payment date (or bond issuance date if no payment has been made yet) up to the balance sheet date.",
      annualInterest: "$500,000 × 8% = $40,000",
      semiAnnualInterest: "$40,000 ÷ 2 = $20,000 per payment",
      accrualPeriod: "From February 28, Year 1 (issuance) to May 31, Year 1 = 3 months",
      accrualCalculation: "$40,000 × 3/12 = $10,000",
      journalLogic: "Since no interest has been paid yet, we accrue three months of interest by debiting Interest Expense and crediting Interest Payable."
    },
    successMessage: "Correct! You've properly calculated the three months of accrued interest from issuance to the balance sheet date."
  },

  // Scenario 14 - Fix interest expense calculation for premium bond
  {
    "id": 14,
    "scenarioNumber": 14,
    "bondType": "premium",
    "faceValue": 750000,
    "statedRate": 0.09,
    "effectiveRate": 0.08,
    "lifeYears": 15,
    "paymentFrequency": "Semi-annual",
    "issuePrice": 787950,
    "amortizationMethod": "Effective Interest",
    "scenarioDate": "2024-10-31",
    "carryingValueBOY": 787950,
    "difficulty": 3,
    "task": "Madison Industries issued $750,000 maturity value, 9 percent bonds for $787,950 cash on January 1, 2024. The bonds mature on December 31, 2038. Interest is paid semi-annually on June 30 and December 31. What amount of accrued interest payable should Madison report in its October 31, 2024, balance sheet?",
    "solution": [
      { "account": "Interest Expense", "debit": 20952, "credit": null },
      { "account": "Premium on Bonds Payable", "debit": 1548, "credit": null },
      { "account": "Interest Payable", "debit": null, "credit": 22500 }
    ],
    "keyCalculations": {
      "overview": "This problem accounts for both the accrued interest (based on stated rate) and the amortization of premium (based on the difference between stated and effective rates).",
      "annualInterest": "$750,000 × 9% = $67,500",
      "semiAnnualInterest": "$67,500 ÷ 2 = $33,750 per payment",
      "firstPaymentDetails": {
        "cashInterest": "$33,750 (June 30 payment)",
        "interestExpense": "$787,950 × 8% × 6/12 = $31,518",
        "premiumAmortization": "$33,750 - $31,518 = $2,232",
        "carryingValueAfterPayment": "$787,950 - $2,232 = $785,718"
      },
      "accrualPeriod": "From June 30, 2024 (last payment) to October 31, 2024 (balance sheet date) = 4 months",
      "cashInterestAccrual": "$750,000 × 9% × 4/12 = $22,500",
      "interestExpenseAccrual": "$785,718 × 8% × 4/12 = $20,952",
      "premiumAmortization": "$22,500 - $20,952 = $1,548",
      "journalLogic": "For effective-interest method, we accrue interest expense based on the carrying value at the effective rate, reduce the premium, and accrue the interest payable based on face value and stated rate."
    },
    "successMessage": "Well done! You've properly accounted for both accrued interest and premium amortization during the accrual period."
  },

  // Scenario 15 - No errors reported
  {
    id: 15,
    scenarioNumber: 15,
    bondType: "discount",
    faceValue: 200000,
    statedRate: 0.05,
    effectiveRate: 0.065,
    lifeYears: 4,
    paymentFrequency: "Annual",
    issuePrice: 188452,
    amortizationMethod: "Straight-Line",
    scenarioDate: "January 1, Year 1",
    carryingValueBOY: null,
    difficulty: 3,
    task: "Horizon uses the straight-line method of amortization. Calculate the interest expense for Year 3 (rounded to nearest dollar).",
    solution: [
      { account: "Interest Expense", debit: 12887, credit: null },
      { account: "Discount on Bonds Payable", debit: null, credit: 2887 },
      { account: "Cash", debit: null, credit: 10000 }
    ],
    keyCalculations: {
      overview: "Under straight-line amortization, the discount is amortized in equal amounts over the life of the bonds.",
      totalDiscount: "$200,000 - $188,452 = $11,548",
      annualAmortization: "$11,548 ÷ 4 years = $2,887 per year",
      annualCashInterest: "$200,000 × 5% = $10,000",
      interestExpense: "$10,000 + $2,887 = $12,887",
      carryingValue: {
        yearStart: [
          { year: "Year 1", value: "$188,452" },
          { year: "Year 2", value: "$191,339 (=$188,452 + $2,887)" },
          { year: "Year 3", value: "$194,226 (=$191,339 + $2,887)" },
          { year: "Year 4", value: "$197,113 (=$194,226 + $2,887)" }
        ]
      },
      journalLogic: "For Year 3, interest expense equals the cash interest plus the discount amortization. Under straight-line, this amount is the same each year."
    },
    successMessage: "Excellent! You've correctly applied straight-line amortization to calculate the interest expense for Year 3."
  },

  // Scenario 16 - Minor rounding difference noted but not material
  {
    id: 16,
    scenarioNumber: 16,
    bondType: "premium",
    faceValue: 500000,
    statedRate: 0.07,
    effectiveRate: 0.06,
    lifeYears: 5,
    paymentFrequency: "Semi-annual",
    issuePrice: 522764,
    amortizationMethod: "Straight-Line",
    scenarioDate: "January 1, Year 1",
    carryingValueEOY: null,
    difficulty: 4,
    task: "Alpine uses the straight-line method of amortization. Calculate the interest expense for the second half of Year 2 (July 1 to December 31, Year 2) (rounded to nearest dollar).",
    solution: [
      { account: "Interest Expense", debit: 15224, credit: null },
      { account: "Premium on Bonds Payable", debit: 2276, credit: null },
      { account: "Cash", debit: null, credit: 17500 }
    ],
    keyCalculations: {
      overview: "Under straight-line amortization, the premium is amortized in equal amounts over each interest period of the bonds.",
      totalPremium: "$522,764 - $500,000 = $22,764",
      totalPeriods: "5 years × 2 periods per year = 10 periods",
      periodAmortization: "$22,764 ÷ 10 periods = $2,276.40 per period (rounded to $2,276)",
      semiAnnualCashInterest: "$500,000 × 7% × 1/2 = $17,500 per period",
      interestExpense: "$17,500 - $2,276 = $15,224",
      carryingValueProgress: "With each interest payment, the premium is reduced by $2,276, gradually bringing the carrying value down to face value at maturity.",
      carryingValueTable: {
        valueByPeriod: [
          { period: "Issue Date", value: "$522,764" },
          { period: "After Period 1", value: "$520,488" },
          { period: "After Period 2", value: "$518,212" },
          { period: "After Period 3", value: "$515,936" },
          { period: "After Period 4 (End of Year 2)", value: "$513,660" }
        ]
      },
      journalLogic: "For the second half of Year 2 (4th payment period), interest expense equals the cash interest minus the premium amortization."
    },
    successMessage: "Well done! You've correctly applied straight-line amortization for a premium bond with semi-annual payments."
  },

  // Scenario 17 - Add separate account for issuance costs per GAAP
  {
    id: 17,
    scenarioNumber: 17,
    bondType: "discount",
    faceValue: 500000,
    statedRate: 0.06,
    effectiveRate: 0.07,
    lifeYears: 10,
    paymentFrequency: "Annual",
    issuePrice: 465000, // 93% of face value
    issuanceCosts: 8500,
    amortizationMethod: "Effective Interest",
    scenarioDate: "January 1, Year 1",
    difficulty: 3,
    task: "The company incurs $8,500 in bond issuance costs. Prepare the journal entry to record the bond issuance (rounded to nearest dollar).",
    solution: [
      { account: "Cash", debit: 456500, credit: null },
      { account: "Discount on Bonds Payable", debit: 35000, credit: null },
      { account: "Debt Issuance Costs", debit: 8500, credit: null },
      { account: "Bonds Payable", debit: null, credit: 500000 }
    ],
    keyCalculations: {
      overview: "Under GAAP, bond issuance costs are typically recorded in a separate contra-liability account, although they can also be included with the discount for presentation purposes.",
      bondDiscount: "$500,000 - $465,000 = $35,000 (original discount)",
      netProceeds: "$465,000 - $8,500 = $456,500",
      journalLogic: "The bond is issued at a discount, so we debit Cash for the net proceeds received, debit Discount on Bonds Payable for the original discount, debit Debt Issuance Costs for the issuance costs, and credit Bonds Payable for the face value."
    },
    alternativeSolution: [
      { account: "Cash", debit: 456500, credit: null },
      { account: "Discount on Bonds Payable", debit: 43500, credit: null },
      { account: "Bonds Payable", debit: null, credit: 500000 }
    ],
    alternativeNote: "While combining the discount and issuance costs in a single 'Discount on Bonds Payable' account is acceptable for balance sheet presentation purposes, separating them provides better tracking of the different components affecting the carrying value.",
    successMessage: "Excellent! You've correctly accounted for both the bond discount and issuance costs in accordance with current accounting standards."
  },

  // Scenario 18 - Fix accounting for premium bond issuance costs
  {
    id: 18,
    scenarioNumber: 18,
    bondType: "premium",
    faceValue: 300000,
    statedRate: 0.08,
    effectiveRate: 0.07,
    lifeYears: 5,
    paymentFrequency: "Semi-annual",
    issuePrice: 318000, // 106% of face value
    issuanceCosts: 4200,
    amortizationMethod: "Effective Interest",
    scenarioDate: "July 1, Year 1",
    difficulty: 3,
    task: "The company incurs $4,200 in bond issuance costs. Prepare the journal entry to record the bond issuance.",
    solution: [
      { account: "Cash", debit: 313800, credit: null },
      { account: "Premium on Bonds Payable", debit: null, credit: 18000 },
      { account: "Debt Issuance Costs", debit: 4200, credit: null },
      { account: "Bonds Payable", debit: null, credit: 300000 }
    ],
    keyCalculations: {
      overview: "Under GAAP, bond issuance costs should be recorded in a separate contra-liability account, not netted against the premium.",
      bondPremium: "$318,000 - $300,000 = $18,000 (original premium)",
      netProceeds: "$318,000 - $4,200 = $313,800",
      netCarryingValue: "$300,000 + $18,000 - $4,200 = $313,800",
      journalLogic: "The bond is issued at a premium, so we debit Cash for the net proceeds received, credit Premium on Bonds Payable for the full premium amount, debit Debt Issuance Costs for the issuance costs, and credit Bonds Payable for the face value."
    },
    successMessage: "Well done! You've correctly accounted for both the bond premium and issuance costs by maintaining separate accounts for each component."
  },

  // Scenario 19 - No errors reported
  {
    id: 19,
    scenarioNumber: 19,
    bondType: "face",
    faceValue: 750000,
    statedRate: 0.05,
    effectiveRate: 0.05,
    lifeYears: 8,
    paymentFrequency: "Annual",
    issuePrice: 750000, // 100% of face value
    issuanceCosts: 12500,
    amortizationMethod: "Effective Interest",
    scenarioDate: "April 1, Year 1",
    difficulty: 2,
    task: "The company incurs $12,500 in bond issuance costs. Prepare the journal entry to record the bond issuance.",
    solution: [
      { account: "Cash", debit: 737500, credit: null },
      { account: "Discount on Bonds Payable", debit: 12500, credit: null },
      { account: "Bonds Payable", debit: null, credit: 750000 }
    ],
    keyCalculations: {
      overview: "Even though the bonds were issued at par, the issuance costs create a discount that will be amortized over the life of the bonds.",
      netProceeds: "$750,000 - $12,500 = $737,500",
      effectiveRate: "The issuance costs effectively increase the yield on the bonds above the stated rate of 5%.",
      journalLogic: "When a bond is issued at par with issuance costs, we debit Cash for the net proceeds, debit Discount on Bonds Payable for the issuance costs, and credit Bonds Payable for the face value."
    },
    alternativeSolution: [
      { account: "Cash", debit: 737500, credit: null },
      { account: "Debt Issuance Costs", debit: 12500, credit: null },
      { account: "Bonds Payable", debit: null, credit: 750000 }
    ],
    alternativeNote: "While treating issuance costs as a discount is acceptable for balance sheet presentation, using a separate 'Debt Issuance Costs' account provides better tracking of these costs for internal reporting purposes.",
    successMessage: "Great job! You've correctly recognized that bond issuance costs create a discount even when bonds are issued at par value."
  }
  
];

export default scenarios;