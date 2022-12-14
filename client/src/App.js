import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Booking from "./pages/Booking/Booking";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routing/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./store/services/userService";
import { clearSelected } from "./store/order/orderSlice";
import { clearFilter } from "./store/filter/filterSlice";
import ExtendOrder from "./pages/ExtendOrder/ExtendOrder";
import About from "./pages/About/About";
import WhereToRide from "./pages/WhereToRide/WhereToRide";
import Contacts from "./pages/Contacts/Contacts";
import { YMaps } from "@pbe/react-yandex-maps";
import Rent from "./pages/Rent/Rent";

function App() {
  const { userToken } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (status === "success" && location.pathname !== "/booking") {
      dispatch(clearSelected());
      dispatch(clearFilter());
    }
  }, [status, location]);

  return (
    <YMaps>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="booking" element={<Booking />} />
          <Route path="about" element={<About />} />
          <Route path="where" element={<WhereToRide />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="rent" element={<Rent />} />
          <Route element={<ProtectedRoute />}>
            <Route path="user-profile" element={<Profile />} />
            <Route path="extend-order/:id" element={<ExtendOrder />} />
          </Route>
        </Route>
      </Routes>
    </YMaps>
  );
}

export default App;
