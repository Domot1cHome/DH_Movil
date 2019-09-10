import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./Vista/Login";
import Ambientes from "./Vista/Ambientes";
import Componentes from "./Vista/Componentes";
import CrearAmbientes from "./Vista/CrearAmbientes";
import EditarAmbientes from "./Vista/EditarAmbientes";
import InterfazPrincipalS from "./Vista/InterfazPrincipalS";


const Rutas = createStackNavigator({

  Login: { screen: Login },
  InterfazPrincipalS: { screen: InterfazPrincipalS }, 
  Ambientes: { screen: Ambientes },
  EditarAmbientes: { screen: EditarAmbientes },
  Componentes: { screen: Componentes },
  CrearAmbientes: { screen: CrearAmbientes },

});

const App = createAppContainer(Rutas);
export default App;
