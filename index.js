import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import makeCallback from "./express-callback/index.js";
import {
	scrapeProductsController,
	getProductsController,
} from "./controllers/index.js";

const app = express();
const port = process.env.PORT || 8181;

app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.get("/scrapeProducts", makeCallback(scrapeProductsController));
app.get("/getProducts", makeCallback(getProductsController));
app.get("/getProducts/:package_id", makeCallback(getProductsController));

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	import path from "path";
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`App is listening on 8181`);
});

export default app;
