import { RoutesProvider } from "./contexts/routes-provider";
import MainLayaout from "./layout/MainLayaout";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <MainLayaout>
      <RoutesProvider>
        <AppRouter />
      </RoutesProvider>
    </MainLayaout>
  );
};

export default App;
