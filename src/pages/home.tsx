
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, Target, X } from "lucide-react"
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react"
import { Link } from "react-router"
import { useState, useEffect } from "react"

const Home = () => {
  const [showNewsPopup, setShowNewsPopup] = useState(false)

  // Show popup after 2 seconds, hide after 5 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowNewsPopup(true)
    }, 2000)

    const hideTimer = setTimeout(() => {
      setShowNewsPopup(false)
    }, 7000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

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
      {/* Animated News Popup */}
      <AnimatePresence>
        {showNewsPopup && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="relative">
              {/* Main popup card */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-xl p-4 relative overflow-hidden">
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"></div>
                  </motion.div>

                  {/* Close button */}
                  <button
                    onClick={() => setShowNewsPopup(false)}
                    className="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-600" />
                  </button>

                  <div className="flex items-center gap-3 pr-6">
                    {/* Animated icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="text-3xl"
                    >
                      🤖
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {/* Pulsing NEW badge */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                        >
                          NEWS
                        </motion.div>

                        {/* Sparkle animation */}
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="text-yellow-500"
                        >
                          ✨
                        </motion.span>
                      </div>

                      <h3 className="font-bold text-gray-800 text-sm">AI Insights Coming Soon!</h3>
                      <p className="text-xs text-gray-600">Get personalized financial advice from our trained AI</p>
                    </div>

                    {/* Animated arrow */}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="text-purple-500"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Progress bar animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-xl"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Floating particles around popup */}
              <motion.div
                className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full"
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
              <motion.div
                className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full"
                animate={{
                  y: [-3, -12, -3],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-2 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  y: [5, 15, 5],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

            {/* Animated New Feature Announcement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg relative overflow-hidden">
                {/* Animated background shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Pulsing dot */}
                <motion.div
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />

                <span className="font-semibold text-sm relative z-10">NEW</span>

                {/* Sparkle animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="text-yellow-300"
                >
                  ✨
                </motion.div>

                <span className="text-sm relative z-10">AI Insights Coming Soon!</span>

                {/* Floating particles */}
                <motion.div
                  className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-400 rounded-full"
                  animate={{
                    y: [-2, -8, -2],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-300 rounded-full"
                  animate={{
                    y: [2, 8, 2],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </div>
            </motion.div>

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
