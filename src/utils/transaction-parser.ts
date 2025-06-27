export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  emoji: string
}

export interface TransactionSummary {
  totalIncome: number
  totalExpenses: number
  netAmount: number
  transactionCount: number
}

// Category mapping with emojis
const categoryMap: Record<string, { emoji: string; category: string }> = {
  // Food & Dining
  pizza: { emoji: "🍕", category: "Food" },
  food: { emoji: "🍽️", category: "Food" },
  restaurant: { emoji: "🍽️", category: "Food" },
  coffee: { emoji: "☕", category: "Food" },
  lunch: { emoji: "🥪", category: "Food" },
  dinner: { emoji: "🍽️", category: "Food" },

  // Income
  salary: { emoji: "💰", category: "Salary" },
  freelance: { emoji: "💻", category: "Freelance" },
  bonus: { emoji: "🎉", category: "Bonus" },

  // Transportation
  uber: { emoji: "🚗", category: "Transport" },
  gas: { emoji: "⛽", category: "Transport" },
  taxi: { emoji: "🚕", category: "Transport" },

  // Shopping
  shopping: { emoji: "🛍️", category: "Shopping" },
  clothes: { emoji: "👕", category: "Shopping" },

  // Entertainment
  movie: { emoji: "🎬", category: "Entertainment" },
  netflix: { emoji: "📺", category: "Entertainment" },

  // Default
  default: { emoji: "💸", category: "Other" },
}

export function parseTransactionText(rawText: string, date: string): Transaction[] {
  const lines = rawText.split("\n").filter((line) => line.trim())
  const transactions: Transaction[] = []

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    if (!trimmedLine) return

    // Parse amount (look for + or - followed by numbers)
    const amountMatch = trimmedLine.match(/([+-]?\d+(?:\.\d{2})?)/)
    if (!amountMatch) return

    const amount = Number.parseFloat(amountMatch[1])
    const type: "income" | "expense" = amount >= 0 ? "income" : "expense"

    // Extract description (everything except the amount)
    const description = trimmedLine.replace(amountMatch[0], "").replace(/[-,]/g, "").trim()

    // Determine category and emoji
    const lowerDesc = description.toLowerCase()
    let categoryInfo = categoryMap.default

    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerDesc.includes(key)) {
        categoryInfo = value
        break
      }
    }

    transactions.push({
      id: `${date}-${index}`,
      description: description || "Transaction",
      amount: Math.abs(amount),
      type,
      category: categoryInfo.category,
      date,
      emoji: categoryInfo.emoji,
    })
  })

  return transactions
}

export function calculateSummary(transactions: Transaction[], period: "today" | "week" | "month"): TransactionSummary {
  const now = new Date()
  const filtered = transactions.filter((t) => {
    const transactionDate = new Date(t.date)

    switch (period) {
      case "today":
        return transactionDate.toDateString() === now.toDateString()
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return transactionDate >= weekAgo
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return transactionDate >= monthAgo
      default:
        return true
    }
  })

  const totalIncome = filtered.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = filtered.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome,
    totalExpenses,
    netAmount: totalIncome - totalExpenses,
    transactionCount: filtered.length,
  }
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const breakdown: Record<string, { amount: number; count: number; emoji: string }> = {}

  transactions.forEach((t) => {
    if (!breakdown[t.category]) {
      breakdown[t.category] = { amount: 0, count: 0, emoji: t.emoji }
    }
    breakdown[t.category].amount += t.amount
    breakdown[t.category].count += 1
  })

  return Object.entries(breakdown)
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.amount - a.amount)
}
