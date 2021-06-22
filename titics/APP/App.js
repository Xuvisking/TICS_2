import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Block, GalioProvider } from 'galio-framework';
import AppLoading from 'expo-app-loading';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import alarmaReducer from './AlarmaReducer';

//componentes
import Login from './screens/Login';
import Intro from './screens/Intro';
import PassChange from './screens/PassChange';
import BotonAlerta from './screens/BotonAlerta';
import Contactos from './screens/Contactos';
import Home from './screens/Home';
import Escolta from './screens/Escolta';

import * as Font from 'expo-font';
import { Images, articles, nowTheme } from './constants';

//constantes
const Stack = createStackNavigator();
const store = createStore(alarmaReducer);
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        //provider entrega acceso a store a todos los componentes
        <Provider store={store}>
          <NavigationContainer>
            <GalioProvider theme={nowTheme}>
              <Block flex>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Intro"
                    component={Intro}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                  />
                  <Stack.Screen
                    name="BotonAlerta"
                    component={BotonAlerta}
                  />
                  <Stack.Screen
                    name="PassChange"
                    component={PassChange}
                  />
                  <Stack.Screen
                    name="Contactos"
                    component={Contactos}
                  />
                  <Stack.Screen
                    name="Escolta"
                    component={Escolta}
                  />
                </Stack.Navigator>
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </Provider>
      );
    }
  }

_loadResourcesAsync = async () => {
  await Font.loadAsync({
    'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
  });

  this.setState({ fontLoaded: true });
  return Promise.all([...cacheImages(assetImages)]);
};

_handleLoadingError = error => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error);
};

_handleFinishLoading = () => {
  if (this.state.fontLoaded) {
    this.setState({ isLoadingComplete: true });
  }
};
}