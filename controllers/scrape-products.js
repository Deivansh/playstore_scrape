export default function makeScrapeProducts({ scrapeProductsUseCase }) {
	return async function scrapeProduct(httpRequest) {
		const headers = {
			"Content-Type": "application/json",
		};
		try {
			if (httpRequest.path == "/getScrapeStatus") {
				var scrapeStatus = await scrapeProductsUseCase.findScrapeStatus();
				return {
					headers,
					statusCode: 200,
					body: scrapeStatus,
				};
			} else {
				var scrapeProductsAck = await scrapeProductsUseCase.scrapeAllProducts();
				return {
					headers,
					statusCode: 200,
					body: scrapeProductsAck,
				};
			}
		} catch (e) {
			console.log(`scrapeProduct Error: ${e}`);
			return {
				headers,
				statusCode: 400,
				body: {
					error: e.message,
				},
			};
		}
	};
}
