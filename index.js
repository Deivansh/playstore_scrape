import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import timeout from "connect-timeout";
import path from "path";
import makeCallback from "./express-callback/index.js";
import {
	scrapeProductsController,
	getProductsController,
} from "./controllers/index.js";

const app = express();
app.use(timeout(180000));
const port = process.env.PORT || 8181;

app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.get("/scrapeProducts", makeCallback(scrapeProductsController));
app.get("/getProducts", makeCallback(getProductsController));
app.get("/getProducts/:package_id", makeCallback(getProductsController));
app.get("/getScrapeStatus", makeCallback(scrapeProductsController));

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`App is listening on ${port}`);
});

export default app;
