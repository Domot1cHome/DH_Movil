import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Alerta from '../Componente/Alerta'
import { Button, Card, Icon } from "react-native-elements";


class ClaseEncabezado extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", paddingRight: 57 }}>
        <View style={estilos.cabeza}>
          <Text style={{ color: "white" }}>Ambientes</Text>
        </View>
      </View>
    );
  }
}
export default class Ambientes extends React.Component {
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

    this.state = { datos: "", estaCargado: true, eliminar: null, id: null, consultarAmbientes: ruta + 'Ambiente.php', consultaEliminar: ruta + '/Ambiente_Eliminar.php?id=' };

    this.LlenarTarjetas = this.LlenarTarjetas.bind(this);

    this.ActualizarTarjetas = this.ActualizarTarjetas.bind(this);

    this.ValidarInserccion = this.ValidarInserccion.bind(this);

    this.EliminarRegistro = this.EliminarRegistro.bind(this);
  }

  mostrarAlerta = () => {
    this.setState({
      mostrarAlerta: true
    });
  };

  mostrarAlerta2 = idAmbiente => {
    this.setState({
      mostrarAlerta2: true,
      id: idAmbiente
    });
  };


  ocultarAlerta = () => {
    this.setState({
      mostrarAlerta: false
    });
  };

  ocultarAlerta2 = () => {
    this.setState({
      mostrarAlerta2: false
    });
  };



  async EliminarRegistro(idAmbiente) {
    console.log("#ER EliminarRegistro");
    this.ocultarAlerta2();
    fetch(this.state.consultaEliminar + idAmbiente)
      .then(response => response.json())
      .then(() => {
        this.setState({ estaCargado: !this.state.estaCargado, eliminar: true });
        this.ActualizarTarjetas(this.state.estaCargado, this.state.eliminar);
      })
      .catch(error => {
        console.error(error);
      });
  }

  ActualizarTarjetas(estaCargado, eliminar) {
    console.log("#AT ActualizarTarjetas");

    if (estaCargado && eliminar) {
      fetch(this.state.consultarAmbientes)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            datos: responseJson,
            estaCargado: !this.state.estaCargado,
            mostrarAlerta: true
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else if (estaCargado && this.state.editar) {
      console.log("Entro!");
      fetch(this.state.consultarAmbientes)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            datos: responseJson,
            estaCargado: !this.state.estaCargado,
            mostrarAlerta3: true

          });
        })
        .catch(error => {
          console.error(error);
        });
    } else if (estaCargado) {
      fetch(this.state.consultarAmbientes)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            datos: responseJson,
            estaCargado: !this.state.estaCargado
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  LlenarTarjetas(item) {
    console.log("#LlT LlenarTarjetas");

    if (item.amb_nombre == "") {
      item.amb_nombre = "Nulo";
    }

    return (
      <View style={{ padding: 10 }}>
        <Card
          title={item.amb_nombre}
          containerStyle={{ borderRadius: 10, borderColor: "#e31a1a" }}
          dividerStyle={{ backgroundColor: "#e31a1a" }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <Text style={{ fontSize: 14 }}>
                Capacidad aprendices: {item.amb_capacidad}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Button
                icon={<Icon name="edit" size={20} color="white" />}
                type="solid"
                titleStyle={{ color: "#ffff" }}
                containerStyle={{ padding: 3 }}
                buttonStyle={{
                  borderColor: "#ffff",
                  backgroundColor: "#e31a1a",
                  borderRadius: 10
                }}
                onPress={() => {
                  this.props.navigation.navigate("EditarAmbientes", {
                    item: item
                  });
                }}
              />

              <Button
                icon={<Icon name="delete" size={20} color="white" />}
                type="solid"
                titleStyle={{ color: "#ffff" }}
                containerStyle={{ padding: 3 }}
                buttonStyle={{
                  borderColor: "#ffff",
                  backgroundColor: "#e31a1a",
                  borderRadius: 10
                }}
                onPress={() => {
                  this.mostrarAlerta2(item.amb_id);
                }}
              />
            </View>
          </View>
        </Card>
      </View>
    );

  }

  ValidarInserccion(respuestaBD, respuestaE) {
    console.log("#VI ValidarInserccion");

    if (respuestaBD == "true") {
      this.ActualizarTarjetas(this.state.estaCargado);
    }

    if (respuestaBD == "true" && respuestaE == true) {
      this.state = { editar: true };
      this.ActualizarTarjetas(this.state.estaCargado);
    } else if (respuestaBD == "false") {
      this.setState({ estaCargado: !this.state.estaCargado });
    }
  }

  render() {
    // console.log("#R Render");
    if (this.state.estaCargado != true) {
      return (
        <View style={estilos.container}>
          <View style={estilos.cuerpo}>
            <ScrollView>
              <View style={{ flex: 1, margin: 5 }}>
                <FlatList
                  extraData={this.state.estaCargado}
                  data={this.state.datos}
                  keyExtractor={item => item.amb_id}
                  renderItem={({ item }) => this.LlenarTarjetas(item)}
                />
              </View>
            </ScrollView>
          </View>

          <View style={{ padding: 1 }} />

          <View style={estilos.pie}>
            <Button
              title="Añadir Ambiente"
              type="solid"
              titleStyle={{ color: "#ffff" }}
              containerStyle={{ flex: 1, height: 75, padding: 18 }}
              buttonStyle={estilos.button}
              onPress={() => {
                this.props.navigation.navigate("CrearAmbientes"),
                  { enviarDatos: this.state.datos };
              }}
            />
          </View>

          <Alerta
            confirmar={() => this.ocultarAlerta()}
            mensaje="Se ha eliminado satisfactoriamente."
            mostrar={this.state.mostrarAlerta}
            titulo="Registro Eliminado"
            textoConfirmar="Continuar"
          />


          <Alerta
            activarCancelar={true}
            cancelar={() => this.ocultarAlerta2()}
            confirmar={() => this.EliminarRegistro(this.state.id)}
            mostrar={this.state.mostrarAlerta2}
            mensaje="Se eliminará este ambiente."
            titulo="¿Eliminar Registro?"
            textoConfirmar="Si"
          />



        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#e31a1a" />
        </View>
      );
    }
  }

  componentDidMount() {
    //console.log("#1 Se montó la vista");
    this.ActualizarTarjetas(this.state.estaCargado);
  }

  componentWillUpdate() {
    //console.log("#2 Se actualizará la vista")
    if (this.state.estaCargado != true) {
      this.state.estaCargado = true;
    }
  }

  componentDidUpdate() {
    //console.log("#3 Se actualizó la vista");
    const { navigation } = this.props;
    respuestaBD = navigation.getParam("respuestaBD", "0");
    respuestaE = navigation.getParam("hehe", "false");
    this.ValidarInserccion(respuestaBD, respuestaE);
  }

}

const estilos = StyleSheet.create({
  button: {
    borderColor: "#ffff",
    backgroundColor: "#e31a1a",
    borderRadius: 10
  },

  container: {
    flex: 1
  },
  cabeza: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cuerpo: {
    flex: 10,
    backgroundColor: "#ffff"
  },
  contenidoTarjeta: {
    alignItems: "center",
    justifyContent: "center"
  },
  pie: {
    flex: 1.3,
    backgroundColor: "transparent"
  }
});
