// src/components/MarqueeText.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Easing } from 'react-native';

/**
 * Props:
 *  - text: string to scroll
 *  - speed: pixels per second (default 60)
 *  - direction: 'ltr' | 'rtl' (left-to-right or right-to-left) default 'ltr'
 *  - delay: ms before starting each cycle
 *  - style: container style
 *  - textStyle: style for text
 */
export default function MarqueeText({
  text,
  speed = 60,
  direction = 'ltr',
  delay = 800,
  style,
  textStyle,
}) {
  const animated = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const resetPosition = direction === 'ltr' ? -contentWidth : containerWidth;

  useEffect(() => {
    if (!containerWidth || !contentWidth) return;

    // If content fits inside container, no need to animate
    if (contentWidth <= containerWidth) {
      animated.setValue(0);
      return;
    }

    const distance = containerWidth + contentWidth;
    const duration = (distance / speed) * 1000;

    const fromValue = direction === 'ltr' ? -contentWidth : containerWidth;
    const toValue = direction === 'ltr' ? containerWidth : -contentWidth;

    // reset and loop
    animated.setValue(fromValue);
    const cycle = Animated.sequence([
      Animated.delay(delay),
      Animated.timing(animated, {
        toValue,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // snap back instantly
      Animated.timing(animated, {
        toValue: fromValue,
        duration: 0,
        useNativeDriver: true,
      }),
    ]);
    const loop = Animated.loop(cycle);
    loop.start();

    return () => loop.stop();
  }, [containerWidth, contentWidth, speed, direction, delay, animated]);

  return (
    <View
      style={[styles.wrapper, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="text"
      accessibilityLabel={text}
    >
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: animated }],
        }}
        onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
      >
        <Text numberOfLines={1} style={[textStyle, { includeFontPadding: false }]}>
          {text}
        </Text>
        {/* Spacer so the gap before repeat is consistent */}
        <Text numberOfLines={1} style={[textStyle, { marginLeft: 40, includeFontPadding: false }]}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
});
