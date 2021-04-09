import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import "../../css/Details.css";
import { useLocation } from "react-router-dom";

function Details() {
	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}
	let query = useQuery();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [screenshots, setScreenshots] = useState([]);
	useEffect(() => {
		console.log(query.get("pkg"));
		fetch(`/getProducts/${query.get("pkg")}`, {
			method: "get",
			headers: {
				Connection: "keep-alive",
			},
		})
			.then((response) => response.json())
			.then(async (result) => {
				let screenshots = [];
				for await (let x of result.screenshots) {
					screenshots.push(x);
				}
				setData(result);
				setScreenshots(screenshots);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, []);
	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<div className="homeDetails">
					<div className="card horizontal homeDetailsCard">
						<div className="card-image app-img">
							<img src={data.image_src} />
						</div>
						<div className="card-stacked">
							<div className="card-content">
								<div className="card-title">
									<h2>{data.title}</h2>
								</div>
								<div className="metaData">
									<div className="companyName">
										<b>{data.company_name}</b>
									</div>
									<div className="appGenre">
										<b>{data.app_genre}</b>
									</div>
								</div>
								<br />
								<hr />

								<div className="screenshotDiv">
									{screenshots.map((img, i) => {
										return (
											<div className="card-image screenshot" key={i}>
												<img src={img} />
											</div>
										);
									})}
								</div>
								<pre>{data.description}</pre>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Details;
