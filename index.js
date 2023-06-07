"use strict";

/**
 * Logs requests
 *
 * @param { string[] } [ignoreList]
 *
 * @return { function(*, *, *): void }
 */
function reqLog(ignoreList = []) {
    const ignores = process.env.NODE_ENV === "production" ? ignoreList.slice() : [];
    const kl      = 1024;
    const mb      = kl * kl;

    return (req, res, next) => {
        if (ignores.length > 0 && (ignores.includes(req.baseUrl) || ignores.includes(req.baseUrl + req.path))) {
            next();
            return;
        }

        const startTime = Date.now();

        res.on("finish", () => {
            const reqTx  = req.method.padEnd(4);
            const time   = Date.now() - startTime;
            const timeTx = time < 1000 ? time.toString() : (time / 1000).toFixed(1) + "s";
            const size   = parseInt((req.method === "POST" ? req : res).get("Content-Length") || "0");
            const sizeTx = size < kl ? size.toString() : size < mb ? (size / kl).toFixed(1) + "K" : (size / mb).toFixed(1) + "M";
            const stat   = res.statusCode;
            const color  = stat >= 500 ? 31 : stat >= 400 ? 33 : stat >= 300 ? 36 : stat >= 200 ? 32 : 0;
            const statTx = "\x1b[" + color + "m" + stat + "\x1b[0m";
            const logTx  = statTx + " " + reqTx + " " + timeTx.padStart(5) + " " + sizeTx.padStart(7) + " " + req.originalUrl + "\n";

            process.stdout.write(logTx);
        });

        next();
    };
}

module.exports = {
    reqLog,
};
