import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TextComponent
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import RadioButtonRN from 'radio-buttons-react-native';

const { width, height } = Dimensions.get('screen');

const data = [
  {
    label: 'Llegada',
    accessibilityLabel: 'Your label'
   },
   {
    label: 'Salida',
    accessibilityLabel: 'Your label'
   }
];

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Escolta extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      Mod:'',
      Fecha:'',
      Hora:'',
      Dir:''
    }
  }

  Login = async () =>{
    try{
      //capatar los input
      const{Mod} = this.state.Mod;
      const{Fecha} = this.state;
      const{Hora} = this.state;
      const{Dir} = this.state;
      console.log(Fecha,' // ',Hora, ' // ',Dir, '//', Mod);
  
      //consulta login vecino
      const response= await fetch('http://52.188.69.248:4000/api/auth/loginVecino',{
        method:'POST',
        //headers para contenidos de lo mensje
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({modalidad:Mod,fecha:Fecha,hora:Hora,dir:Dir})
      });
  
       const user= await response.json();
      console.log('respues servidor',user)
      this.props.addUsuario(user.token);
      console.log('Nuevo token:',this.props.alarma);
      
    }catch (error){
      console.log(error);
    }
    //enviar todos los datos por pos ya que es un login 
  }

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.2} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Solicitud de Escolta
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                            <Text
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    textAlign: 'left'
                                  }}
                                  color="#333"
                                  size={15}
                            >
                                Modalidad
                            </Text>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <RadioButtonRN
                            data={data}
                            selectedBtn={Mod => this.setState({Mod})}
                          />
                          </Block>
                            <Text
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    textAlign: 'left'
                                  }}
                                  color="#333"
                                  size={15}
                            >
                                Fecha
                            </Text>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="DD/MM/AAAA"
                              style={styles.inputs}
                              onChangeText={Fecha => this.setState({Fecha})}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="calendar-602x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Text
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    textAlign: 'left'
                                  }}
                                  color="#333"
                                  size={15}
                            >
                                Hora
                            </Text>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="HH:MM"
                              style={styles.inputs}
                              onChangeText={Hora => this.setState({Hora})}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="time-alarm2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Text
                                style={{
                                    fontFamily: 'montserrat-regular',
                                    textAlign: 'left'
                                  }}
                                  color="#333"
                                  size={15}
                            >
                                Dirección
                            </Text>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Dirección"
                              style={styles.inputs}
                              onChangeText={Dir => this.setState({Dir})}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="world2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              onPress={this.Login}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Solicitar Escolta
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Escolta;