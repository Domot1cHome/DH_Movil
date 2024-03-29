import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { Button, Icon, Input } from "react-native-elements";

class ClaseEncabezado extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", paddingRight: 57 }}>
        <View style={styles.cabeza}>
          <Text style={{ color: "white" }}>Añadir Ambiente</Text>
        </View>
      </View>
    );
  }
}
export default class CrearAmbientes extends React.Component {
  static navigationOptions = {
    headerTitle: <ClaseEncabezado />,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#e31a1a"
    }
  };

  mostrarAlerta = () => {
    this.setState({
      mostrarAlerta: true
    });
  };

  mostrarAlertaDatosIguales = () => {
    this.setState({
      mostrarAlertaDatosIguales: true
    });
  };

  ocultarAlerta = () => {
    this.setState({
      mostrarAlerta: false
    });
  };

  ocultarAlertaDatosIguales = () => {
    this.setState({
      mostrarAlertaDatosIguales: false
    });
  };

  constructor(props) {
    super(props);
    var datos = require("../Controlador/Datos");
    var direccionIp = datos.direccionIp;
    var ruta = datos.rutaServicio;

    this.state = {
      nombre: "",
      cantidadAprendices: "",
      consultaCrearAmbiente: ruta + "Ambiente_Crear.php"
    };
    this.Metodo = this.Metodo.bind(this);
  }

  mostrarAlerta = () => {
    this.setState({
      mostrarAlerta: true
    });
  };

  Metodo(datos) {
    if (this.state.nombre == "" || this.state.cantidadAprendices == "") {
      console.log("Faltan datos");
      this.mostrarAlerta();
    } else {
      fetch(
        this.state.consultaCrearAmbiente +
        "?n=" +
        this.state.nombre +
        "&c=" +
        this.state.cantidadAprendices
      )
        .then(response => response.json())
        .then(responseJson => {

          //
          let foo = responseJson[0];
          if (foo != false) {
            this.props.navigation.navigate("Ambientes", { respuestaBD: responseJson });
          } else {
            this.mostrarAlertaDatosIguales();
          }

        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    const { navigation } = this.props;
    datos = navigation.getParam("enviarDatos", "null");
    const { mostrarAlerta, mostrarAlertaDatosIguales } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={styles.cuerpo}>
            <Input
              rightIcon={<Icon name="school" size={24} color="#e31a1a" />}
              placeholder="Nombre del Ambiente"
              inputStyle={styles.separadorCampoTextoInterno}
              containerStyle={styles.campoTexto}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={dato => this.setState({ nombre: dato })}
            />

            <View style={{ padding: 10 }} />

            <Input
              rightIcon={<Icon name="person-pin" size={24} color="#e31a1a" />}
              placeholder="Cantidad de aprendices"
              keyboardType="numeric"
              inputStyle={styles.separadorCampoTextoInterno}
              containerStyle={styles.campoTexto}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={dato => this.setState({ cantidadAprendices: dato })}
            />
          </View>

          <View style={styles.pie}>
            <Button
              title="Añadir"
              type="solid"
              titleStyle={{ color: "#ffff" }}
              containerStyle={{ flex: 1, height: 75, padding: 18 }}
              buttonStyle={{
                borderColor: "#ffff",
                backgroundColor: "#e31a1a",
                borderRadius: 10
              }}
              onPress={this.Metodo}
            />
          </View>

          <AwesomeAlert
            show={mostrarAlerta}
            showProgress={false}
            title="Datos incompletos"
            message="Faltan datos por ingresar"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Continuar"
            confirmButtonColor="#e31a1a"
            onConfirmPressed={() => {
              this.ocultarAlerta();
            }}
          />

          <AwesomeAlert
            show={mostrarAlertaDatosIguales}
            showProgress={false}
            title="Este ambiente ya existe."
            message="Comprueba que ingresaste bien los datos."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Continuar"
            confirmButtonColor="#e31a1a"
            onConfirmPressed={() => {
              this.ocultarAlertaDatosIguales();
            }}
          />

        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent"
  },
  cabeza: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cuerpo: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  },
  campoTexto: {
    width: 310,
    height: 45,
    borderWidth: 1,
    borderColor: "#e31a1a",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  separadorCampoTextoInterno: {
    paddingLeft: 20,
    paddingRight: 20
  },
  pie: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
