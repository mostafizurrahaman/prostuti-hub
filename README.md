# Prostuti App Backend:

### Morgan (Middleware)

- Morgan: Logs incoming http requests into terminal
- Step 1: `npm install morgan`
- Then Setup the morgan middleware:

```js
import morgan from "morgan";
import express from "express";

const app = express();

app.use(
   morgan(":method :url :status :res[content-length] - :response-time ms"),
);

// as morgan first parameter you can pass:
// combined, common, dev, short, tiny and common
// we used custom one.
```

### Helmet:

```js
import helmet from "helmet";
import express from "express";

const app = express();

app.use(helmet());
```
