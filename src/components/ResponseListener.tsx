import React, { useEffect, useState } from 'react';
import {getSocket} from "../services/socket.ts";

function ResponseListener() {
    const [response, setResponse] = useState<string | null>(null);

    useEffect(() => {
        const socket = getSocket();

        socket.on('mobile-response', (data: string) => {
            setResponse(data);
        });

        return () => {
            socket.off('mobile-response');
        };
    }, []);

    return (
        <div>
            <h2>Mobile Response:</h2>
            {response ? <p>{response}</p> : <p>Waiting for response...</p>}
        </div>
    );
}

export default ResponseListener;
