import {useNotifyStore} from "../WebSocketHandling/NotifyState.ts";
import {sendMessage} from "../WebSocketHandling/Dispatcher.ts";
import {TYPE_ENUM} from "../model/TYPE_ENUM.ts";
import {IMessage} from "../model/IMessage.ts";
import {useNavigate} from "react-router-dom";


const SecretView = () => {

    const {authToken} = useNotifyStore.getState();

    const navigate = useNavigate();

    const testAuthentication = () => {
        const tempMessage:IMessage = {
            type: TYPE_ENUM.TEST,
            content: authToken!,
            token: authToken!,
        }
        sendMessage(tempMessage);
    }

    return (
        <div>
            <button onClick={testAuthentication}>Test Authentication</button>
            <button onClick={() => navigate("/overview")}> Return to Overview</button>

        </div>
    );
};

export default SecretView;