import React, { useEffect , useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import * as Progress from 'react-native-progress';

const LoaderScreen = ({ navigation }: any) => { 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 0.01; // крок
      setProgress(start);
      if (start >= 1) {
        clearInterval(interval);
        // тут можна зробити навігацію після завантаження
        // navigation.replace("Home");
      }
    }, 80); // 80мс * 100 кроків = 8000мс (8 секунд)

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground style={{ width: '110%', height: '110%' }} source={require('../assets/images/Loader.png')} resizeMode="cover">
        <View style={{alignItems:'center', justifyContent: 'center', flex: 1, }}>
          <Image style={{ width: 300, height: 300, marginBottom:300}} source={require('../assets/images/imageLogo.png')} />
          <Progress.Bar progress={progress}
            width={250}
            height={15}
            color="#bfa61a"   // золотий колір
            unfilledColor="#797575"
            borderWidth={0} />
        </View>
      </ImageBackground>
      
    </View>
  )
}
  {/** 
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const isOnboardingCompleted = useSelector((state: RootState) => state.app.isOnboardingCompleted);

  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ),
    ]).start();

    // Simulate loading time
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
      
      if (isOnboardingCompleted) {
        //navigation.replace('Main');
      } else {
        //navigation.replace('Onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.appName}>STAR TRACE</Text>
        <Text style={styles.tagline}>Trace Your Cosmic Journey</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.loadingContainer,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <View style={styles.star} />
        <View style={styles.star2} />
        <View style={styles.star3} />
      </Animated.View>

      <Animated.Text
        style={[
          styles.loadingText,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        Loading your universe...
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cosmic.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  appName: {
    ...typography.h1,
    color: colors.gold.primary,
    letterSpacing: 4,
    marginBottom: spacing.md,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tagline: {
    ...typography.body,
    color: colors.text.primary,
    opacity: 0.8,
    letterSpacing: 1,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  loadingContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  star: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: colors.gold.primary,
    borderRadius: 10,
    top: 0,
    left: 40,
    ...shadows.medium,
    shadowColor: colors.gold.primary,
    shadowOpacity: 0.6,
  },
  star2: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: colors.gold.secondary,
    borderRadius: 7.5,
    top: 25,
    left: 0,
    ...shadows.small,
    shadowColor: colors.gold.secondary,
    shadowOpacity: 0.5,
  },
  star3: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: colors.gold.primary,
    borderRadius: 9,
    top: 25,
    right: 0,
    ...shadows.medium,
    shadowColor: colors.gold.primary,
    shadowOpacity: 0.6,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.primary,
    opacity: 0.7,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});
*/}
export default LoaderScreen;
