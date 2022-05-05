import * as React from "react";
import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router'
import ChatUI from "@components/Custom/ChatUI";

const Home: NextPage = () => {
    const router = useRouter();
    const { roomName } = router.query;
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{
                p: 1,
                textAlign: "center",
            }}>
                Connected to room: {roomName}
            </Typography>
            <ChatUI />
        </React.Fragment>
    );
};

export default Home;
