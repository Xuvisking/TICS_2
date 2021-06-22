import 'react-native-gesture-handler';
import React,{ useEffect, useState}  from 'react';
import { StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Block, GalioProvider } from 'galio-framework';
import AppLoading from 'expo-app-loading';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import alarmaReducer from './AlarmaReducer';
import { connect } from 'react-redux';

//componentes
import Login from './screens/Login';
import Intro from './screens/Intro';
import PassChange from './screens/PassChange';
import Inicio from './screens/Inicio';
import Escolta from './screens/Escolta';
import Contactos from './screens/Contactos';
import ActualizarContact from './screens/ActualizarContactos';

import * as Font from 'expo-font';
import { Images, articles, nowTheme } from './constants';
import { Value } from 'react-native-reanimated';
import { addUsuario } from './AlarmaAction';

//constantes
const Drawer = createDrawerNavigator();
const store = createStore(alarmaReducer);
const RootStack = createStackNavigator();
const ContactoStack = createStackNavigator();
const LoginStack = createStackNavigator();

function cacheImages(images) {

  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
function LoginStackScreen({ navigation }) {
      return (
        <LoginStack.Navigator >
          <LoginStack.Screen name="Intro" component={Intro} options={{ headerShown: false }}/>
          <LoginStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <LoginStack.Screen name="PassChange" component={PassChange} options={{ headerShown: false }}/>
          <LoginStack.Screen name="Inicio" component={HomeDrawer} options={{ headerShown: false }}/>
        </LoginStack.Navigator >
      );
}
function Contact({ navigation }) {
  return (
    <ContactoStack.Navigator >
      <ContactoStack.Screen name="Contactos" component={Contactos} options={{ headerShown: false }}/>
      <ContactoStack.Screen name="ActualizarContactos" component={ActualizarContact} options={{ headerShown: false }}/>
    </ContactoStack.Navigator >
  );
}
function HomeDrawer({ navigation }) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={Inicio} />
      <Drawer.Screen name="Escolta" component={Escolta}/>
      <Drawer.Screen name="Contacto" component={Contact}/>
      {//crer un componente para cerrar sesion y de cambio de contrasena 
      }
    </Drawer.Navigator>
  );
}
export default function App({ navigation }){  

  const [isSignedIn, setIsSignedIn] = useState('Deslogeado');

  useEffect(()=>{
      isLogin()
  },[]);
    //funciones para rutas 
    const isLogin = async () =>{
      try{
        const token = await AsyncStorage.getItem('token');
        if (token){
          setIsSignedIn('Logeado');
          console.log('Tenemos token puedes entrar :',isSignedIn)
        }
      }catch (error){
        console.log(error);
      }
    }
      return (
        //provider entrega acceso a store a todos los componentes
        <Provider store={store}>
        <GalioProvider theme={nowTheme}>
          <NavigationContainer > 
            <RootStack.Navigator>
            {
              isSignedIn == 'Logeado' ? (
                <RootStack.Screen name="Home" component={HomeDrawer} options={{ headerShown: false }}/>
              ) : (
                <RootStack.Screen name="Login" component={LoginStackScreen} options={{ headerShown: false }}/>
              )
           }
            </RootStack.Navigator>
          </NavigationContainer>
        </GalioProvider>
        </Provider>
      );
  
}