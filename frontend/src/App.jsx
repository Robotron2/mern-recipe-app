import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
// import RecipeDetail from "./pages/RecipeDetail"
// import MyRecipe from "./pages/MyRecipe"
// import FavRecipe from "./pages/FavRecipe"
// import EditRecipe from "./pages/EditRecipe" /

// ✅ Dummy Protected Route wrapper
const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token")
	if (!token) {
		// Redirect unauthenticated users to home (or login modal)
		return <Navigate to="/" replace />
	}
	return children
}

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				{/* Home */}
				<Route path="/" element={<Home />} />

				{/* Protected Routes */}
				<Route
					path="/myRecipe"
					element={
						<ProtectedRoute>
							<MyRecipe />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/favRecipe"
					element={
						<ProtectedRoute>
							<FavRecipe />
						</ProtectedRoute>
					}
				/>

				{/* Dynamic routes */}
				<Route path="/recipe/:id" element={<RecipeDetail />} />
				<Route
					path="/editRecipe/:id"
					element={
						<ProtectedRoute>
							<EditRecipe />
						</ProtectedRoute>
					}
				/>

				{/* 404 fallback */}
				<Route
					path="*"
					element={<h2 style={{ textAlign: "center", marginTop: "2rem" }}>404 - Page not found</h2>}
				/>
			</Routes>
		</Router>
	)
}
