import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

const ScannerOverlay : React.FC = () => {
  const { theme } = useTheme();
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scanLineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height - 100],
  });

  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Corner brackets */}
      <View style={[styles.cornerTopLeft, { borderColor: theme.colors.scouter }]} />
      <View style={[styles.cornerTopRight, { borderColor: theme.colors.scouter }]} />
      <View style={[styles.cornerBottomLeft, { borderColor: theme.colors.scouter }]} />
      <View style={[styles.cornerBottomRight, { borderColor: theme.colors.scouter }]} />
      
      {/* Scanning line */}
      <Animated.View
        style={[
          styles.scanLine,
          {
            backgroundColor: theme.colors.scanLine,
            transform: [{ translateY }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    top: 0,
  },
});

export default ScannerOverlay;