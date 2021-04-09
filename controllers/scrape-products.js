export default function makeScrapeProducts({ scrapeProductsUseCase }) {
	return async function scrapeProduct(httpRequest) {
		const headers = {
			"Content-Type": "application/json",
		};
		try {
			var scrapeProductsAck = await scrapeProductsUseCase.scrapeAllProducts(
				(status) => {
					console.log(status);
				}
			);
			return {
				headers,
				statusCode: 200,
				body: scrapeProductsAck,
			};
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
