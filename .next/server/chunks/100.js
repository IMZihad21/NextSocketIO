"use strict";
exports.id = 100;
exports.ids = [100];
exports.modules = {

/***/ 100:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(612);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _configs_vairables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(639);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io_client__WEBPACK_IMPORTED_MODULE_3__]);
socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






let socket;
const ChatUI = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const { roomName  } = router.query;
    const [input, setInput] = react__WEBPACK_IMPORTED_MODULE_1__.useState("");
    const [messages1, setMessages] = react__WEBPACK_IMPORTED_MODULE_1__.useState([]);
    const messagesEndRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        roomName ? socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_3__["default"])({
            path: _configs_vairables__WEBPACK_IMPORTED_MODULE_5__/* .isProd */ .B ? "/socketio/api/socket" : "/api/socket",
            query: {
                roomName
            }
        }) : socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_3__["default"])({
            path: _configs_vairables__WEBPACK_IMPORTED_MODULE_5__/* .isProd */ .B ? "/socketio/api/socket" : "/api/socket"
        });
        socket.on("updateMessage", (msg)=>{
            setMessages((messages)=>[
                    ...messages,
                    msg
                ]
            );
        });
        socket.on("newMember", (msg)=>{
            setMessages((messages)=>[
                    ...messages,
                    msg
                ]
            );
        });
        socket.on("exitMember", (msg)=>{
            setMessages((messages)=>[
                    ...messages,
                    msg
                ]
            );
        });
        // Clean up the socket connection when the component unmountss
        return ()=>socket.disconnect()
        ;
    }, [
        roomName
    ]);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        var ref;
        (ref = messagesEndRef.current) === null || ref === void 0 ? void 0 : ref.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages1
    ]);
    const onSubmit = (e)=>{
        e.preventDefault();
        if (input.trim() === "") return;
        const payload = {
            msg: input,
            sender: socket === null || socket === void 0 ? void 0 : socket.id,
            userId: socket === null || socket === void 0 ? void 0 : socket.id
        };
        socket.emit("message", payload, (msg)=>{
            setMessages((messages)=>[
                    ...messages,
                    msg
                ]
            );
        });
        setInput("");
    };
    const submitOnKeyPress = (e)=>{
        if (e.key === "Enter") {
            onSubmit(e);
        }
    };
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {
        sx: {
            display: "flex",
            flexDirection: "column"
        },
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.List, {
                sx: {
                    border: "1px solid black",
                    height: "60vh",
                    overflowY: "auto",
                    px: 1,
                    my: 1
                },
                children: [
                    messages1.map((msg, index)=>{
                        return msg.sender !== "server" ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.ListItem, {
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.ListItemText, {
                                primary: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                                    sx: {
                                        fontSize: "16px",
                                        fontWeight: "bold"
                                    },
                                    children: msg === null || msg === void 0 ? void 0 : msg.msg
                                }),
                                secondary: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                                    variant: "subtitle2",
                                    sx: {
                                        fontSize: "10px"
                                    },
                                    children: (msg === null || msg === void 0 ? void 0 : msg.userId) !== (socket === null || socket === void 0 ? void 0 : socket.id) ? msg === null || msg === void 0 ? void 0 : msg.sender : "You"
                                }),
                                sx: {
                                    textAlign: (msg === null || msg === void 0 ? void 0 : msg.userId) === (socket === null || socket === void 0 ? void 0 : socket.id) ? "end !important" : "start !important",
                                    px: {
                                        md: 5
                                    }
                                }
                            })
                        }, index) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.ListItem, {
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.ListItemText, {
                                primary: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                                    sx: {
                                        fontSize: "10px",
                                        fontWeight: "bold",
                                        bgcolor: "#70707040",
                                        display: "block",
                                        borderRadius: "10px",
                                        p: 1
                                    },
                                    children: msg === null || msg === void 0 ? void 0 : msg.msg
                                }),
                                sx: {
                                    textAlign: "center !important"
                                }
                            })
                        }, index);
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {
                        ref: messagesEndRef
                    })
                ]
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {
                sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    my: 2
                },
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.TextField, {
                        label: "Message",
                        sx: {
                            flexGrow: 1
                        },
                        size: "small",
                        value: input,
                        onKeyPress: submitOnKeyPress,
                        onChange: (e)=>setInput(e.target.value)
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        disabled: !input,
                        variant: "contained",
                        color: "primary",
                        onClick: onSubmit,
                        sx: {
                            py: 2,
                            px: {
                                md: 5
                            },
                            height: "40px"
                        },
                        children: "Submit"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatUI);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 639:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ isProd)
/* harmony export */ });
const isProd = "production" === "production";


/***/ })

};
;