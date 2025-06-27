"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react"
import { SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import { Link } from "react-router"

const GetStarted = () => {
  const steps = [
    {
      step: 1,
      emoji: "👋",
      title: "Sign Up (30 seconds)",
      description: "Create your free account - no credit card needed, no complicated setup.",
      color: "from-purple-400 to-purple-600",
    },
    {
      step: 2,
      emoji: "✍️",
      title: "Start Typing",
      description: "Just type your transactions naturally: 'Coffee -5', 'Salary +3000' - that's it!",
      color: "from-blue-400 to-blue-600",
    },
    {
      step: 3,
      emoji: "📊",
      title: "Watch the Magic",
      description: "See your money organized into beautiful charts and insights automatically.",
      color: "from-green-400 to-green-600",
    },
  ]

  const benefits = [
    "✅ No complex categories to set up",
    "✅ No boring spreadsheets to maintain",
    "✅ No confusing financial jargon",
    "✅ Works on any device, anywhere",
    "✅ Your data is private and secure",
    "✅ Free forever (seriously!)",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready in Under 2 Minutes
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Let's Get You Started! 🚀
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of people who've made finance tracking actually enjoyable.
              <span className="text-purple-600 font-semibold"> No setup headaches, just results.</span>
            </p>

            <SignedOut>
              <SignUpButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg mb-4"
                >
                  Start Your Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
              <div className="text-sm text-gray-500">No credit card required • Free forever</div>
            </SignedOut>

            <SignedIn>
              <div className="space-y-4">
                <div className="text-2xl">🎉 Welcome aboard!</div>
                <Link to="/track">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
                  >
                    Start Tracking Now
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </SignedIn>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">How It Works (Spoiler: It's Easy) 😎</h2>
            <p className="text-xl text-gray-600">Three simple steps to financial clarity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  <div className={`h-2 bg-gradient-to-r ${step.color}`} />

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>

                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-4">{step.emoji}</div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why You'll Love LazyLedger 💜</h2>
            <p className="text-xl text-gray-600">We've thought of everything so you don't have to</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Finances? 🌟</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the revolution of people who actually enjoy tracking their money.
            </p>

            <SignedOut>
              <SignUpButton>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
              <div className="text-sm opacity-75 mt-3">Takes less than 30 seconds</div>
            </SignedOut>

            <SignedIn>
              <Link to="/track">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Start Your First Entry
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default GetStarted
