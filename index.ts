// mock server

Bun.serve({
  fetch(req) {
    const { pathname } = new URL(req.url);

    let res: Response;
    if (pathname === "/xml") {
      res = new Response(`<foo>    
      <this-content-will-not-be-formatted     /></foo>`);
      res.headers.set("Content-Type", "text/xml");
    } else if (pathname === "/html") {
      res = new Response(`<html><body></body></html>`);
      res.headers.set("Content-Type", "text/html");
    } else {
      res = new Response(JSON.stringify({ a: 1 }));
      res.headers.set("Content-Type", "application/json");
    }
    // res.headers.set("Access-Control-Allow-Origin", "*");
    // res.headers.set("Access-Control-Allow-Methods", "*");

    return res;
  },
  port: 8080,
});
