import "./App.css";
import MainLayaout from "./layout/MainLayaout";
import { MapProvider, PlacesProvider } from "./context";
import AppRouter from "./router/AppRouter";
import { UserContextProvider } from "./context/user/UserProvider";


const App = () => {
  return (
      <UserContextProvider>
        <MainLayaout>
          <PlacesProvider>
            <MapProvider>
              <AppRouter />
            </MapProvider>
          </PlacesProvider>
        </MainLayaout>
      </UserContextProvider>
  );
};

export default App;
