import Layout from "Components/Layout";
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Detail from "Views/Detail";
import Home from "Views/Home";
import NotFound from "Views/NotFound";


const Routers = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id/:tab" element={<Detail />} />
            </Route>
            <Route path='/404' element={<NotFound />} />
            <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
    )
}

export default Routers;