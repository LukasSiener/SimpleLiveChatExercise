import {useNotifyStore} from "../WebSocketHandling/NotifyState.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {IMessage} from "../model/IMessage.ts";
import {TYPE_ENUM} from "../model/TYPE_ENUM.ts";
import {sendMessage} from "../WebSocketHandling/Dispatcher.ts";


const ChatView = () => {

    const {currentClient, clientName} = useNotifyStore.getState();
    const messages = useNotifyStore((state) => state.messages);
    const relevantMessages = messages?.filter((m) => m.from == currentClient || m.to == currentClient);



    const navigate = useNavigate();

    const [message, setMessage] = useState<string>("");

    const handleSendMessage = () => {
        const tempMessage:IMessage = {
            type:TYPE_ENUM.MESSAGE,
            from: clientName!,
            to:currentClient!,
            content: message,
        }

        sendMessage(tempMessage);

        setMessage("")
    }

    return (
        <div>
            <p>Messages from: {currentClient}</p>
            {relevantMessages!.map((m) => <p>{m.from == clientName ? `You` : m.from}: {m.content}</p>)}

            <input onChange={e => setMessage(e.target.value)}/>
            <button onClick={handleSendMessage}>Send!</button>
            <button onClick={() => navigate("/overview")}> Return to Overview </button>
        </div>
    );

};

export default ChatView;