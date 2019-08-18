import React from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import ActionButton from "react-native-circular-action-menu";
import { Button, Icon, Input } from "react-native-elements";

class ClaseEncabezado extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", paddingRight: 57 }}>
        <View style={styles.cabeza}>
          <Text style={{ color: "white" }}>Editar Ambiente</Text>
        </View>
      </View>
    );
  }
}
export default class EditarAmbientes extends React.Component {
  static navigationOptions = {
    headerTitle: <ClaseEncabezado />,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#e31a1a"
    }
  };

  constructor(props) {
    super(props);
    var datos = require("../Controlador/Datos");
    var direccionIp = datos.direccionIp;
    this.state = {
      nombre: "",
      cantidadAprendices: "",
      consultaEditarAmbiente: "http://"+direccionIp+"/ServiciosxDH/A/UxA.php"
    };
    this.EditarAmbiente = this.EditarAmbiente.bind(this);
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

  EditarAmbiente(item) {
    if (this.state.nombre == "" || this.state.cantidadAprendices == "") {
      this.mostrarAlerta();
    } else {
      consulta =
        this.state.consultaEditarAmbiente +
        "?i=" +
        item.idAmbiente +
        "&n=" +
        this.state.nombre +
        "&cA=" +
        this.state.cantidadAprendices;
      console.log(consulta);
      fetch(consulta)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ datos: responseJson });

          editar = true;
          this.props.navigation.navigate("Ambientes", {
            respuestaBD: responseJson,
            editar: editar
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    const { navigation } = this.props;
    item = navigation.getParam("item", "null");
    const { mostrarAlerta } = this.state;

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
                placeholder={item.nombre}
                inputStyle={styles.separadorCampoTextoInterno}
                containerStyle={styles.campoTexto}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={dato => this.setState({ nombre: dato })}
              />

              <View style={{ padding: 10 }} />

              <Input
                rightIcon={<Icon name="person-pin" size={24} color="#e31a1a" />}
                placeholder={item.capacidadAprendices}
                keyboardType="numeric"
                inputStyle={styles.separadorCampoTextoInterno}
                containerStyle={styles.campoTexto}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={dato =>
                  this.setState({ cantidadAprendices: dato })
                }
              />
          </View>

          <View style={styles.pie}>
            <Button
              title="Actualizar"
              type="solid"
              titleStyle={{ color: "#ffff" }}
              containerStyle={{ flex: 1, height: 75, padding: 18 }}
              buttonStyle={{
                borderColor: "#ffff",
                backgroundColor: "#e31a1a",
                borderRadius: 10
              }}
              onPress={() => this.EditarAmbiente(item)}
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
