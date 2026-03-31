import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface EnergyAuraProps {
  color?: string;
  size?: number;
}

const EnergyAura: React.FC<EnergyAuraProps> = ({ color = "#FF8C00", size = 200 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.aura,
        {
          width: size,
          height: size,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={[`${color}40`, `${color}00`]}
        style={styles.gradient}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  aura: {
    position: "absolute",
    borderRadius: 1000,
  },
  gradient: {
    flex: 1,
    borderRadius: 1000,
  },
});

export default EnergyAura;
