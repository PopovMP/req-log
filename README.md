# Request Logger for Express

Simple request logger for `express`.

## Usage

```js
const {reqLog} = require("@popovmp/req-log");

app.use(reqLog()); // app is an express application
```

`req-log` prints stats for the requests in columns as follows:

  - HTTP status code: `200, 304, 404, 500, ...`
  - Request verb: `POST, GET, HEAD, ...`
  - Request time in milliseconds or seconds: `22, 1.3s`
  - The transaction size. It prints the response size on `GET` and the request size on `POST`
  - The path

![req-log](https://image-holder.forexsb.com/store/req-log.png)

## API

You can use `reeq-log` without parameters to print all requests.

```js
app.use(reqLog());
```

Yuo can also add as a parameter the list of paths you want to ignore for logging.

```js
app.use(reqLog(["favicon.ico", "ignore/path-1", "ignore/path-2"]));
```

## license

MIT
