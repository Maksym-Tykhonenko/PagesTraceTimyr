import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOnboardingCompleted } from '../store/slices/appSlice';
import { WelcomeScreen, RatingScreen, CharactersScreen } from './onboarding';

const OnboardingScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    dispatch(setOnboardingCompleted(true));
    navigation.replace('Main');
  };

  const handleComplete = () => {
    dispatch(setOnboardingCompleted(true));
    navigation.replace('Main');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeScreen
            onNext={handleNext}
            onSkip={handleSkip}
          />
        );
      case 1:
        return (
          <RatingScreen
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
          />
        );
      case 2:
        return (
          <CharactersScreen
            onPrevious={handlePrevious}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return renderCurrentStep();
};

export default OnboardingScreen;
