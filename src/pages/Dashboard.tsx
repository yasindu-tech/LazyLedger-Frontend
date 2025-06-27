
import { useMemo } from "react"
import { useGetTransactionsByUserQuery } from "../services/api"
import { useUser } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  parseTransactionText,
  calculateSummary,
  getCategoryBreakdown,
  type Transaction,
} from "@/utils/transaction-parser"

const COLORS = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#6366F1"]

const Dashboard = () => {
  const { user } = useUser()
  const { data: rawData, isLoading } = useGetTransactionsByUserQuery(user?.id || "", {
    skip: !user?.id,
  })

  console.log("Raw Data:", rawData)
  const transactions = useMemo(() => {
    if (!rawData) return []

    const allTransactions: Transaction[] = []
    rawData.forEach((record: any) => {
      if (record.raw_text) {
        const parsed = parseTransactionText(record.raw_text, record.date)
        allTransactions.push(...parsed)
      } else if (record.amount && record.type && record.category) {
        // Handle already-parsed transactions from backend
        allTransactions.push({
          id: record.transaction_id || record.id || Math.random().toString(),
          amount: typeof record.amount === "string" ? parseFloat(record.amount) : record.amount,
          date: record.date,
          type: record.type.toLowerCase(),
          category: record.category,
          description: record.description || record.category,
          emoji: "💸", // Optionally map category to emoji if you want
        })
      }
    })

    return allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [rawData])

  const summaries = useMemo(
    () => ({
      today: calculateSummary(transactions, "today"),
      week: calculateSummary(transactions, "week"),
      month: calculateSummary(transactions, "month"),
    }),
    [transactions],
  )

  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions])

  const trendData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    return last7Days.map((date) => {
      const dayTransactions = transactions.filter((t) => t.date === date)
      const income = dayTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      const expenses = dayTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        income,
        expenses,
        net: income - expenses,
      }
    })
  }, [transactions])

  const topCategories = categoryBreakdown.slice(0, 3)
  const recentTransactions = transactions.slice(0, 6)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="text-4xl"
        >
          💫
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            💸 Your Money Dashboard
          </h1>
          <p className="text-gray-600">Let's see where your money's been hanging out! 🕵️‍♀️</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { period: "Today", data: summaries.today, emoji: "📅", color: "from-green-400 to-green-600" },
            { period: "This Week", data: summaries.week, emoji: "📊", color: "from-blue-400 to-blue-600" },
            { period: "This Month", data: summaries.month, emoji: "🗓️", color: "from-purple-400 to-purple-600" },
          ].map((summary) => (
            <motion.div key={summary.period} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className={`h-2 bg-gradient-to-r ${summary.color}`} />
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{summary.emoji}</span>
                    {summary.period}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Income</span>
                    <span className="font-semibold text-green-600">+Rs{summary.data.totalIncome.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expenses</span>
                    <span className="font-semibold text-red-600">-Rs{summary.data.totalExpenses.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Net</span>
                    <div className="flex items-center gap-1">
                      {summary.data.netAmount >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`font-bold ${summary.data.netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                        Rs{Math.abs(summary.data.netAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🥧</span>
                  Spending by Category
                </CardTitle>
                <CardDescription>Where your money loves to go!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="amount"
                        label={({ category, amount }) => `${category}: Rs${amount.toFixed(0)}`}
                      >
                        {categoryBreakdown.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`Rs${value.toFixed(2)}`, "Amount"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trend Chart */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  7-Day Money Flow
                </CardTitle>
                <CardDescription>Your financial rhythm this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value: any) => [`Rs${value.toFixed(2)}`, ""]} />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#EF4444"
                        strokeWidth={3}
                        dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Categories & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 3 Categories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Top 3 Money Magnets
                </CardTitle>
                <CardDescription>Your biggest spending categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCategories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category.emoji}</div>
                      <div>
                        <div className="font-semibold">{category.category}</div>
                        <div className="text-sm text-gray-600">{category.count} transactions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">Rs{category.amount.toFixed(2)}</div>
                      <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest money moves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{transaction.emoji}</div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-600">{transaction.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}Rs{transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fun Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-2xl font-bold">{transactions.length}</div>
                  <div className="text-sm opacity-90">Total Transactions</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-2xl font-bold">Rs{summaries.month.totalIncome.toFixed(0)}</div>
                  <div className="text-sm opacity-90">Monthly Income</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🛍️</div>
                  <div className="text-2xl font-bold">Rs{summaries.month.totalExpenses.toFixed(0)}</div>
                  <div className="text-sm opacity-90">Monthly Spending</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="text-2xl font-bold">{categoryBreakdown.length}</div>
                  <div className="text-sm opacity-90">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
