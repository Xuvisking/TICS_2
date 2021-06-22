import React, { useState, useEffect, Component } from 'react';
import { render } from 'react-dom';
import {View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

class Contactos extends Component{
  
  //para obetener los contactos necesito el id el vecino.
   Contactos= async () =>{
    try{
      //Tomar el valor de id desde asycstorage
      const usuario ='V01';
        

      //consultar Datos del vecino
      const response= await fetch(`http://52.188.69.248:4000/api/vecino/getInfoVecino/${usuario}`,{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        //vacio ya que se le pasa el id por la url
        body:[]
      });

      const infoContacto= await response.json();
      console.log('respues servidor',infoContacto);
      
    }catch (error){
      console.log(error);
    }
    //enviar todos los datos por pos ya que es un login 
  }

  render(){
    const users = [
      {
         name: 'brynn',
         item: ''
      }
     ]
    const list = [
      {
        title: 'V01',
        icon: 'home'
      },
      {
        title: 'Homer Simpson',
        icon: 'person-outline'
      },
      {
        title: '+56912345678',
        icon: 'call'
      },
      {
        title: 'Moe Szyslak',
        icon: 'person-add'
      },
      {
        title: '+56987654321',
        icon: 'call'
      },
      {
        title: 'Marge Simpson',
        icon: 'person-add'
      },
      {
        title: '+56987654321',
        icon: 'call'
      } 
    ]
    return(
      <View style={styles.screen}>
        <Card >
          <Card.Title >Informacion <Button s title="Actualizar" />
          </Card.Title>
          <Card.Divider/>
          {
            list.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              ))
          }
        </Card>
      </View>
      
    );
  }
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
