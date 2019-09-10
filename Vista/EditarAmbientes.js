import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Alerta from '../Componente/Alerta'
import { Button, Icon, Input } from "react-native-elements";

class ClaseEncabezado extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", paddingRight: 57 }}>
        <View style={estilos.cabeza}>
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
    var ruta = datos.rutaServicio;

    this.state = {
      nombre: "",
      cantidadAprendices: "",
      consultaEditarAmbiente: ruta + "Ambiente_Editar.php"
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

    }
    else {
      consulta = this.state.consultaEditarAmbiente + "?i=" + item.amb_id + "&n=" + this.state.nombre + "&c=" + this.state.cantidadAprendices;
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

    return (
      <View style={estilos.container}>
        <KeyboardAvoidingView
          style={estilos.container}
          behavior="padding"
          enabled
        >
          <View style={estilos.cuerpo}>

            <Input
              rightIcon={<Icon name="school" size={24} color="#e31a1a" />}
              placeholder={item.amb_nombre}
              inputStyle={estilos.separadorInput}
              containerStyle={estilos.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={dato => this.setState({ nombre: dato })}
            />

            <View style={{ padding: 10 }} />

            <Input
              rightIcon={<Icon name="person-pin" size={24} color="#e31a1a" />}
              placeholder={item.amb_capacidad}
              keyboardType="numeric"
              inputStyle={estilos.separadorInput}
              containerStyle={estilos.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={dato =>
                this.setState({ cantidadAprendices: dato })
              }
            />
          </View>

          <View style={estilos.pie}>
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

          <Alerta
            confirmar={() => this.ocultarAlerta()}
            mensaje="Faltan datos por ingresar"
            mostrar={this.state.mostrarAlerta}
            titulo="Datos incompletos"
            textoConfirmar="Continuar"
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
  input: {
    width: 310,
    height: 45,
    borderWidth: 1,
    borderColor: "#e31a1a",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  separadorInput: {
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
