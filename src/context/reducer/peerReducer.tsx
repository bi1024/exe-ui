import { ADD_PEER, REMOVE_PEER } from "./peerAction";

// peer state, object with key is peerId and value is id (peerId) and stream
export type PeerState = Record<string, { id: string, stream: MediaStream }>;
export type PeerAction = 
    | { type: typeof ADD_PEER, payload: { peerId: string, stream: MediaStream }}
    | { type: typeof REMOVE_PEER, payload: { peerId: string }}

export const peersReducer = (state: PeerState, action: PeerAction) => {
    switch(action.type) {
        case ADD_PEER: {
            return {
                ...state,
                [action.payload.peerId]: {
                    id: action.payload.peerId,
                    stream: action.payload.stream
                }
            }
        }
        case REMOVE_PEER: {
            const { [action.payload.peerId]: deleted, ...rest } = state;
            return rest;
        }
        default: return state;
    }
}