import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Courses from './Courses.json';
 
export default class ContactListScreen extends React.Component {
  static navigationOptions = {
    title: 'Cursos',
  };
 
  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount(){
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        isLoading: false,
        courses: Courses,
      });
      return
    })
  }
 
  componentWillUnmount() {
    this.focusListener.remove();
  } 
 
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
 
    const {navigate} = this.props.navigation;
    return(
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.courses}
          renderItem={({item}) =>
          <TouchableOpacity onPress={ () => navigate('CourseDetails', {courses: item})}>
            <View style={styles.curso}>
              <Image style={styles.logo} source={{uri: item.fotos[0].url}} />
              <View style={{padding: 10}}>
                <Text style={styles.contact}>{item.name}</Text>
                <Text>
                  {item.campus}{'\n'}
                  {item.turno}
                </Text>
              </View>
            </View>
          </TouchableOpacity>}
        />
        <Button title="Voltar" onPress={() => navigate('Home')} />
        </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
   padding: 15
  },
  contact: {
    fontSize: 18
  },
  curso: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  logo: {
    height: 70,
    width: 50,
  },
})