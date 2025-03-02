import {create} from 'zustand';
import {IMessage} from "../model/IMessage.ts";

interface NotifyState {
    clientName:string |null;
    messages: IMessage[] | null;
    onlineClients: string[];
    updateState: (data:Partial<NotifyState>) => void;
    currentClient: string | null;
    authToken: string | null,
}

export const useNotifyStore = create<NotifyState>((set) => ({
    clientName: null,
    messages: [],
    onlineClients: [],
    currentClient: null,
    authToken: null,
    updateState: (data: Partial<NotifyState>) => set((state)  => ({ ...state, ...data })),
}));

