
import './App.css'
import AvailableUsersView from "./Views/AvailableUsersView.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Views/Layout.tsx";
import ChatView from "./Views/ChatView.tsx";
import RegisterView from "./Views/RegisterView.tsx";
import SecretView from "./Views/SecretView.tsx";


function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route path={"/overview"} element={<AvailableUsersView/>}></Route>
                    <Route path={"/"} element={<RegisterView/>}></Route>
                    <Route path={"/chat"} element={<ChatView/>}></Route>
                    <Route path={"/secret"} element={<SecretView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
