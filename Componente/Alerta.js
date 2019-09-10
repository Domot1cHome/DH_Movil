import React, { Component } from 'React'
import {
    Text,
    View
} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
export default class Alerta extends Component {
    render() {
        return (

            <AwesomeAlert
                show={this.props.mostrar}
                showProgress={false}
                title={this.props.titulo}
                message={this.props.mensaje}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                showCancelButton={this.props.activarCancelar}
                confirmText={this.props.textoConfirmar}
                cancelText="No"
                confirmButtonColor="#e31a1a"
                onConfirmPressed={this.props.confirmar}
                onCancelPressed={this.props.cancelar}
            />


        )
    }
}