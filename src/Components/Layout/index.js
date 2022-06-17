import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        window.scrollTo({ top: 0 ,behavior:'smooth'})
    }, [location])
    return (
        <div>
            {location.pathname !== '/' && <button onClick={() => navigate(-1)} className="btn btn-outline normal-case fixed top-8 left-8 z-30">Back</button>}
            <Outlet />
        </div>
    );
}

export default Layout;