import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// VAPID key: use .env com VITE_VAPID_KEY ou deixe em branco para usar o valor no código
const vapidKey = process.env.VITE_VAPID_KEY || "";

export default {
    entry: "./firebase-messaging-sw.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "firebase-messaging-sw.js",
        publicPath: "/",
    },
    target: "webworker",
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    devtool: process.env.NODE_ENV === "production" ? false : "eval-source-map",
    plugins: [
        new webpack.DefinePlugin({
            VAPID_KEY_INJECT: JSON.stringify(vapidKey),
        }),
    ],
    resolve: {
        fallback: {
            buffer: false,
            crypto: false,
        },
    },
};
