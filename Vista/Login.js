import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Input
} from 'react-native-elements';
import Alerta from '../Componente/Alerta'
import { Loguearse } from '../Controlador/Controlador';

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { rol: "", usuario: "", contraseña: "" };
    this.Metodo = this.Metodo.bind(this);
  }

  IrS = () => {
    this.props.navigation.navigate("InterfazPrincipalS");
  };

  async Metodo() {
    let respueta = await Loguearse(this.state.usuario, this.state.contraseña);

    if (respueta != null) {

      if (respueta.usu_rol_id == 1) {
        this.IrS();
      } else if (respueta.usu_rol_id == 2) {
        console.log('Usuario');
      }

    } else {
      this.mostrarAlerta();
    }

  }

  mostrarAlerta = () => {
    this.setState({
      mostrarAlerta: true
    });
  };

  ocultarAlerta = () => {
    this.setState({
      mostrarAlerta: false
    });
  };

  render() {
    const { mostrarAlerta } = this.state;
    return (
      <View style={estilos.container}>
        <KeyboardAvoidingView
          style={estilos.container}
          behavior="padding"
          enabled
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../Recursos/DH.png")}
          />

          <Input
            rightIcon={<Icon name="face" size={24} color="#e31a1a" />}
            placeholder="Email"
            inputStyle={{ paddingLeft: 20 }}
            containerStyle={estilos.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={dato => this.setState({ usuario: dato })}
          />


          <Input
            rightIcon={<Icon name="lock" size={24} color="#e31a1a" />}
            placeholder="Contraseña"
            secureTextEntry={true}
            inputStyle={{ paddingLeft: 20 }}
            containerStyle={estilos.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={dato => this.setState({ contraseña: dato })}
          />

          <Button
            type="solid"
            title="Inciar sesión"
            titleStyle={{ color: "#ffffff" }}
            containerStyle={{ width: 200, height: 100 }}
            buttonStyle={estilos.button}
            onPress={() => this.Metodo()}
          />

          <Alerta
            confirmar={() => this.ocultarAlerta()}
            mensaje="Usuario o contraseña incorrecto."
            mostrar={this.state.mostrarAlerta}
            textoConfirmar="Continuar"
            titulo="Error al iniciar sesión"
          />

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const estilos = StyleSheet.create({

  button: {
    borderColor: '#ffffff',
    backgroundColor: '#e31a1a',
    borderWidth: 1,
    borderRadius: 20
  },

  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    flexDirection: "column"
  },

  input: {
    alignItems: "center",
    borderColor: "#e31a1a",
    borderRadius: 20,
    borderWidth: 1,
    height: 35,
    justifyContent: "center",
    marginBottom: 10,
    width: 200,
  }
});
