
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const generateSessionId = () => {
    return Math.random().toString(36).substr(2, 20);
};


export const getFingerprint = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId; // Unique device fingerprint
};