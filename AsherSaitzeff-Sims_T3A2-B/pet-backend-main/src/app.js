import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import requestIp from "request-ip";
import { rateLimit } from "express-rate-limit";
import morganMiddleware from "./logger/morgan.logger.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import indexRouter from "./routes/index.js";

const app = express();
const httpServer = createServer(app);

app.use(cors());


app.use(requestIp.mw());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 500, 
    standardHeaders: true, 
    legacyHeaders: false, 
    keyGenerator: (req, res) => {
        return req.clientIp; 
    },
    handler: (_, __, ___, options) => {
        throw new ApiError(
            options.statusCode || 500,
            `There are too many requests. You are only allowed ${options.max
            } requests per ${options.windowMs / 60000} minutes`
        );
    },
});

app.use(limiter);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

app.use(morganMiddleware);
app.get("/", async (req, res) => {
    res.json({
        status: true,
        statucCode: 200,
        message: "Welcome to pet adoption"
    })
});
app.use("/api/v1", indexRouter);

app.use(errorHandler);

export { httpServer };