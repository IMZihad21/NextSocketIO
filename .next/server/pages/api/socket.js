"use strict";
(() => {
var exports = {};
exports.id = 31;
exports.ids = [31];
exports.modules = {

/***/ 505:
/***/ ((module) => {

module.exports = import("socket.io");;

/***/ }),

/***/ 458:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ isProd)
/* harmony export */ });
const isProd = "production" === "production";


/***/ }),

/***/ 725:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(505);
/* harmony import */ var _configs_vairables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(458);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io__WEBPACK_IMPORTED_MODULE_0__]);
socket_io__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const config = {
    api: {
        bodyParser: false
    }
};
function handler(req, res) {
    if (!res.socket.server.io) {
        console.log("*First use, starting socket.io");
        const httpServer = res.socket.server;
        const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(httpServer, {
            path: _configs_vairables__WEBPACK_IMPORTED_MODULE_1__/* .isProd */ .B ? "/socketio/api/socket" : "/api/socket",
            cors: {
                origin: "*"
            }
        });
        io.on("connection", (socket)=>{
            console.log(`*Client connected: ${socket.id}`);
            const { roomName  } = socket.handshake.query;
            if (roomName) {
                socket.join(roomName);
                socket.to(roomName).emit("newMember", {
                    msg: `${socket.id} joined the chat!`,
                    sender: "server"
                });
                console.log(`*Client joined room: ${roomName}`);
                socket.on("message", (msg, callback)=>{
                    socket.to(roomName).emit("updateMessage", msg);
                    callback(msg);
                });
                socket.on("disconnect", (reason)=>{
                    console.log(`*Client disconnected: ${reason}`);
                    socket.to(roomName).emit("exitMember", {
                        msg: `${socket.id} left the chat!`,
                        sender: "server"
                    });
                });
            } else {
                socket.broadcast.emit("newMember", {
                    msg: `${socket.id} joined the chat!`,
                    sender: "server"
                });
                socket.on("message", (msg, callback)=>{
                    socket.broadcast.emit("updateMessage", msg);
                    callback(msg);
                });
                socket.on("disconnect", (reason)=>{
                    console.log(`*Client disconnected: ${reason}`);
                    socket.broadcast.emit("exitMember", {
                        msg: `${socket.id} left the chat!`,
                        sender: "server"
                    });
                });
            }
        });
        res.socket.server.io = io;
    } else {
        console.log("socket.io already running");
    }
    res.end();
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(725));
module.exports = __webpack_exports__;

})();