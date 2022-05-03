import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import io from "socket.io-client";
import { useRouter } from 'next/router'
import { isProd } from "@configs/vairables";
let socket: any;

const Home: NextPage = () => {
    const router = useRouter()
    const { roomName } = router.query;
    const [ input, setInput ] = React.useState("");
    const [ messages, setMessages ] = React.useState<any>([]);
    const messagesEndRef = React.useRef<null | HTMLDivElement>(null)

    React.useEffect(() => {
        if (!roomName) {
            return;
        }
        socket = io({
            path: isProd ? "/socketio/api/socket" : "/api/socket",
            query: {
                roomName
            }
        })
        socket.on("updateMessage", (msg: { msg: String, userId: Number }) => {
            setMessages((messages: any) => [ ...messages, msg ]);
        });

        // Clean up the socket connection when the component unmountss
        return () => socket.disconnect();
    }, [ roomName ]);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [ messages ]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        setMessages((messages: any) => [ ...messages, { msg: input, userId: socket?.id } ]);
        socket.emit("message", {
            msg: input,
            userId: socket?.id,
        });
        setInput("");
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography variant="h4" sx={{
                p: 1,
                textAlign: "center",
            }}>
                Connected to room: {roomName}
            </Typography>
            <List sx={{
                border: "1px solid black",
                height: "60vh",
                overflowY: "auto",
                p: 1,
            }}>

                {
                    messages.map((msg: any, index: any) => (
                        <ListItem
                            key={index}>
                            <ListItemText
                                primary={msg.msg}
                                secondary={msg.userId === socket?.id ? "You" : "Other"}
                                sx={{
                                    textAlign: msg.userId === socket?.id ? "end !important" : "start !important",
                                    px: 5
                                }}
                            />
                        </ListItem>
                    ))
                }
                <Box ref={messagesEndRef} />
            </List>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                my: 2
            }}>
                <TextField
                    label="Message"
                    sx={{
                        flexGrow: 1
                    }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <Button
                    disabled={!input}
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    sx={{
                        py: 2,
                        px: 5
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box >
    );
};

export default Home;
