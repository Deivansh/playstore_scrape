import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css";
import Loading from "../screens/Loading";

function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [scraping, setScraping] = useState(false);
	let scrapeBtnRef = useRef();
	useEffect(() => {
		if (!loading) setLoading(true);
		fetch("/getProducts", {
			method: "get",
			headers: {
				Connection: "keep-alive",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				setData(result);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, []);
	var myinterval;
	const scrapeProducts = async (e) => {
		await scrapeBtnRef.current.classList.add("disabled");
		setScraping(true);
		fetch("/scrapeProducts", {
			method: "get",
			headers: {
				Connection: "keep-alive",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.status === "Started") {
					myinterval = setInterval(checkScrapeStatus, 10000);
				}
				// setData(result);
			})
			.catch((err) => {
				setScraping(false);
				scrapeBtnRef.current.classList.remove("disabled");
				console.log(err);
			});
	};

	async function checkScrapeStatus() {
		// console.log("calling scrape status");
		fetch("/getScrapeStatus", {
			method: "get",
			headers: {
				Connection: "keep-alive",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				// console.log(result);
				if (result.status === "Completed") {
					clearInterval(myinterval);
					fetch("/getProducts", {
						method: "get",
						headers: {
							Connection: "keep-alive",
						},
					})
						.then((response) => response.json())
						.then((result) => {
							setData(result);
							setScraping(false);
							scrapeBtnRef.current.classList.remove("disabled");
						})
						.catch((err) => {
							setScraping(false);
							scrapeBtnRef.current.classList.remove("disabled");
							console.log(err);
						});
				}
			})
			.catch((err) => {
				clearInterval(myinterval);
				setScraping(false);
				scrapeBtnRef.current.classList.remove("disabled");
			});
	}
	return (
		<div>
			<div className="scrape-button-div">
				<a
					className="waves-effect waves-light btn scrape-button"
					ref={scrapeBtnRef}
					onClick={scrapeProducts}
				>
					<i className="material-icons left">cloud_download</i>
					{scraping ? <span>Scraping...</span> : <span>Re-Scrape</span>}
				</a>
			</div>
			{loading ? (
				<Loading />
			) : (
				<div className="homeGallery">
					{data.map((product) => {
						return (
							<div className="card homeCard" key={product._id}>
								<Link to={`/details?pkg=${product.package_id}`}>
									<div className="card-image">
										<img className="product-img" src={product.image_src} />
									</div>
									<div className="card-content">
										<p>
											<b>{product.title}</b>
										</p>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Home;
