import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input,Card,Button,Badge,Header} from 'react-native-elements';
//redux
import { connect } from 'react-redux';

function Inicio(){
  const [Estado, setEstado] = useState('Inactivo');
  const [Alarma, setAlarma] = useState('');
  const [AlarmaActiva, setAlarmaActiva] = useState('true');

  //consulta el estado de la alarma cada 2 segundos
  useEffect(() => {
      setInterval(() => {
      EstadoAlarma();
      }, 2000);
  }, []);
  
  //Actualizar estado de alarma 
  const EstadoAlarma = async () =>{
    try{
      //terminada - activa - confrimada
      if(AlarmaActiva=='true'){
        console.log('Estado alarma:',Alarma)
        //capatar los input
        const token = await AsyncStorage.getItem('token');
        const response= await fetch(`http://52.188.69.248:4000/api/alarma/getConfirmacionApp`,{
          method:'post',
          //headers para contenidos de lo mensaje
          headers:{
            'x-token':token,
            'Accept': 'application/json, text/plain, *',
            'Content-type':'application/json'
          },
          body:JSON.stringify({id_alarm:Alarma})
        });
        const recibido= await response.json();
        if(recibido.data?.estado){
          setEstado(recibido.data?.estado);
        }
        if(recibido.data?.estado == 'terminada'){
          setEstado(recibido.data.estado);
        }
      }
      
    }catch (error){
      console.log(error);
    }
  }
  //crear alarma
  const postAlarma = async () =>{
    try{
      //capatar los input
      const usuario = await AsyncStorage.getItem('token');

      //crear alarma
      const response= await fetch('http://52.188.69.248:4000/api/alarma/crearAlarma',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          'x-token':usuario,
          'Accept': 'application/json, text/plain, *',
          'Content-type':'application/json'
        }
      });
      const data= await response.json();
      console.log('data',data);
      console.log('Data recibida post alamar:',data.id_alarm.id_alarm);
      if(data.id_alarm?.id_alarm){
        setAlarma(data.id_alarm.id_alarm);
        console.log('post Alarma: ',Alarma)
        EstadoAlarma();
        setAlarmaActiva('true');
      }
      if(data.msg){
        if(data.msg == 'Alarma creada'){
          Alert.alert('Hemos recibido tu alarma.');
        }else{
          Alert.alert(data.msg);
        }
      }
    }catch (error){
      console.log(error);
    }
  }


  const CrearAlarma = async () =>{
    console.log('=============================');
    console.log('Creando alarma...');
    console.log('=============================');

    Alert.alert(
      "Confirmación de alarma activada",
      "Confirma la alerta para enviar una patrulla en tu ayuda.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => {
            console.log("OK Pressed");
            postAlarma();
          }
        }
      ],
      { cancelable: false }
    );
  }
  const Salir = async  () => {
    try {
        await AsyncStorage.removeItem('token');
        console.log('Token eliminado!');
        navigation.goBack()
        return true;
    }
    catch(exception) {
        return false;
    }
}
    const BadgeColor = () => {
      if(Estado=='activa'){
        return (<Badge value=" "status="primary" />);
      }
      if(Estado=='confirmada'){
        return (<Badge value=" " status="success" />);
      }
      if(Estado=='terminada'){
        return (<Badge value=" " status="warning" />);
      }
      if(Estado=='Inactivo'){
        return (<Badge value=" " status="error" />);
      }

    }
    const TextoAmigable = () => {
      if(Estado == 'activa'){
        return (<Text>Alarma enviada, esperando respuesta ...</Text>);
      }
      if(Estado == 'confirmada'){
        return (<Text>Hemos recibido tu Alarma</Text>);
      }
      if(Estado == 'terminada'){
        return (<Text>Ya atendimos tu Alarma</Text>);
      }
      if(Estado == 'Inactivo'){
        return (<Text>No tienes Alarmas Activas</Text>);
      }
    }
    //despliegues
    const buttonClickedHandler = () => {
        console.log('===============================================================')
        console.log('Boton:ALerta Activada!!! desde');
        //traigo el token de redux y se lo entrego a el boton
        CrearAlarma();

    }
    return(
      <View style={styles.screen}>
        <Button 
              title="Salir"
              onPress={Salir}
          />
        <Card>
        <TouchableOpacity
          onPress={buttonClickedHandler}
          //onPress={crearAlarma()}
          style={styles.roundButton}>
          <Text style={styles.texto}>Alarma</Text>
        </TouchableOpacity>
        </Card>
        <Text style={styles.textoMensaje}></Text>
        { 
        //AlarmaActiva == 'true' ? (<Text  style={styles.textoMensaje}> {BadgeColor()} {TextoAmigable()} </Text>) : ( <Text style={styles.textoMensaje} > {BadgeColor(Estado)} {TextoAmigable(Estado)}</Text>)
        }
      </View>
    );
}
/// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto:{
    color:'white',
    fontSize:40,
    fontStyle:"italic"
  },
  textoMensaje:{
    paddingTop:40,
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontStyle:"italic"
  },
  roundButton: {
    color:'red',
    marginTop: 20,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 300,
    backgroundColor:'red',
  },
  comentario:{
    backgroundColor:'#34c240'
  }
});

//redux
const mapStateToProps = (state) => {
  const { alarma} = state
  return { alarma }
};

export default connect(mapStateToProps)(Inicio);
