// import React, { useEffect, useState } from 'react'
// import Modal from "./Modal"
// import InputForm from "./InputForm"
import { NavLink } from "react-router-dom"

export default function Navbar() {
	return (
		<>
			<header>
				<h2>Food Blog</h2>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/">My Recipe</NavLink>
					</li>
					<li>
						<NavLink to="/">Favorites</NavLink>
					</li>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
				</ul>
			</header>
			{/* { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>} */}
		</>
	)
}
