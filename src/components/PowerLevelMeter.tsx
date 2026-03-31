import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { formatPowerLevel } from "../utils/helpers";

interface PowerLevelMeterProps {
  powerLevel: string;
  maxPower?: number;
  label?: string;
}

const PowerLevelMeter: React.FC<PowerLevelMeterProps> = ({
  powerLevel,
  maxPower = 100000000,
  label = "POWER LEVEL",
}) => {
  const { theme } = useTheme();
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // const numPower =
    //   typeof powerLevel === "string" ? parseInt(powerLevel) : powerLevel;

    let numPower =
      typeof powerLevel === "string"
        ? parseInt(powerLevel.replace(/\./g, ""))
        : powerLevel;
    if (isNaN(numPower)) numPower = 0;

    let percentage = Math.min((numPower / maxPower) * 100, 100);
    if (isNaN(percentage)) percentage = 0;

    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [powerLevel]);

  const width = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
        <Text style={[styles.value, { color: theme.colors.primary }]}>
          {formatPowerLevel(powerLevel)}
        </Text>
      </View>
      <View
        style={[
          styles.meterContainer,
          { backgroundColor: theme.colors.border },
        ]}
      >
        <Animated.View
          style={[
            styles.meterFill,
            {
              width,
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "800",
  },
  meterContainer: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 6,
  },
});

export default PowerLevelMeter;
