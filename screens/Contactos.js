import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon,Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';

function Contactos({navigation}){ 
  //para obetener los contactos necesito el id el vecino.
  const [datos, setDatos] = useState({});
  const [load,setLoad]= useState('False');

  useEffect(() => {
    setInterval(() => {
      getContactos();
      }, 1000);
  }, []);

   getContactos= async () =>{
    try{
      //Tomar el valor de id desde asycstorage
      const token = await AsyncStorage.getItem('token');
      const Id = await AsyncStorage.getItem('usuario');
      
      //consultar Datos del vecino
      const response= await fetch(`http://52.188.69.248:4000/api/vecino/getUnVecino`,{
        method:'get',
        //headers para contenidos de lo mensje
        headers:{
          'x-token':token,
          'Accept': 'application/json, text/plain, *',
          'Content-type':'application/json'
        }
      });

      const infoContacto= await response.json();
      setDatos(infoContacto.data[0]);
      setLoad('true');
    }catch (error){
      console.log(error);
    }
  } 
     list = [
      {
        title: 'Direccion',
        subtitle: datos.direccion,
        icon: 'home'
      },
      {
        title: 'Contacto Emergencia 1',
        subtitle: datos.name_contact,
        icon: 'person-add'
      },
      {
        title: 'Telefono Emergencia 1',
        subtitle: datos.numb_contact,
        icon: 'call'
      },
      {
        title: 'Contacto Emergencia 2',
        subtitle: datos.name_contact2,
        icon: 'person-add'
      },
      {
        title: 'Telefono Emergencia 2',
        subtitle: datos.numb_contact2,
        icon: 'call'
      } 
    ];

    return(
      <View style={styles.screen}>
        <Card >
          <Card.Title >Informacion
          </Card.Title>
          {}
          <Card.Divider/>
          { load == 'true' ? (
             list.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                  <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              ))
          ) : (<Text></Text>)
          }
          <Button title="Actualizar" onPress={() => navigation.navigate('ActualizarContactos',datos)} />
        </Card>
      </View>
    );
  
}
/// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  texto:{
    color:'black',
    fontSize:20
  },
  titulo:{
    color:'black',
    fontSize:40
  },
  subtitlo:{
    color:'black',
    fontSize:30
  },subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  boton:{
    justifyContent: 'space-between',
  },
});
export default Contactos;
