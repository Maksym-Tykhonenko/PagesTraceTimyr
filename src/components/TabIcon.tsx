import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

interface TabIconProps {
  routeName: string;
  focused: boolean;
}

const TabIcon = ({ routeName, focused }: TabIconProps) => {
  const getIconContent = () => {
    const iconColor = focused ? colors.gold.primary : colors.text.muted;
    const bgColor = focused ? colors.gold.light : colors.cosmic.surface;
    
    switch (routeName) {
      case 'Home':
        return (
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <View style={styles.homeIcon}>
              <View style={[styles.roof, { borderBottomColor: iconColor }]} />
              <View style={[styles.walls, { backgroundColor: iconColor }]} />
            </View>
          </View>
        );
      case 'Library':
        return (
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <View style={styles.libraryIcon}>
              <View style={[styles.book, { backgroundColor: iconColor }]} />
              <View style={[styles.book2, { backgroundColor: iconColor }]} />
              <View style={[styles.book3, { backgroundColor: iconColor }]} />
            </View>
          </View>
        );
      case 'Reviews':
        return (
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <View style={styles.starIcon}>
              <View style={[styles.star, { backgroundColor: iconColor }]} />
            </View>
          </View>
        );
      case 'Characters':
        return (
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <View style={styles.charactersIcon}>
              <View style={[styles.head, { backgroundColor: iconColor }]} />
              <View style={[styles.head2, { backgroundColor: iconColor }]} />
            </View>
          </View>
        );
      case 'Settings':
        return (
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <View style={styles.settingsIcon}>
              <View style={[styles.gear, { borderColor: iconColor }]} />
              <View style={[styles.gear2, { backgroundColor: iconColor }]} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {getIconContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  // Home icon
  homeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roof: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: 2,
  },
  walls: {
    width: 10,
    height: 7,
    borderRadius: 2,
  },
  // Library icon
  libraryIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  book: {
    width: 5,
    height: 10,
    borderRadius: 1,
    marginRight: 1,
  },
  book2: {
    width: 5,
    height: 12,
    borderRadius: 1,
    marginRight: 1,
  },
  book3: {
    width: 5,
    height: 8,
    borderRadius: 1,
  },
  // Star icon
  starIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    width: 12,
    height: 12,
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
  },
  // Characters icon
  charactersIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 2,
  },
  head2: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginLeft: 2,
  },
  // Settings icon
  settingsIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gear: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  gear2: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
});

export default TabIcon;
