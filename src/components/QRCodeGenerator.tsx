import {useEffect, useState} from "react";
import {QRCode} from "antd";
import {getFingerprint} from "../utils/generateSessionId";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig.ts";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
const QrCodeGenerator: React.FC = () => {
    const [showQrBar, setshowQrBar] = useState<boolean>(false);
    const [newSessionId, setNewSessionId] = useState<string>(null);


    useEffect(() => {
        getFingerprint().then(value => {
            setNewSessionId(value)
            setDoc(doc(collection(db, "sessions"), value), {
                lastUpdated: new Date(),
            }, { merge: true }).then(() => {
                setshowQrBar(true);
            });
        });

    }, [])


    return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
            {
                showQrBar && <div style={{marginTop: "20px"}}>
                    <QRCode value={newSessionId} size={200}/>
                    <p>Scan this QR code to connect {newSessionId}</p>
                </div>
            }
        </div>
    );
};

export default QrCodeGenerator;
