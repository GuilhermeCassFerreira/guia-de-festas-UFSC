import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './home';
import CoursesListScreen from './CoursesList';
import CoursesFavScreen from './CoursesFav';
import CourseDetailsScreen from './CoursesDetails';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  CoursesList: {screen: CoursesListScreen},
  CourseDetails: {screen: CourseDetailsScreen},
  CoursesFav: {screen: CoursesFavScreen}
});
 
const App = createAppContainer(MainNavigator);
export default App;