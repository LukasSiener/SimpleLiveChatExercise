import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <div>
            <main/>
           <Outlet/>
        </div>
    );
};

export default Layout;