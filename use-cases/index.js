import makeScrapeProducts from "./scrape-products.js";
import makeGetProducts from "./get-products.js";
import { productsDb, scrapeStatusDb } from "../data-access/index.js";
import puppeteer from "puppeteer";
import pqueue from "p-queue";

const scrapeProductsUseCase = makeScrapeProducts({
	productsDb,
	scrapeStatusDb,
	puppeteer,
	pqueue,
});

const getProductsUseCase = makeGetProducts({ productsDb });

const productService = Object.freeze({
	scrapeProductsUseCase,
	getProductsUseCase,
});

export default productService;

export { scrapeProductsUseCase, getProductsUseCase };
