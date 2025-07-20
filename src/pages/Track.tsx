"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TrackingForm from "@/components/tracking_form"
import { Lightbulb, Zap, TrendingUp } from "lucide-react"

const Track = () => {
  const quickTips = [
    { icon: "💰", text: "Income: +5000, +800", type: "income" },
    { icon: "🍕", text: "Food: -12, -25", type: "expense" },
    { icon: "🚗", text: "Transport: -25, -40", type: "expense" },
    { icon: "🛍️", text: "Shopping: -80, -25", type: "expense" },
  ]

  const handleFormSuccess = () => {
    console.log("Transaction submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge className="mb-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1">
            <Zap className="w-3 h-3 mr-1" />
            Quick Entry
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ✍️ Track Your Money
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">Just type naturally - we'll figure out the rest!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Takes center stage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 order-1"
          >
            <Card className="border-0 shadow-xl h-fit">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-2xl">📝</span>
                  Quick Entry
                </CardTitle>
                <CardDescription className="text-green-100">
                  Type your transactions naturally - one per line
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <TrackingForm onSuccess={handleFormSuccess} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Compact Tips Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 order-2"
          >
            {/* Format Guide */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Format Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="font-medium text-green-800 text-sm mb-1">✅ Examples:</div>
                  <div className="space-y-1 font-mono text-xs">
                    <div>Pizza -12</div>
                    <div>Salary +5000</div>
                    <div>Coffee -4.50</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="font-medium text-blue-800 text-sm mb-1">💡 Tips:</div>
                  <ul className="text-xs space-y-1">
                    <li>• Use + for income, - for expenses</li>
                    <li>• One transaction per line</li>
                    <li>• We'll auto-categorize everything!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Quick Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-2 rounded-lg text-sm ${
                      tip.type === "income" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tip.icon}</span>
                      <span className="font-mono text-xs">{tip.text}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">🤖</div>
                  <div className="font-semibold text-sm mb-1">AI Insights Available</div>
                  <div className="text-xs opacity-90">Generate personalized financial insights on your dashboard</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Tips Row - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { emoji: "📱", title: "Voice Input", tip: "Use voice-to-text on mobile" },
              { emoji: "📅", title: "Batch Entry", tip: "Enter a whole week at once" },
              { emoji: "🔄", title: "Stay Consistent", tip: "Use similar words for similar things" },
              { emoji: "💡", title: "Don't Overthink", tip: "Close enough is good enough!" },
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{tip.emoji}</div>
                    <h3 className="font-semibold text-sm mb-1 text-gray-800">{tip.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{tip.tip}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Track
