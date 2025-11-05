"use client"

import { useMemo, useState, useEffect } from "react"
import { useGetTransactionsByUserQuery } from "../services/api"
import { useUser } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { TrendingUp, TrendingDown, Brain, Info, Plus, ChevronDown } from "lucide-react"
import { Link } from "react-router"
import {
  calculateSummary,
  getCategoryBreakdown,
  type Transaction,
} from "../utils/transaction-parser"

const COLORS = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#6366F1"]

// Currency configurations
const CURRENCIES = {
  LKR: { symbol: "Rs", name: "Sri Lankan Rupee", rate: 1 },
  USD: { symbol: "$", name: "US Dollar", rate: 0.0031 },
  GBP: { symbol: "£", name: "British Pound", rate: 0.0025 },
  EUR: { symbol: "€", name: "Euro", rate: 0.0029 },
}

// Base URL for AI insights service. Change here to point to the desired deployment.
const INSIGHTS_BASE = 'https://lazyledger-parser.onrender.com'

// Local helper types for clearer typing in this file
type CurrencyCode = keyof typeof CURRENCIES
type Currency = (typeof CURRENCIES)[CurrencyCode]

// Custom hook for AI insights with generation and fetching
const useAIInsights = (userId: string | undefined) => {
  const [insights, setInsights] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [dailyGenerationCount, setDailyGenerationCount] = useState(0)

  // Check local storage for daily generation limit
  useEffect(() => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem("lastInsightGenerationDate")
    const storedCount = localStorage.getItem("dailyInsightCount")

    if (storedDate === today) {
      setDailyGenerationCount(Number.parseInt(storedCount || "0"))
    } else {
      setDailyGenerationCount(0)
      localStorage.setItem("lastInsightGenerationDate", today)
      localStorage.setItem("dailyInsightCount", "0")
    }
  }, [])

  // Fetch latest insights on component mount
  useEffect(() => {
    if (!userId) {
      return
    }
    fetchLatestInsights()
  }, [userId])

  const fetchLatestInsights = async () => {
    if (!userId) return

  const url = `${INSIGHTS_BASE}/insights/${userId}/latest`

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Handle the data structure where insight is nested
        if (data.insight) {
          setInsights(data.insight)
        } else if (data.content) {
          // Direct insight object
          setInsights(data)
        } else {
          setInsights(null)
        }
      } else if (response.status === 404) {
        setInsights(null) // No insights found
      } else {
        throw new Error("Failed to fetch insights")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load insights")
      setInsights(null)
    } finally {
      setIsLoading(false)
    }
  }

  const generateInsights = async () => {
    if (!userId || dailyGenerationCount >= 3) return

  const url = `${INSIGHTS_BASE}/insights/${userId}`

    setIsGenerating(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error("Failed to generate insights")
      }
      const data = await response.json()
      console.log("Generated insights data:", data)

      // Handle the response structure from the API
      let insightData
      if (data.insight) {
        insightData = data.insight
      } else if (data.insights) {
        // Create insight object if the API returns { insights: "content" }
        insightData = {
          insight_id: Date.now(),
          user_id: userId,
          title: `Financial Analysis - ${new Date().toLocaleDateString()}`,
          content: data.insights,
          created_at: new Date().toISOString(),
        }
      } else {
        throw new Error("Invalid response format")
      }

      setInsights(insightData)

      // Update generation count
      const newCount = dailyGenerationCount + 1
      setDailyGenerationCount(newCount)
      localStorage.setItem("dailyInsightCount", newCount.toString())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate insights")
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    insights,
    isLoading,
    isGenerating,
    error,
    generateInsights,
    canGenerate: dailyGenerationCount < 3,
    remainingGenerations: 3 - dailyGenerationCount,
  }
}

const Dashboard = () => {
  const { user } = useUser()
  const [selectedCurrency, setSelectedCurrency] = useState("LKR" as keyof typeof CURRENCIES)
  
  const { data: rawData, isLoading } = useGetTransactionsByUserQuery(user?.id || "", {
    skip: !user?.id,
  })

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    const key = selectedCurrency as CurrencyCode
    const currency = CURRENCIES[key] as Currency
    const convertedAmount = amount * currency.rate
    return `${currency.symbol}${convertedAmount.toFixed(2)}`
  }

  // Console log the output of useGetTransactionsByUserQuery
  console.log("useGetTransactionsByUserQuery output:", {
    data: rawData,
    isLoading,
    userId: user?.id
  })

  // Helper function to get emoji for categories
  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      food: "🍔",
      salary: "💰",
      freelance: "💼",
      other: "📝",
      transport: "🚗",
      entertainment: "🎬",
      shopping: "🛍️",
      utilities: "⚡",
      healthcare: "🏥",
      education: "📚",
    }
    return emojiMap[category.toLowerCase()] || "📝"
  }

  // Fetch AI insights
  const {
    insights,
    isLoading: insightsLoading,
    isGenerating,
    error: insightsError,
    generateInsights,
    canGenerate,
    remainingGenerations,
  } = useAIInsights(user?.id)

  const transactions = useMemo(() => {
    if (!rawData) {
      return []
    }

    // Convert API response to Transaction format
    const allTransactions: Transaction[] = rawData.map((record: any) => {
      // Convert the API response format to our Transaction type
      return {
        id: record.transaction_id,
        description: `${record.category} transaction`, // You might want to improve this
        amount: parseFloat(record.amount),
        type: record.type.toLowerCase() as "income" | "expense", // Convert "INCOME"/"EXPENSE" to lowercase
        category: record.category,
        date: record.date.split('T')[0], // Convert "2025-07-20T00:00:00.000Z" to "2025-07-20"
        emoji: getCategoryEmoji(record.category),
      }
    })

    const sortedTransactions = allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    console.log("Processed transactions:", sortedTransactions)
    
    return sortedTransactions
  }, [rawData])

  const summaries = useMemo(
    () => {
      const result = {
        today: calculateSummary(transactions, "today"),
        week: calculateSummary(transactions, "week"),
        month: calculateSummary(transactions, "month"),
      }
      return result
    },
    [transactions],
  )

  const categoryBreakdown = useMemo(() => {
    const result = getCategoryBreakdown(transactions)
    return result
  }, [transactions])

  const trendData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const result = last7Days.map((date: string) => {
      const dayTransactions = transactions.filter((t: Transaction) => t.date === date)
      
      const income = dayTransactions
        .filter((t: Transaction) => t.type === "income")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
      const expenses = dayTransactions
        .filter((t: Transaction) => t.type === "expense")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

      const dayData = {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        income,
        expenses,
        net: income - expenses,
      }
      
      return dayData
    })
    
    return result
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1" />
            <div className="flex-1 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                💸 Your Money Dashboard
              </h1>
              <p className="text-gray-600">Let's see where your money's been hanging out! 🕵️‍♀️</p>
            </div>
            <div className="flex-1 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span className="text-sm font-medium">{(CURRENCIES[selectedCurrency as keyof typeof CURRENCIES] as Currency).symbol}</span>
                    <span className="text-sm">{selectedCurrency}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {(Object.entries(CURRENCIES) as [CurrencyCode, Currency][]).map(([code, currency]) => (
                    <DropdownMenuItem
                      key={code}
                      onClick={() => setSelectedCurrency(code as keyof typeof CURRENCIES)}
                      className={selectedCurrency === code ? "bg-gray-100" : ""}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currency.symbol}</span>
                        <span className="text-sm">{code}</span>
                        <span className="text-xs text-gray-500">- {currency.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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
                    <span className="font-semibold text-green-600">+{formatCurrency(summary.data.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expenses</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(summary.data.totalExpenses)}</span>
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
                        {formatCurrency(Math.abs(summary.data.netAmount))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Insights Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Brain className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl">AI-Powered Insights</CardTitle>
                    <CardDescription className="text-indigo-100">
                      Personalized financial insights powered by our trained AI model
                    </CardDescription>
                  </div>
                </div>

                {transactions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={generateInsights}
                      disabled={!canGenerate || isGenerating}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Generate Insights
                        </div>
                      )}
                    </Button>
                    <div className="text-xs text-indigo-200">{remainingGenerations}/3 left today</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {transactions.length === 0 ? (
                // No transactions state
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-3">Start Tracking to See Insights</h3>
                  <p className="text-indigo-100 mb-6 max-w-md mx-auto">
                    Add some transactions to unlock personalized AI insights about your spending patterns and financial
                    habits.
                  </p>
                  <Link to="/track">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transactions
                    </Button>
                  </Link>
                </div>
              ) : insightsLoading ? (
                // Loading state
                <div className="text-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="text-4xl mb-4"
                  >
                    🤖
                  </motion.div>
                  <p className="text-indigo-100">Loading your insights...</p>
                </div>
              ) : !insights ? (
                // No insights available
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔮</div>
                  <h3 className="text-xl font-semibold mb-3">No Insights Available</h3>
                  <p className="text-indigo-100 mb-6 max-w-md mx-auto">
                    Generate your first AI-powered financial insights to understand your spending patterns and get
                    personalized recommendations.
                  </p>
                  {canGenerate && (
                    <Button
                      onClick={generateInsights}
                      disabled={isGenerating}
                      className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                          Generating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Generate First Insights
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              ) : insightsError ? (
                // Error state
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">😅</div>
                  <h3 className="text-xl font-semibold mb-3">Oops! Couldn't load insights right now.</h3>
                  <p className="text-sm text-indigo-200 mb-4">
                    {insightsError.includes('CORS') || insightsError.includes('fetch') 
                      ? "The AI insights service is temporarily unavailable. Please try again later." 
                      : `Error: ${insightsError}`}
                  </p>
                  {canGenerate && (
                    <Button
                      onClick={generateInsights}
                      disabled={isGenerating}
                      className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                          Retrying...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Try Again
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                // Insights content
                insights && insights.content && typeof insights.content === 'string' ? (
                <div className="space-y-6">
                  {/* Insights Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      📋 {insights.title || "Financial Analysis"}
                    </h4>
                    <div className="text-xs text-indigo-200">{new Date(insights.created_at).toLocaleDateString()}</div>
                  </div>

                  {/* Parse and display insights */}
                  <div className="space-y-4">
                    {(insights.content || "")
                      .split("\n\n")
                      .filter((section: string) => section.trim() !== '')
                      .map((section: string, index: number) => {
                        if (section.startsWith("Summary:")) {
                          return (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                              <h5 className="font-semibold mb-3 flex items-center gap-2">📊 Financial Summary</h5>
                              <p className="text-indigo-100 leading-relaxed">{section.replace("Summary: ", "")}</p>
                            </div>
                          )
                        } else if (section.startsWith("Insight")) {
                          const insightNumber = section.match(/Insight (\d+):/)?.[1] || "1"
                          const content = section.replace(/Insight \d+: /, "")
                          const icons = ["🎯", "📈", "💰", "✨", "🔍", "📊"]

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="text-2xl">{icons[Number.parseInt(insightNumber) - 1] || "💡"}</div>
                                <div>
                                  <h6 className="font-medium mb-2 text-white">Insight {insightNumber}</h6>
                                  <p className="text-indigo-100 text-sm leading-relaxed">{content}</p>
                                </div>
                              </div>
                            </motion.div>
                          )
                        }
                        return null
                      })
                      .filter(Boolean)}
                  </div>

                  {/* Enhanced Disclaimer */}
                  <Alert className="bg-red-500/20 border-red-400/30 text-white">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-red-100">
                      <strong>Important Disclaimer:</strong> These insights are AI-generated based on your transaction
                      patterns. The more data you track, the more accurate these insights become. However, AI analysis
                      can sometimes be misleading or incomplete. Always use your own judgment and consider consulting
                      with a financial advisor for important financial decisions.
                    </AlertDescription>
                  </Alert>
                </div>
                ) : (
                  // Fallback if insights exist but no content
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-indigo-100">Insights are being processed...</p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
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
                        label={(entry: any) => `${entry.category}: ${formatCurrency(entry.amount)}`}
                      >
                        {categoryBreakdown.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`${formatCurrency(value)}`, "Amount"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trend Chart */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
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
                      <Tooltip formatter={(value: any) => [`${formatCurrency(value)}`, ""]} />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Top 3 Money Magnets
                </CardTitle>
                <CardDescription>Your biggest spending categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCategories.map((category: any, index: number) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
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
                      <div className="font-bold text-lg">{formatCurrency(category.amount)}</div>
                      <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest money moves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction: any, index: number) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
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
                        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
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
                  <div className="text-2xl font-bold">{formatCurrency(summaries.month.totalIncome).replace(/\.\d{2}$/, '')}</div>
                  <div className="text-sm opacity-90">Monthly Income</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🛍️</div>
                  <div className="text-2xl font-bold">{formatCurrency(summaries.month.totalExpenses).replace(/\.\d{2}$/, '')}</div>
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
