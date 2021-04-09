import makeProductsDb from "./products-db.js";
import makeScrapeStatusDb from "./scrapestatus-db.js";
import mongoose from "mongoose";
import Product from "../models/product.js";
import ScrapeStatus from "../models/scrape_status.js";
import keys from "../config/prod.js";

mongoose.connect(
	keys.url,
	{
		dbName: keys.dbName,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.error("DB connection error: " + err);
		else console.log("DB connected!");
	}
);

export async function makeDb() {
	const db = mongoose.connection;
	db.on("error", (err) => {
		console.error("DB connection error: " + err);
	});
	db.on("disconnect", () => {
		console.error("DB disconnected!");
	});
}

const productsDb = makeProductsDb({ Product });
const scrapeStatusDb = makeScrapeStatusDb({ ScrapeStatus });

// export { scrapeProductsController, getProductsController };

export { productsDb, scrapeStatusDb };
