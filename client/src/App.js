import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Details from "./components/screens/Details";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/details">
				<Details />
			</Route>
		</BrowserRouter>
	);
}

export default App;
