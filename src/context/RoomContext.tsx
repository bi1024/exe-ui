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

    useEffect(() => {
        // const meId = uuidV4();
        const token = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user"));
        if(!token || !user) {
            console.log('Need token and user');
            return;
        }
        const peer = new Peer(user.id, {
            host: import.meta.env.VITE_PEER_HOST || 'localhost',
            port: import.meta.env.VITE_PEER_PORT || 5000,
        });
        console.log('my uuid: ', peer._id);
        peer.on('open', () => {
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
        if(!myPeer || !stream) return;

        // // receive call from (1), send back my stream to people joining in the room
        myPeer.on('call', (call) => {
            setTimeout(() => {
                call.answer(stream); // 2. send back my stream
                call.on('stream', (peerStream) => { // 3. receive stream, add video
                    dispatch(addPeerAction(call.peer, peerStream));
                })
                setMyCall(call);
            }, 500);

        })

        // message from server: someone has joined, other people should call & send stream to that person (1)
        ws.on('user-joined', ({peerId}: {peerId: string}) => {
            setTimeout(() => {
                const call = myPeer.call(peerId, stream); // 1. call, send stream to new person
                call.on('stream', (peerStream) => { // 4. receive stream from new person
                    dispatch(addPeerAction(peerId, peerStream));
                })
                setMyCall(call);
            }, 500);
        })
    }, [myPeer, stream]);

    return (
        <RoomContext.Provider value={{ ws, myPeer, stream, peers, myCall }}>{children}</RoomContext.Provider>
    )
}
