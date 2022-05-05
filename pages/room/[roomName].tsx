import * as React from "react";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/router'
import ChatUI from "@components/Custom/ChatUI";

const Home: NextPage = () => {
    const router = useRouter();
    const { roomName } = router.query;
    return (
        <React.Fragment>
            <Typography sx={{
                p: 1,
                fontSize: "20px",
                fontWeight: "100",
                textAlign: "center",
            }}>
                Room Name:
                <Box
                    component='span'
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        px: 1,
                    }}>
                    {roomName}
                </Box>
            </Typography>
            <ChatUI />
        </React.Fragment>
    );
};

export default Home;
