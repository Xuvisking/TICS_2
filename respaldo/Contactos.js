import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Contactos extends Component{

  render(){
    
    return(
      <View style={styles.textoFortuna}>
        <Text style={styles.textoFortuna}>Tus contactos de emergencia: Jose, 912345678</Text>
      </View>
    );
  }
}
/// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto:{
    color:'black',
    fontSize:20
  }
});
export default Contactos;
