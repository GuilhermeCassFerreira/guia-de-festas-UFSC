import * as React from 'react';
import { View, Text, Image, Button, BackHandler, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Guia de Cursos UFSC',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.logo} source={{uri: "https://vestibularunificado2023.ufsc.br/wp-content/themes/brasilGovInterno/img/brasao_default.png"}} />
          <Text style={styles.title} >Universidade Federal de Santa Catarina{'\n'}{'\n'}Guia de Cursos</Text>
        </View>
        <View style={styles.button}>
          <Button title="Ver Cursos" onPress={() => navigate('CoursesList')} />
        </View>
        <View style={styles.button}>
          <Button title="Ver Cursos Favoritos" onPress={() => navigate('CoursesFav')} />
        </View>
        <View style={styles.button}>
          <Button title="Sair" onPress={() => BackHandler.exitApp() } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 250,
    width: 180,
  },
  title: {
    padding: 30,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    padding: 15
  }
});