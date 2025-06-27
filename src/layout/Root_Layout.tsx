import { Outlet } from "react-router"
import Header from "../components/header"
import Footer from "../components/footer"


const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
