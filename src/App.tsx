import "./App.css";
import MainLayaout from "./layout/MainLayaout";
import {MapProvider, PlacesProvider} from "./context";
import AppRouter from "./router/AppRouter";
import {UserContextProvider} from "./context/user/UserProvider";
import {RoutesProvider} from "./context/route/routes-provider";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <UserContextProvider>
            <MainLayaout>
                <RoutesProvider>
                    <PlacesProvider>
                        <MapProvider>
                            <AppRouter/>
                            <ToastContainer />
                        </MapProvider>
                    </PlacesProvider>
                </RoutesProvider>
            </MainLayaout>
        </UserContextProvider>
    );
};

export default App;
