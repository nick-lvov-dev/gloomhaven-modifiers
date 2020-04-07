import React, { useState, useEffect, useRef } from 'react';
import { Hero } from 'src/core/Hero/Hero';
import TouchableView from 'src/components/TouchableView/TouchableView';
import { Animated, Easing, Image, View } from 'react-native';
import styles from './styles';
import modifierStyles from '../ModifierView/styles';
import { empty, cardShadow } from 'assets/images';
import ModifierView, { getModifierStyle } from '../ModifierView/ModifierView';
import { Modifier } from 'src/core/Modifiers/models/Modifier';

interface Props {
  hero: Hero;
  onDraw?: (hero: Hero) => void;
  onDrag?: () => void;
}

interface AnimatedValueSub<T> {
  sub: string;
  value: T;
}

const animationDuration = 200;
const drawNextDelay = 50;
const drawnCardTopOffset = 40;
const effectiveSwipeLength = 40;
const effectiveDragLength = 20;
const drawHistoryCardMargin = 12;
const effectiveSpeed = 0.5;
const modifierStyle = getModifierStyle();
const movingModifierHeight = modifierStyle.height + drawHistoryCardMargin;
const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);

const getModifierCardOffset = (drawn: Modifier[], index: number) => -movingModifierHeight * (drawn.length - index - 1);

// thin out shadow depending on cards left
const getShadowInterpolation = (drawn: Modifier[]) =>
  drawn.reduce<{ inputRange: number[]; outputRange: number[] }>(
    (acc, x, index) => {
      const activeOffset = getModifierCardOffset(drawn, index);
      acc.inputRange = acc.inputRange.concat([activeOffset - 1, activeOffset]);
      // shadow top offset: 2,3,4 for 1,2,3+ cards left in deck
      acc.outputRange = acc.outputRange.concat([Math.min(Math.max(2, 2 + index - 1), 4), Math.min(2 + index, 4)]);
      return acc;
    },
    { inputRange: [], outputRange: [] }
  );

const getMaxCardTopValue = (drawn: Modifier[]) => (drawn.length - 1) * movingModifierHeight;

export default ({ hero, onDraw, onDrag }: Props) => {
  const [animatedCardTop] = useState(new Animated.Value(0));
  const animatedCardTopValue = useRef<AnimatedValueSub<number>>({ sub: '', value: 0 });
  const dragDistance = useRef(0);
  const currentDragOffset = useRef(0);
  const [animatedCardOpacity] = useState(new Animated.Value(1));
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialOffset, setInitialOffset] = useState(0);
  const [isDrawRequired, setIsDrawRequired] = useState(false);

  const drawn = hero.drawn;
  const lastDrawn = hero.lastDrawn();
  const lastDrawn2 = hero.lastDrawn(2);

  const getCurrentCardTopOffset = (pageY: number) => initialOffset - pageY;

  const draw = () => {
    if (isDrawing || isMoving) return;

    hero.draw();
    onDraw && onDraw(hero);
    animatedCardTop.setValue(drawnCardTopOffset);
    animatedCardOpacity.setValue(0);
    setIsDrawing(true);
    Animated.parallel([
      Animated.timing(animatedCardTop, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.in(bezier),
      }),
      Animated.timing(animatedCardOpacity, {
        toValue: 1,
        duration: animationDuration / 2,
      }),
    ]).start(() => {
      setIsDrawRequired(false);

      // if draw next required, delay setting isDrawing to false so user can look at the just drawn card
      if (hero.lastDrawn()?.next) setTimeout(() => setIsDrawing(false), drawNextDelay);
      else setIsDrawing(false);
    });
  };

  const resetOffsets = () => {
    setIsDragging(false);
    setIsMoving(false);
    setInitialOffset(0);
    animatedCardTop.removeListener(animatedCardTopValue.current.sub);
    animatedCardTopValue.current = { sub: '', value: 0 };
    animatedCardTop.setOffset(0);
  };

  // reset offsets when deck is reshuffled
  useEffect(() => {
    if (!drawn.length) resetOffsets();
  }, [drawn.length]);

  useEffect(() => {
    if (!isMoving && isDrawRequired) draw();
  }, [isDrawRequired, isMoving]);

  if (lastDrawn && lastDrawn.next && !isDrawing) draw();

  return (
    <TouchableView
      style={styles.draw}
      onGrant={({ nativeEvent: { pageY } }) => {
        animatedCardTop.stopAnimation();
        currentDragOffset.current = initialOffset ? initialOffset + dragDistance.current - pageY : 0;
        if (!isMoving) {
          setIsMoving(true);
          if (!initialOffset) setInitialOffset(pageY);
          animatedCardTop.setOffset(-pageY);
          animatedCardTopValue.current.sub = animatedCardTop.addListener(({ value }) => (animatedCardTopValue.current.value = value));
          dragDistance.current = 0;
        }
      }}
      onMove={({ nativeEvent: { pageY } }) => {
        if (!isDragging) {
          if (Math.round(initialOffset) - Math.round(pageY) >= effectiveDragLength) {
            setIsDragging(true);
            onDrag && onDrag();
          } else return;
        }

        const maxTopValue = initialOffset - getMaxCardTopValue(drawn);
        let val = pageY + currentDragOffset.current;

        animatedCardTop.setValue(val >= initialOffset ? initialOffset : val <= maxTopValue ? maxTopValue : val);
      }}
      onRelease={({ nativeEvent: { pageY, locationX, locationY } }, speed, elementSize) => {
        const currentCardTopOffset = getCurrentCardTopOffset(pageY);

        // drag hasn't started, treat as press
        if (!isDragging && currentCardTopOffset < effectiveDragLength) {
          resetOffsets();
          if (!isDragging) {
            // if withing card border, trigger draw
            if (locationY >= 0 && locationX >= 0 && locationY <= elementSize.height && locationX <= elementSize.width)
              setIsDrawRequired(true); // simply calling draw() won't work because isMoving takes time to get set to false
          }

          return;
        }

        // drag was too short, reset card position
        if (!currentDragOffset.current && currentCardTopOffset < effectiveSwipeLength) {
          Animated.timing(animatedCardTop, {
            toValue: initialOffset,
            duration: animationDuration,
            easing: Easing.in(bezier),
          }).start(() => {
            resetOffsets();
          });
          return;
        }

        // swipe
        if (Math.abs(speed) >= effectiveSpeed) {
          const maxTopValue = initialOffset - getMaxCardTopValue(drawn);
          const toValue = -speed * animationDuration + pageY + currentDragOffset.current;
          const goingHome = toValue >= initialOffset - modifierStyle.height;
          const overboard = toValue <= maxTopValue;
          if (overboard) {
            Animated.spring(animatedCardTop, {
              toValue: maxTopValue,
              speed: speed * 10,
              bounciness: 6,
            }).start(() => {
              dragDistance.current = animatedCardTopValue.current.value;
            });
          } else {
            Animated.timing(animatedCardTop, {
              toValue: goingHome ? initialOffset : toValue,
              duration: goingHome ? animationDuration : animationDuration * 2,
              easing: Easing.in(Easing.bezier(0.09, 1.02, 0.42, 0.96)),
            }).start(() => {
              if (goingHome) {
                resetOffsets();
              } else {
                dragDistance.current = animatedCardTopValue.current.value;
              }
            });
          }
          return;
        }
        // drag ended on a card, reset position
        if (isDragging && currentCardTopOffset - currentDragOffset.current < modifierStyle.height) {
          Animated.timing(animatedCardTop, {
            toValue: initialOffset,
            duration: animationDuration,
            easing: Easing.in(bezier),
          }).start(() => {
            resetOffsets();
          });
          return;
        }

        dragDistance.current = animatedCardTopValue.current.value;
      }}>
      <View style={modifierStyle}>
        {/* Placeholder */}
        <Image source={empty} style={modifierStyle} />

        {/* Static top card */}
        {lastDrawn2 && isDrawing ? (
          <ModifierView modifier={lastDrawn2} style={styles.staticModifier} />
        ) : lastDrawn && !isDrawing && !isDragging ? (
          <ModifierView modifier={lastDrawn} style={styles.staticModifier} />
        ) : null}

        {/* Static shadow */}
        {!(isMoving && isDragging) && (lastDrawn2 || (lastDrawn && !isDrawing)) ? (
          <Image
            source={cardShadow}
            // top: 2,3,4 for 1,2,3+ cards respectively
            style={[modifierStyle, modifierStyles.shadow, { top: Math.min(1 + drawn.length, 4), zIndex: -1 }]}
          />
        ) : null}
      </View>

      {/* Card being drawn */}
      {lastDrawn && isDrawing ? (
        <Animated.View style={[styles.drawnModifierWrapper, { top: animatedCardTop, opacity: animatedCardOpacity }]}>
          <ModifierView modifier={lastDrawn} />
        </Animated.View>
      ) : null}

      {/* History cards */}
      {drawn.length && isMoving && isDragging ? (
        <>
          {drawn.map((modifier, index) => {
            const activeOffset = getModifierCardOffset(drawn, index);
            return (
              <Animated.View
                key={`history_modifier_${index}`}
                style={[
                  styles.drawnModifierWrapper,
                  {
                    top: animatedCardTop.interpolate({
                      inputRange: [activeOffset - 1, activeOffset, 0],
                      outputRange: [-1, 0, 0],
                    }),
                    zIndex: 100 + drawn.length + index - drawn.length,
                    paddingBottom: drawHistoryCardMargin,
                  },
                ]}>
                <ModifierView modifier={modifier} />
              </Animated.View>
            );
          })}
          {drawn.length > 1 ? (
            <Animated.View
              style={[
                styles.historyShadow,
                {
                  top: animatedCardTop.interpolate(getShadowInterpolation(drawn)),
                  // hide shadow when one card is left
                  opacity: animatedCardTop.interpolate({
                    inputRange: [
                      getModifierCardOffset(drawn, 0) - 1,
                      getModifierCardOffset(drawn, 0),
                      getModifierCardOffset(drawn, 0) + 1,
                      getModifierCardOffset(drawn, 1),
                    ],
                    outputRange: [0, 0, 1, 1],
                  }),
                },
              ]}>
              <Image source={cardShadow} style={[modifierStyle]} />
            </Animated.View>
          ) : null}
        </>
      ) : null}
    </TouchableView>
  );
};
