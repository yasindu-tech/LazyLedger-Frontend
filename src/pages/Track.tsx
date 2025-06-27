
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TrackingForm from "@/components/tracking_form"
import { Lightbulb, Zap, TrendingUp } from "lucide-react"

const Track = () => {
  const tips = [
    {
      emoji: "💰",
      text: "Income: Salary +5000, Freelance +800",
      type: "income",
    },
    {
      emoji: "🍕",
      text: "Food: Pizza -12, Coffee -5, Lunch -15",
      type: "expense",
    },
    {
      emoji: "🚗",
      text: "Transport: Uber -25, Gas -40",
      type: "expense",
    },
    {
      emoji: "🛍️",
      text: "Shopping: Clothes -80, Books -25",
      type: "expense",
    },
  ]

  const handleFormSuccess = () => {
    // Could add toast notification here
    console.log("Transaction submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Super Quick Entry
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ✍️ Track Your Money
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Just type naturally - we'll figure out the rest! No forms, no fuss, no stress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-3xl">📝</span>
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

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* How to Format */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  How to Format
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="font-semibold text-green-800 mb-2">✅ Good Examples:</div>
                  <div className="space-y-1 font-mono text-sm">
                    <div>Pizza -12</div>
                    <div>Salary +5000</div>
                    <div>Coffee -4.50</div>
                    <div>Freelance work +800</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Use + for income, - for expenses</li>
                    <li>• One transaction per line</li>
                    <li>• We'll auto-categorize everything!</li>
                    <li>• Decimals work: -4.50, +1250.75</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Example Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  Example Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-3 rounded-lg ${
                      tip.type === "income" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tip.emoji}</span>
                      <span className="font-mono text-sm">{tip.text}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-lg font-semibold mb-1">Average Entry Time</div>
                  <div className="text-3xl font-bold">15 seconds</div>
                  <div className="text-sm opacity-90">vs 3+ minutes with other apps</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Track
