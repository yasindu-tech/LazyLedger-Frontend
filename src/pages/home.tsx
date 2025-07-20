"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react"
import { Link } from "react-router"

const Home = () => {
  const features = [
    {
      emoji: "✍️",
      title: "Just Type & Go",
      description: "Pizza -12, Salary +5000 - that's it! No complex forms or categories to remember.",
      color: "from-purple-400 to-purple-600",
    },
    {
      emoji: "🧠",
      title: "Smart Parsing",
      description: "Our AI automatically understands your transactions and categorizes them perfectly.",
      color: "from-blue-400 to-blue-600",
    },
    {
      emoji: "📊",
      title: "Beautiful Insights",
      description: "Get colorful charts and insights that actually make sense of your money.",
      color: "from-green-400 to-green-600",
    },
    {
      emoji: "⚡",
      title: "Lightning Fast",
      description: "Track expenses in seconds, not minutes. Perfect for busy people who hate paperwork.",
      color: "from-orange-400 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              The Laziest Way to Track Money
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LazyLedger 💸
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop wrestling with complicated finance apps. Just type "Coffee -5" and watch the magic happen!
              <span className="text-purple-600 font-semibold"> We'll handle the rest.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
                  >
                    Start Tracking for Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </SignedIn>

              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
                  See How It Works 🎬
                </Button>
              </Link>
            </div>

            {/* Demo Input */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <Card className="border-2 border-dashed border-purple-300 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">Try typing like this:</div>
                  <div className="font-mono text-lg space-y-1">
                    <div className="text-green-600">Salary +5000 💰</div>
                    <div className="text-red-600">Pizza -12 🍕</div>
                    <div className="text-red-600">Uber -25 🚗</div>
                  </div>
                  <div className="text-sm text-purple-600 mt-3 font-medium">✨ That's literally it!</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce">💰</div>
        <div className="absolute top-40 right-20 text-3xl animate-pulse">📊</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce delay-1000">🎯</div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why People Love LazyLedger 💜</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've made finance tracking so simple, even your lazy Sunday self will actually use it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{feature.emoji}</div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-6">Ready to Make Finance Fun? 🎉</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of people who've ditched boring spreadsheets for something actually enjoyable.
            </p>

            <SignedOut>
              <SignUpButton>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Get Started - It's Free!
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Link to="/track">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Start Tracking Now!
                  <Target className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
