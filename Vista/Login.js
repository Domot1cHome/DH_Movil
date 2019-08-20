import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import AwesomeAlert from "react-native-awesome-alerts";
import { Loguearse } from "../Controlador/ControladorLogin";



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
            source={require("/ProyectosReactNative/DH/Recursos/DH.png")}
          />

          <Input
            rightIcon={<Icon name="face" size={24} color="#e31a1a" />}
            placeholder="Email"
            inputStyle={{ paddingLeft: 20 }}
            containerStyle={{
              width: 200,
              height: 35,
              borderWidth: 1,
              borderColor: "#e31a1a",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center"
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={dato => this.setState({ usuario: dato })}
          />


          <Input
            rightIcon={<Icon name="lock" size={24} color="#e31a1a" />}
            placeholder="Contraseña"
            secureTextEntry={true}
            inputStyle={{ paddingLeft: 20 }}
            containerStyle={{
              width: 200,
              height: 35,
              borderWidth: 1,
              borderColor: "#e31a1a",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center"
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={dato => this.setState({ contraseña: dato })}
          />

          <Button
            type="solid"
            title="Inciar sesión"
            titleStyle={{ color: "#ffffff" }}
            containerStyle={{ width: 200, height: 100 }}
            buttonStyle={{
              borderColor: '#ffffff',
              backgroundColor: '#e31a1a',
              borderWidth: 1,
              borderRadius: 20
            }}
            onPress={() => this.Metodo()}
          />

          <AwesomeAlert
            show={mostrarAlerta}
            showProgress={false}
            title="Datos erroneos"
            message="Parece que no escribiste correctamente tu correo electrónico o contraseña."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Continuar"
            confirmButtonColor="#e31a1a"
            onConfirmPressed={() => {
              this.ocultarAlerta();
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
