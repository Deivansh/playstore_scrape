export default function makeScrapeProducts({
	productsDb,
	scrapeStatusDb,
	puppeteer,
	pqueue,
}) {
	return Object.freeze({
		scrapeAllProducts,
		findScrapeStatus,
	});

	async function scrapeAllProducts() {
		startScraping();
		const status = await scrapeStatusDb.updateStatus("Started");
		return status;
	}

	async function findScrapeStatus() {
		const status = await scrapeStatusDb.findStatus();
		return status;
	}

	async function startScraping() {
		const queue = new pqueue({
			concurrency: 5,
		});
		var results = [];
		let scrape_url =
			"https://play.google.com/store/apps/collection/topselling_free";
		let browser = await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
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
			queue.add(async () => await getAppInformation(browser, x, results));
		}
		await queue.onIdle();
		console.timeEnd("bringinfo");
		await browser.close();
		const products = await productsDb.insertAll(results);
		if (products) {
			const status = await scrapeStatusDb.updateStatus("Completed");
		}
	}

	async function getAppInformation(browser, url, results) {
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
		results.push(data);
		console.log(results.length);
		return;
	}
}
