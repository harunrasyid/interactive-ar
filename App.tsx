import React, { useState } from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
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

const InitialScene = (props: any) => {
  const data = props.sceneNavigator.viroAppProps;
  ViroMaterials.createMaterials({
    tv: {
      diffuseTexture: require('./assets/wood.jpg'),
    },
  });

  return (
    <ViroARScene>
      <ViroAmbientLight color={color.neutral10} />
      {data.object === SKULL_OBJ_KEY ? (
        <Viro3DObject
          type={'OBJ'}
          source={require('@assets/skull/12140_Skull_v3_L2.obj')}
          position={[0, 0, -5]}
          scale={[0.08, 0.08, 0.08]}
          rotation={[-45, 10, 40]}
        />
      ) : (
        <Viro3DObject
          type={'OBJ'}
          source={require('@assets/tv/12221_Cat_v1_l3.obj')}
          position={[0, 0, -5]}
          scale={[0.08, 0.08, 0.08]}
          rotation={[-80, 10, 0]}
          // materials={['tv']}
        />
      )}

      <ViroText text={'BRUH'} position={[0, -5, -3]} scale={[5, 5, 5]} />
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
});
