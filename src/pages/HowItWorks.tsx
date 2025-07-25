"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Target, Zap } from "lucide-react"
import { SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import { Link } from "react-router"

const HowItWorks = () => {
  const features = [
    {
      emoji: "🧠",
      title: "Smart AI Parsing",
      description: "Our AI understands natural language and automatically categorizes your transactions.",
      details: [
        "Recognizes 50+ common transaction types",
        "Learns from your patterns over time",
        "Handles typos and variations gracefully",
      ],
    },
    {
      emoji: "📊",
      title: "Beautiful Visualizations",
      description: "Transform boring numbers into colorful, engaging charts and insights.",
      details: [
        "Interactive pie charts for spending categories",
        "Trend lines showing your financial patterns",
        "Smart alerts for unusual spending",
      ],
    },
    {
      emoji: "⚡",
      title: "Lightning Fast",
      description: "Track a week's worth of expenses in under 30 seconds.",
      details: ["No forms to fill out", "No categories to remember", "Just type and go!"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
              <Play className="w-4 h-4 mr-2" />
              See It In Action
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How LazyLedger Works 🎬
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the magic behind the simplest finance tracker ever built.
              <span className="text-blue-600 font-semibold"> It's easier than you think!</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">From This... To That! ✨</h2>
            <p className="text-xl text-gray-600">Watch your simple text transform into powerful insights</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Input Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">✍️</span>
                    What You Type
                  </CardTitle>
                  <CardDescription className="text-gray-200">Just natural, simple text</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-lg space-y-2">
                    <div className="text-green-600">Salary +5000</div>
                    <div className="text-red-600">Pizza -12</div>
                    <div className="text-red-600">Coffee -4.50</div>
                    <div className="text-red-600">Uber -25</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Arrow */}
            <div className="text-center lg:text-left">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-4xl"
              >
                ➡️
              </motion.div>
            </div>

            {/* Output Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    What You Get
                  </CardTitle>
                  <CardDescription className="text-blue-100">Beautiful, organized insights</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$5,000</div>
                      <div className="text-sm text-green-700">Income</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">$41.50</div>
                      <div className="text-sm text-red-700">Expenses</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="flex items-center gap-2">
                        <span>💰</span> Salary
                      </span>
                      <span className="font-semibold">$5,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="flex items-center gap-2">
                        <span>🍕</span> Food
                      </span>
                      <span className="font-semibold">$16.50</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="flex items-center gap-2">
                        <span>🚗</span> Transport
                      </span>
                      <span className="font-semibold">$25</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">The Magic Behind the Scenes 🎭</h2>
            <p className="text-xl text-gray-600">Advanced technology made simple for you</p>
          </motion.div>

          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8 flex flex-col justify-center">
                      <div className="text-6xl mb-4">{feature.emoji}</div>
                      <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-blue-100">{feature.description}</p>
                    </div>
                    <div className="lg:col-span-2 p-8">
                      <div className="space-y-4">
                        {feature.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + detailIndex * 0.1, duration: 0.3 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            <span className="text-gray-700">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Pro Tips for Maximum Laziness 😴</h2>
            <p className="text-xl text-gray-600">Get the most out of LazyLedger with these simple tricks</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "📱",
                title: "Use Voice-to-Text",
                tip: "On mobile? Use voice input to speak your transactions instead of typing!",
              },
              {
                emoji: "📅",
                title: "Batch Your Entries",
                tip: "Enter a whole week at once - just change the date and paste everything.",
              },
              {
                emoji: "🔄",
                title: "Keep It Consistent",
                tip: "Use similar words for similar things. 'Coffee' works better than mixing 'coffee', 'latte', 'cappuccino'.",
              },
              {
                emoji: "💡",
                title: "Don't Overthink It",
                tip: "Close enough is good enough! LazyLedger will figure out what you mean.",
              },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{tip.emoji}</div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-gray-800">{tip.title}</h3>
                        <p className="text-gray-600">{tip.tip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-6">Ready to Experience the Magic? ✨</h2>
            <p className="text-xl mb-8 opacity-90">
              Stop reading about it and start using it! Your future self will thank you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    Start Free Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link to="/track">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    Try It Now
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </SignedIn>

              <Link to="/get-started">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
                >
                  Learn More
                  <Target className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
