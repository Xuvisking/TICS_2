import React from 'react';
import {  ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
const { height, width } = Dimensions.get('screen');

class Intro extends React.Component {
  render() {
    return (
        <Block flex style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Block flex>
            <ImageBackground
              source={Images.bkground}
              style={{ flex: 1, height: height, width, zIndex: 1 }}
            />
            <Block space="between" style={styles.padded}>
              <Block>
                <Block middle>
                  <Image source={Images.logo} style={{ width: 150, height: 124, bottom: 210, position: 'absolute' }} />
                </Block>
                <Block>
                  <Block middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular', bottom: 50, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                      }}
                      color="white"
                      size={44}
                    >
                      Bienvenido a la APP
                      SCChile
                    </Text>
                  </Block>
                </Block>
                <Block middle row>
                  <Text
                    color="white"
                    size={15}
                    style={{ fontFamily: 'montserrat-regular' }}
                  >
                    La aplicación esta hecha para una solución 
                    de rapida atención en caso de emergencia, robos,
                    o peligros.
                  </Text>
                </Block>
                
                <Block
                  row
                  style={{
                    marginTop: theme.SIZES.BASE * 2.5,
                    marginBottom: theme.SIZES.BASE * 2
                  }}
                >
                  <Button
                    shadowless
                    style={styles.button}
                    color={nowTheme.COLORS.PRIMARY}
                    onPress={() => this.props.navigation.navigate('Login')}
                  >
                    <Text
                      style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                      color={theme.COLORS.WHITE}
                    >
                      Ingresar
                    </Text>
                  </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.COLORS.BLACK,
      marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
    },
    padded: {
      paddingHorizontal: theme.SIZES.BASE * 2,
      zIndex: 3,
      position: 'absolute',
      bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
    },
    button: {
      width: width - theme.SIZES.BASE * 4,
      height: theme.SIZES.BASE * 3,
      shadowRadius: 0,
      shadowOpacity: 0
    },
  
    gradient: {
      zIndex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 66
    }
});

export default Intro;