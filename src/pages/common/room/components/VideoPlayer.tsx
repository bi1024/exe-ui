import { useEffect, useRef, VideoHTMLAttributes } from "react"

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
    stream: MediaStream
    isMuted: boolean,
}

export default function VideoPlayer({ stream, isMuted, ...props } : Props) {

    const videoRef = useRef<HTMLVideoElement>();

    useEffect(() => {
        if(videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);

    return (
        <video 
            ref={videoRef} 
            autoPlay 
            muted={isMuted}
            {...props}
        >
        </video>
    )
}