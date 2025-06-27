"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Send } from "lucide-react"
import { useCreateRawRecordMutation } from "../services/api"

interface TrackingFormProps {
  onSuccess?: () => void
}

const TrackingForm = ({ onSuccess }: TrackingFormProps) => {
  const { user } = useUser()
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [text, setText] = useState("")
  const [createRawRecord, { isLoading, isError, isSuccess, error }] = useCreateRawRecordMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createRawRecord({
        user_id: user?.id,
        date,
        raw_text: text,
      }).unwrap()

      if (onSuccess) onSuccess()
      setText("")

      // Auto-reset success message after 3 seconds
      setTimeout(() => {
        // The success state will automatically reset when component re-renders
      }, 3000)
    } catch (err) {
      console.error("Submission error:", err)
    }
  }

  const exampleText = `Salary +5000
Pizza -12
Coffee -4.50
Uber -25
Freelance +800`

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Input */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            📅 Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        {/* Transaction Text Input */}
        <div className="space-y-2">
          <Label htmlFor="transactions" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            ✍️ Your Transactions
          </Label>
          <Textarea
            id="transactions"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={exampleText}
            className="min-h-[200px] border-2 border-gray-200 focus:border-blue-500 transition-colors font-mono text-sm resize-none"
            required
          />
          <div className="text-xs text-gray-500">💡 One transaction per line. Use + for income, - for expenses.</div>
        </div>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 text-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Magic...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Submit Transactions
              </div>
            )}
          </Button>
        </motion.div>

        {/* Status Messages */}
        {isSuccess && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                🎉 Awesome! Your transactions have been saved and are being processed.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {isError && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                😅 Oops! {(error as any)?.data?.error || "Something went wrong. Please try again."}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </form>
    </div>
  )
}

export default TrackingForm
