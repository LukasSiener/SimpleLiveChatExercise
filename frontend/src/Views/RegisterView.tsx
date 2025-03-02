import {useEffect, useState} from "react";
import {connect, registerPlayer} from "../WebSocketHandling/Dispatcher.ts";
import {useNavigate} from "react-router-dom";


const RegisterView = () => {

    const [name, setName] = useState<string>();

    const navigate = useNavigate();

    const handleRegister = () => {
        registerPlayer(name!);
        navigate("/overview");
    }

    useEffect(() => {
        connect();
    }, []);

    return (
        <div>
            <p>Register now for cool Chat App</p>
            <input type={"text"} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleRegister}>Register!</button>
        </div>
    );
};

export default RegisterView;