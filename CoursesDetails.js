import * as React from 'react';
import { Text, View, StyleSheet, Button, Linking, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Platform } from 'react-native';
 
export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Dados do Contato',
  };
 
  constructor(props) {
    super(props);
    let course = props.navigation.getParam('courses');
    this.state = {
      id: course.codigo,
      name: course.name,
      email: course.email_coordenador,
      telefone: course.telefone_contato,
      lat: course.mapa.lat,
      lng: course.mapa.lgn,
      campus: course.campus,
      turno: course.turno,
      video: course.video,
      carga_horaria: course.carga_horaria,
      coordenador: course.nome_coordenador,
      site: course.website,
      fotos: course.fotos,
      coursesFav: ''
    };
    AsyncStorage.getItem('guiaCursosUfsc_fav').then(
      value =>
        this.setState({ coursesFav: value })
    );
    saveCourseFunction = () => {
      data = this.state.id + "," + this.state.coursesFav;
      alert(data)
      AsyncStorage.setItem('guiaCursosUfsc_fav', data);
      alert("curso salvo");
    };
  }
  
  
//import Carousel from 'react-native-snap-carousel';
//import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './components/carouselCardItem';
        /*<View>
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={fotos}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
          />
        </View>*/

  

  render() {
    const { navigate } = this.props.navigation;
    const { name, email, telefone, lat, lng, campus, turno, video, carga_horaria, coordenador, site, fotos} = this.state;
    const mapUrl = Platform.select({
      ios: `maps:0,0?q=${lat},${lng}` ,
      android: `geo:0,0?q=${lat},${lng}`
    });
    const imagens = [];;
    fotos.forEach(item => imagens.push(<Image style={{ height: 100, marginBottom: 10}} source={{ uri: item.url }} />));
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.contactName}>{name}     <TouchableOpacity onPress={saveCourseFunction}><Image style={{height: 16, width: 16}} source={{uri: "https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-star-icon-png-image_1577370.jpg"}} /></TouchableOpacity></Text>
          <Text style={{marginBottom: 10}}>O curso {name} é lecionado no periodo {turno} do campus {campus}, sua carga horaria é {carga_horaria}</Text>
          <Text style={styles.contactDetails}>coordenador:<Text> {coordenador}</Text></Text>
          <Text style={styles.contactDetails}>E-mail: <TouchableOpacity style={{color: 'blue'}} onPress={() => Linking.openURL(`mailto:${email}`) }><Text>{email}</Text></TouchableOpacity></Text>
          <Text style={styles.contactDetails}>Site: <TouchableOpacity style={{color: 'blue'}} onPress={() => Linking.openURL(`${site}`) }>{site}</TouchableOpacity></Text>
          <Text style={styles.contactDetails}>Telefone: <TouchableOpacity style={{color: 'blue'}} onPress={() => Linking.openURL(`tel:${telefone}`) }><Text>{telefone}</Text></TouchableOpacity></Text>
          {imagens}
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`${mapUrl}`) }
            title="Encontrar Localização" />
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`${video}`) }
            title="Ver videos do curso" />
        </View>
        <View style={styles.button} >
          <Button title="Voltar" onPress={() => navigate('CoursesList')} />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  contactDetails: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15
  }
});