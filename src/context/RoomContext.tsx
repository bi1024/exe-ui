import { createContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router";
import socketIOClient, { Socket } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { v4 as uuidV4 } from "uuid";
import { peersReducer, PeerState } from "./reducer/peerReducer";
import { addPeerAction, removePeerAction } from "./reducer/peerAction";
const WS = import.meta.env.VITE_SERVER_URL;

export const RoomContext = createContext<IContext | null>(null);

const ws = socketIOClient(WS);

interface IContext {
    ws: Socket
    myPeer: Peer
    stream: MediaStream
    peers: PeerState
    myCall: MediaConnection
    handleClickEndMeeting: () => void
    handleToogleAudio: () => void
    handleToogleVideo: () => void
}

function getCurrentTime() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMilliseconds = String(milliseconds).padStart(3, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

export function RoomProvider({ children }) {

    const navigate = useNavigate();
    const [myPeer, setMyPeer] = useState<Peer>(null);
    const [stream, setStream] = useState<MediaStream>();
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [myCall, setMyCall] = useState<MediaConnection>(null);

    function enterRoom({ roomId }) {
        console.log(`enter room ${roomId}`);
        navigate(`/room/${roomId}`);
    }
    
    function getUsers({ participants } : { participants: string[] }) {
        // console.log({ participants });
    }

    function removePeer(peerId: string) {
        dispatch(removePeerAction(peerId));
    }

    function handleClickEndMeeting() {
        if(myCall) {
            myCall.close();
            ws.emit('leave-room');
        }
        navigate('/');
    }

    function handleToogleAudio() {
        let localStream = new MediaStream(stream.getTracks());
        let currentValue = localStream.getAudioTracks()[0].enabled;
        localStream.getAudioTracks()[0].enabled = !currentValue;
        setStream(localStream);
    }

    function handleToogleVideo() {
        let localStream = new MediaStream(stream.getTracks());
        let currentValue = localStream.getVideoTracks()[0].enabled;
        localStream.getVideoTracks()[0].enabled = !currentValue;
        setStream(localStream);
    }

    useEffect(() => {
        // const meId = uuidV4();
        const token = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user) {
            console.log('Need token and user');
            return;
        }
        // todo: nếu mở 2 tab khác nhau thì ko vào được, vì peer dùng chung user.id nên ko tạo mới peer được
        const peer = new Peer(user.id, {
            host: import.meta.env.VITE_PEER_HOST || 'localhost',
            // port: import.meta.env.VITE_PEER_PORT || 5000
            path: '/',
            secure: true
        });
        console.log('my uuid: ', peer._id);
        peer.on('open', (id) => {
            console.log('connect peer success, id:', id);
            setMyPeer(peer);
        })

        peer.on('error', (err) => {
            console.log(err);
        })

        try {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream) => {
                setStream(stream);
            })
        } catch(err) {  
            console.log(err);
        }

        ws.on('room-created', enterRoom);
        ws.on('get-users', getUsers);
        ws.on('user-disconnected', removePeer);

        return () => {
            ws.off('room-created', enterRoom);
            ws.off('get-users', getUsers);
            ws.off('user-disconnected', removePeer);
            if (myPeer) {
                myPeer.destroy();
            }
        }
    }, []);

    useEffect(() => {
        console.log('test!');
        if(!myPeer || !stream) return;

        if(myCall) {
            myCall.answer(stream);
            return;
        }

        // // receive call from (1), send back my stream to people joining in the room
        myPeer.on('call', (call) => {
            console.log('receive new call');
            setTimeout(() => {
                console.log('2', getCurrentTime());
                call.answer(stream); // 2. send back my stream
            }, 1000);
            call.on('stream', (peerStream) => { // 3. receive stream, add video
                console.log('3', getCurrentTime());
                dispatch(addPeerAction(call.peer, peerStream));
            })
            setMyCall(call);
        })

        // message from server: someone has joined, other people should call & send stream to that person (1)
        ws.on('user-joined', ({peerId}: {peerId: string}) => {
            console.log('new user has just joined room', peerId);
            setTimeout(() => {
                console.log('1', getCurrentTime());
                const call = myPeer.call(peerId, stream); // 1. call, send stream to new person
                call.on('stream', (peerStream) => { // 4. receive stream from new person
                    console.log('4', getCurrentTime());
                    dispatch(addPeerAction(peerId, peerStream));
                })
            setMyCall(call);
            }, 1000);

        })
    }, [myPeer, stream, myCall]);

    // console.log('Room Context called!!');
    return (
        <RoomContext.Provider value={{ ws, myPeer, stream, peers, myCall, handleToogleAudio, handleToogleVideo, handleClickEndMeeting }}>{children}</RoomContext.Provider>
    )
}
