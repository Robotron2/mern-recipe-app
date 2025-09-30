import React, { useEffect, useState } from "react"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { BsStopwatchFill } from "react-icons/bs"
import { FaHeart, FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import axios from "axios"

export default function RecipeItems() {
	const loaderData = useLoaderData()
	const [allRecipes, setAllRecipes] = useState([])
	const [favItems, setFavItems] = useState(() => JSON.parse(localStorage.getItem("fav")) || [])
	const navigate = useNavigate()
	const isMyRecipePage = window.location.pathname === "/myRecipe"
	const api = import.meta.env.VITE_API_URL

	useEffect(() => {
		setAllRecipes(loaderData || [])
	}, [loaderData])

	const onDelete = async (id) => {
		try {
			await axios.delete(`${api}/recipe/${id}`)
			setAllRecipes((prev) => prev.filter((recipe) => recipe._id !== id))
			const updatedFav = favItems.filter((recipe) => recipe._id !== id)
			setFavItems(updatedFav)
			localStorage.setItem("fav", JSON.stringify(updatedFav))
		} catch (error) {
			console.error("Delete failed:", error)
		}
	}

	const toggleFavourite = (item) => {
		const exists = favItems.some((fav) => fav._id === item._id)
		let updated
		if (exists) {
			updated = favItems.filter((fav) => fav._id !== item._id)
		} else {
			updated = [...favItems, item]
		}
		setFavItems(updated)
		localStorage.setItem("fav", JSON.stringify(updated))
	}

	return (
		<div className="card-container">
			{allRecipes.map((item) => (
				<div key={item._id} className="card" onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
					<img src={`${api}/images/${item.coverImage}`} alt={item.title} width="120" height="100" />
					<div className="card-body">
						<div className="title">{item.title}</div>
						<div className="icons">
							<div className="timer">
								<BsStopwatchFill />
								{item.time}
							</div>
							{!isMyRecipePage ? (
								<FaHeart
									onClick={() => toggleFavourite(item)}
									style={{ color: favItems.some((res) => res._id === item._id) ? "red" : "" }}
								/>
							) : (
								<div className="action">
									<Link to={`/editRecipe/${item._id}`} className="editIcon">
										<FaEdit />
									</Link>
									<MdDelete onClick={() => onDelete(item._id)} className="deleteIcon" />
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
