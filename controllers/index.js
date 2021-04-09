import {
	scrapeProductsUseCase,
	getProductsUseCase,
} from "../use-cases/index.js";
import makeScrapeProducts from "./scrape-products.js";
import makeGetProducts from "./get-products.js";

const scrapeProductsController = makeScrapeProducts({ scrapeProductsUseCase });
const getProductsController = makeGetProducts({ getProductsUseCase });

const productController = Object.freeze({
	scrapeProductsController,
	getProductsController,
});

export default productController;

export { scrapeProductsController, getProductsController };
