import { Routes, Route } from "react-router-dom";
import SignUp from '../Components/SignUp'
import Login from "../Components/Login";
import History from "../Components/History";
import Dictionary from "../Components/Dictionary";
import Profile from "../Components/Profile";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};
export default AllRoutes;