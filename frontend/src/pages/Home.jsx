import foodRecipe from "../assets/foodRecipe.png"
import RecipeItems from "../components/RecipeItems"

const Home = () => {
	return (
		<>
			<section className="home">
				<div className="left">
					<h1>Food Recipe</h1>
					<h5>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut voluptatem obcaecati consectetur
						alias beatae, autem placeat quaerat reiciendis eum rem eaque molestias magni ipsam consequuntur
						ratione a est, praesentium eos!
					</h5>
					<button>Share your recipe</button>
				</div>
				<div className="recipe">
					<img src={foodRecipe} width={"320px"} height={"300px"} alt="" />
				</div>
			</section>
			<div className="bg">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#d4f6e8"
						fillOpacity="1"
						d="M0,32L40,42.7C80,53,160,75,240,117.3C320,160,400,224,480,213.3C560,203,640,117,720,112C800,107,880,181,960,208C1040,235,1120,213,1200,224C1280,235,1360,277,1400,298.7L1440,320L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
				</svg>
			</div>
			<RecipeItems />
		</>
	)
}

export default Home
