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

		let response: Response;

        if (cookies && cookies.includes(requiredCookie)) {
            response = new Response('<h1>Hello World</h1>', {
                headers: { 'Content-Type': 'text/html' },
            });
        } else {
			if (referer) {
				// return 403
				response = new Response('Forbidden', {
					status: 403,
					headers: {
						'Content-Type': 'text/plain',
					},
				});
			} else {
				response = new Response('Setting cookie and redirecting...', {
					headers: {
						'Set-Cookie': 'resource=allowed; Path=/; HttpOnly',
						'Content-Type': 'text/plain',
						'Location': 'https://wrapper.gr8.engineer',
					},
					status: 302,
				});
			}
        }

		return response;
    },
} satisfies ExportedHandler<Env>;
