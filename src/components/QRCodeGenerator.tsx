import React, {useRef, useState} from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator() {
    const [offer, setOffer] = useState<string | null>(null);
    const [connectionStatus, setConnectionStatus] = useState('Not connected');
    const peerConnection = useRef<RTCPeerConnection>(new RTCPeerConnection());

    const startConnection = async () => {
        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('ICE Candidate:', event.candidate);
            }
        };


        // Create an SDP offer
        const localOffer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(localOffer);

        setOffer(JSON.stringify(localOffer));
        console.log('Offer created:', localOffer);
    };

    const handleAnswer = async (answer: string) => {
        if (!peerConnection.current) return;

        const remoteDesc = new RTCSessionDescription(JSON.parse(answer));
        await peerConnection.current.setRemoteDescription(remoteDesc);

        setConnectionStatus('Connected');
        console.log('Connected to remote peer');
    };

    return (<div>
            <h1>WebRTC Connection</h1>

            {!offer ? (<button onClick={startConnection}>Start Connection</button>) : (<div>
                    <h2>Scan the QR Code with Mobile App</h2>

                <QRCode value={offer} size={200}/>
                </div>)}

            <div>
                <h3>Connection Status: {connectionStatus}</h3>
                <textarea
                    placeholder="Paste Answer SDP here"
                    onBlur={(e) => handleAnswer(e.target.value)}
                />
            </div>
        </div>);
}

export default QRCodeGenerator;
