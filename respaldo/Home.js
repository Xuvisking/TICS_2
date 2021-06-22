import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
 
class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>token: { this.props.alarma.usuario} .</Text>
        <Text>token: { this.props.alarma.estadoAlarma} .</Text>
        <Button
          title="BotonAlarma"
          onPress={() =>
            this.props.navigation.navigate('BotonAlerta')
          }
        />
      </View>
    );
  }
}
 
 
const mapStateToProps = (state) => {
  const { alarma} = state
  return { alarma }
};
 
export default connect(mapStateToProps)(Home);