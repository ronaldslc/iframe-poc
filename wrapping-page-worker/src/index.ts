export default {
    async fetch(request, env, ctx): Promise<Response> {
		const iframeHTML = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Iframe Example</title>
			</head>
			<body>
				<iframe src="https://iframe.gr8.engineer" width="100%" height="100%"></iframe>
			</body>
			</html>
		`;
		return new Response(iframeHTML, {
			headers: { 'Content-Type': 'text/html' },
		});
    },
} satisfies ExportedHandler<Env>;