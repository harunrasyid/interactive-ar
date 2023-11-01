import React, { useState } from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
} from '@viro-community/react-viro';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { layout, spacing } from '@styles';
import { HStack } from '@components/view-stack';
import { Spacer } from '@components/spacer';
import { color } from '@styles/color';

const SKULL_OBJ_KEY: string = 'skull';
const TV_OBJ_KEY: string = 'tv';

type ObjParamType = [number, number, number];

const InitialScene = (props: any) => {
  const [rotation, setRotation] = useState<ObjParamType>([-45, 10, 40]);
  const [position, setPosition] = useState<ObjParamType>([0, 0, -5]);
  const [scale, setScale] = useState<ObjParamType>([0.08, 0.08, 0.08]);

  const data = props.sceneNavigator.viroAppProps;
  ViroMaterials.createMaterials({
    tv: {
      diffuseTexture: require('./assets/wood.jpg'),
    },
  });

  const moveObject = (newPosition: ObjParamType) => {
    setPosition(newPosition);
  };

  const rotateObject = (rotateState: number, rotationFactor: number) => {
    if (rotateState === 2) {
      const newRotation: ObjParamType = [
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ];
      setRotation(newRotation);
    }
  };

  const resizeObject = (scaleState: number, scaleFactor: number) => {
    if (scaleState === 2) {
      const newScale: number = scale[0] * scaleFactor;
      setScale([newScale, newScale, newScale]);
    }
  };

  // Register target
  ViroARTrackingTargets.createTargets({
    money: {
      source: require('./assets/money.jpg'),
      orientation: 'Up',
      physicalWidth: 0.157,
    },
  });

  return (
    <ViroARScene>
      {/*<ViroAmbientLight color={color.neutral10} />*/}
      {/*{data.object === SKULL_OBJ_KEY ? (*/}
      {/*  <Viro3DObject*/}
      {/*    type={'OBJ'}*/}
      {/*    source={require('@assets/skull/12140_Skull_v3_L2.obj')}*/}
      {/*    position={position}*/}
      {/*    scale={scale}*/}
      {/*    rotation={rotation}*/}
      {/*    onDrag={moveObject}*/}
      {/*    onRotate={rotateObject}*/}
      {/*    onPinch={resizeObject}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <Viro3DObject*/}
      {/*    type={'OBJ'}*/}
      {/*    source={require('@assets/tv/12221_Cat_v1_l3.obj')}*/}
      {/*    position={position}*/}
      {/*    scale={scale}*/}
      {/*    rotation={rotation}*/}
      {/*    onDrag={moveObject}*/}
      {/*    onRotate={rotateObject}*/}
      {/*    onPinch={resizeObject}*/}
      {/*  />*/}
      {/*)}*/}
      <ViroARImageMarker
        target={'money'}
        onAnchorFound={() => console.log('Anchor found')}>
        {/*<ViroAmbientLight color={color.neutral10} />*/}
        {/*<Viro3DObject*/}
        {/*  type={'OBJ'}*/}
        {/*  source={require('@assets/skull/12140_Skull_v3_L2.obj')}*/}
        {/*  scale={[0.008, 0.008, 0.008]}*/}
        {/*  rotation={[0, 0, 0]}*/}
        {/*/>*/}
        <ViroText
          text={'Pinjam Dulu 100'}
          scale={[0.2, 0.2, 0.2]}
          // position={[0, 0.1, 0]}
          rotation={[-85, 0, 0]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

function App() {
  const [obj, setObj] = useState<string>(SKULL_OBJ_KEY);
  return (
    <View style={layout.flex}>
      <ViroARSceneNavigator
        initialScene={{
          // @ts-ignore
          scene: InitialScene,
        }}
        viroAppProps={{ object: obj }}
        style={layout.flex}
      />
      <HStack
        style={[styles.buttonContainer, layout.flexMid, layout.widthFull]}>
        <TouchableOpacity onPress={() => setObj(SKULL_OBJ_KEY)}>
          <Text>Skull</Text>
        </TouchableOpacity>
        <Spacer width={spacing.extraMedium} />
        <TouchableOpacity onPress={() => setObj(TV_OBJ_KEY)}>
          <Text>TV</Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: spacing.extraMedium,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
