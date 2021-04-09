export default function makeScrapeProducts({ productsDb, puppeteer, pqueue }) {
	return Object.freeze({
		scrapeAllProducts,
	});

	async function scrapeAllProducts(cb) {
		const queue = new pqueue({
			concurrency: 5,
		});
		var results = [];
		let scrape_url =
			"https://play.google.com/store/apps/collection/topselling_free";
		let browser = await puppeteer.launch();
		let page = await browser.newPage();
		await page.goto(scrape_url, { waitUntil: "load" });
		let data = await page.evaluate(async () => {
			let data = document.querySelectorAll("a.poRVub");
			data = Array.from(data, (item) => item.href);
			return data;
		});
		await page.close();
		console.time("bringinfo");
		for (let x of data) {
			queue.add(
				async () =>
					await getAppInformation(browser, x, results, (len) => cb(len))
			);
		}
		await queue.onIdle();
		console.timeEnd("bringinfo");
		await browser.close();
		const products = await productsDb.insertAll(results);
		return products;
	}

	async function getAppInformation(browser, url, results, cb) {
		let page = await browser.newPage();
		await page.goto(url, { waitUntil: "load" });
		let data = await page.evaluate(async () => {
			let title = document.querySelector('h1[itemprop="name"]').innerText;
			let image_src = document.querySelector("img.T75of.sHb2Xb").src;
			let company_name = document.querySelector("a.hrTbp.R8zArc").innerText;
			let app_genre = document.querySelector('a[itemprop="genre"]').innerText;
			let screenshots = document.querySelectorAll("img.T75of.DYfLw");
			screenshots = Array.from(screenshots, (screenshot) => screenshot.src);
			let description = document.querySelector("div[jsname='sngebd']")
				.innerText;
			return {
				title,
				image_src,
				company_name,
				app_genre,
				screenshots,
				description,
			};
		});
		data["package_id"] = url.split("=")[1];
		await page.close();
		// console.log(data);
		results.push(data);
		cb(results.length);
		return;
	}
}
