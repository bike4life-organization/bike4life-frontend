import "./App.css";
import MainLayaout from "./layout/MainLayaout";
import { MapProvider, PlacesProvider } from "./context";
import AppRouter from "./router/AppRouter";
import { UserContextProvider } from "./context/user/UserProvider";
import { RoutesProvider } from "./context/route/routes-provider";

const App = () => {
  return (
    <UserContextProvider>
      <MainLayaout>
        <RoutesProvider>
          <PlacesProvider>
            <MapProvider>
              <AppRouter />
            </MapProvider>
          </PlacesProvider>
        </RoutesProvider>
      </MainLayaout>
    </UserContextProvider>
  );
};

export default App;
