import {useNavigate} from "react-router-dom";
import {useNotifyStore} from "../WebSocketHandling/NotifyState.ts";
import {useEffect, useState} from "react";
import {IMessage} from "../model/IMessage.ts";
import {TYPE_ENUM} from "../model/TYPE_ENUM.ts";
import {sendMessage} from "../WebSocketHandling/Dispatcher.ts";

const AvailableUsersView = () => {

    const {updateState, clientName} = useNotifyStore.getState();
    const [filteredClients, setFilteredClients] = useState<string[]>([]);
    const [password, setPassword] = useState<string>("");
    const authToken = useNotifyStore((state) => state.authToken);


    const onlineClients = useNotifyStore((state) => state.onlineClients);

    const navigate = useNavigate();

    const handleClick = (name:string) => {
        updateState({
            currentClient: name,
        })
        navigate("/chat")
    }

    const getSecretToken = () =>{
        const tempMessage:IMessage = {
            type: TYPE_ENUM.AUTH,
            content: clientName + "," + password
        }

        sendMessage(tempMessage);
    }

    useEffect(() => {
        setFilteredClients(onlineClients.filter(s =>  s != clientName));
    }, [onlineClients]);

    return (
        <div>
            <p>Welcome {clientName}!</p>
            Start a Chat with one of these Users:
            {filteredClients.map((s) => <p onClick={() => handleClick(s) }>{s}</p>)}

            <div>


                {authToken ? <button onClick={() => {navigate("/secret")}}>Enter Secret World!</button> :
                    <div>
                        <input type={"text"} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={getSecretToken}>Authenticate Now!</button>
                        </div>
                    }
            </div>

        </div>
    );
};

export default AvailableUsersView;