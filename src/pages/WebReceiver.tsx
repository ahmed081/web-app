import  { useState } from "react";
import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    addDoc,
} from "firebase/firestore";
import QRCode from "react-qr-code";
import {db} from "../utils/firebaseConfig.ts";

export default function WebReceiver() {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [receivedFile, setReceivedFile] = useState<string | null>(null);

    const createSession = async () => {
        const callDoc = doc(collection(db, "sessions"));
        setSessionId(callDoc.id);

        const offerCandidates = collection(callDoc, "offerCandidates");
        const answerCandidates = collection(callDoc, "answerCandidates");

        const peerConnection = new RTCPeerConnection();
        const dataChannel = peerConnection.createDataChannel("fileChannel");

        dataChannel.onmessage = (e) => {
            const blob = new Blob([e.data]);
            const url = URL.createObjectURL(blob);
            setReceivedFile(url);
        };

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                await addDoc(offerCandidates, event.candidate.toJSON());
            }
        };

        const offerDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offerDescription);

        await setDoc(callDoc, { offer: offerDescription });

        // Listen for answer from mobile
        onSnapshot(callDoc, async (snapshot) => {
            const data = snapshot.data();
            if (data?.answer && !peerConnection.currentRemoteDescription) {
                await peerConnection.setRemoteDescription(data.answer);
            }
        });

        // Listen for ICE candidates from mobile
        onSnapshot(answerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                }
            });
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Web Receiver</h2>
            {!sessionId && <button onClick={createSession}>Create Session</button>}

            {sessionId && (
                <>
                    <p>Scan this QR code with mobile:{sessionId}</p>
                    <QRCode value={sessionId} />
                </>
            )}

            {receivedFile && (
                <div>
                    <a href={receivedFile} download="received-file">Download File</a>
                </div>
            )}
        </div>
    );
}
