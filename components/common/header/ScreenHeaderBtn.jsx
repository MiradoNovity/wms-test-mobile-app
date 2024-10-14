import React from 'react'
import { Image, TouchableOpacity } from "react-native";

import styles from './screenheader.style'
import { ScrollView, View } from 'react-native-web';
import Welcome from '../../home/welcome/Welcome';

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn