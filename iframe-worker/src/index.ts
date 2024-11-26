/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx): Promise<Response> {
        const cookies = request.headers.get('cookie');
		const referer = request.headers.get('Referer');
        const requiredCookie = 'resource=allowed';
		const url = new URL(request.url);
        const reset = url.searchParams.get('reset');

		let response: Response;

        if (cookies && cookies.includes(requiredCookie)) {
            response = new Response('<h1>Hello World</h1>', {
                headers: { 'Content-Type': 'text/html' },
            });
        } else {
			// return 403
			response = new Response('Forbidden', {
				status: 403,
				headers: {
					'Content-Type': 'text/plain',
				},
			});
        }

		if (reset) {
			response = new Response('Setting cookie and redirecting...', {
				headers: {
					'Set-Cookie': 'resource=allowed; Path=/; HttpOnly; Secure; SameSite=None',
					'Content-Type': 'text/plain',
					'Location': 'https://wrapper.gr8.engineer',
				},
				status: 302,
			});
		}

		// Add CORS headers if the request is from wrapper.gr8.engineer
		if (referer === 'https://wrapper.gr8.engineer') {
			response.headers.set('Access-Control-Allow-Origin', referer);
			response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
			response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
		}

		// Allow embedding in an iframe from wrapper.gr8.engineer
		response.headers.set('X-Frame-Options', 'ALLOW-FROM https://wrapper.gr8.engineer');
		response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://wrapper.gr8.engineer");

		return response;
    },
} satisfies ExportedHandler<Env>;
