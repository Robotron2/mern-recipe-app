import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Modal from "./Modal"
import InputForm from "./InputForm"

export default function Navbar() {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem("token")
		const storedUser = localStorage.getItem("user")

		setIsAuthenticated(!!token)
		setUser(storedUser ? JSON.parse(storedUser) : null)
	}, [])

	const handleAuthAction = () => {
		if (isAuthenticated) {
			localStorage.removeItem("token")
			localStorage.removeItem("user")
			setIsAuthenticated(false)
			setUser(null)
			navigate("/")
		} else {
			setIsOpen(true)
		}
	}

	return (
		<>
			<header className="navbar">
				<h2 className="logo">Food Blog</h2>
				<nav>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink
								to={isAuthenticated ? "/myRecipe" : "#"}
								onClick={() => !isAuthenticated && setIsOpen(true)}>
								My Recipe
							</NavLink>
						</li>
						<li>
							<NavLink
								to={isAuthenticated ? "/favRecipe" : "#"}
								onClick={() => !isAuthenticated && setIsOpen(true)}>
								Favourites
							</NavLink>
						</li>
						<li>
							<button className="login-btn" onClick={handleAuthAction}>
								{isAuthenticated ? `Logout (${user?.email || ""})` : "Login"}
							</button>
						</li>
					</ul>
				</nav>
			</header>

			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<InputForm setIsOpen={setIsOpen} />
				</Modal>
			)}
		</>
	)
}
