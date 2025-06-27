import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Home from "./pages/home"
import { BrowserRouter, Route, Routes } from "react-router"
import RootLayout from "./layout/Root_Layout"
import { ClerkProvider } from "@clerk/clerk-react"
import Track from "./pages/Track"
import { Provider } from "react-redux"
import { store } from "./services/store"
import Dashboard from "./pages/Dashboard"
import GetStarted from "./pages/GetStarted"
import HowItWorks from "./pages/HowItWorks"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined. Please set it in your .env file.")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/track" element={<Track />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              {/* Legacy routes for compatibility */}
              <Route path="/login" element={<div>Login handled by Clerk</div>} />
              <Route path="/signup" element={<div>Signup handled by Clerk</div>} />
              <Route path="/logout" element={<div>Logout handled by Clerk</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>,
)
