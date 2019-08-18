import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView
} from "react-native";
import ActionButton from "react-native-circular-action-menu";
import { Icon } from "react-native-elements";

class ClaseEncabezado extends React.Component {
  render() {
    return (
      <View style={styles.cabeza}>
        <Text style={{ color: "white" }}>Interfaz Principal Supervisores</Text>
      </View>
    );
  }
}

export default class InterfazPrincipalS extends React.Component {
  static navigationOptions = {
    headerTitle: <ClaseEncabezado />,
    headerLeft: null,
    headerStyle: {
      backgroundColor: "#e31a1a"
    }
  };

  constructor(props) {
    super(props);
    this.IrVistaAmbientes = this.IrVistaAmbientes.bind(this);
    this.IrVistaComponentes = this.IrVistaComponentes.bind(this);
  }

  IrVistaAmbientes() {
    this.props.navigation.navigate("Ambientes");
  }

  IrVistaComponentes() {
    this.props.navigation.navigate("Componentes");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cuerpo} />
        <View style={styles.pie}>
          <ActionButton
            icon={<Icon name="fingerprint" size={60} color="#e31a1a" />}
            btnOutRange="#ffff"
            buttonColor="#ffff"
          >
            <ActionButton.Item
              buttonColor="#ffff"
              onPress={this.IrVistaAmbientes}
            >
              <Icon name="school" color="#e31a1a" size={38} />
            </ActionButton.Item>

            <ActionButton.Item
              buttonColor="#ffff"
              onPress={this.IrVistaComponentes}
            >
              <Icon name="devices-other" color="#e31a1a" size={38} />
            </ActionButton.Item>
          </ActionButton>
        </View>
        <View style={styles.pie2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  cabeza: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  cuerpo: {
    flex: 0.4,
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  pie: {
    flex: 0.2,
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  pie2: {
    flex: 0.4,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});
