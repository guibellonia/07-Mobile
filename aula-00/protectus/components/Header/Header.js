import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = ({ profileImage, onPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <Image source={profileImage} style={styles.profilePicture} />
      </TouchableOpacity>
    </View>
  );
};

Header.defaultProps = {
  profileImage: require('../../assets/dede.jpg'),
  onPress: () => {},
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
});
