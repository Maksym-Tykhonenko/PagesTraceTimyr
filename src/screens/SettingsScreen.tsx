import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Switch,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { colors, shadows, typography, spacing, borderRadius } from '../styles/theme';
import GoldCard from '../components/GoldCard';
import GoldButton from '../components/GoldButton';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  
  // Local state for settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
  const [dataUsageOptimized, setDataUsageOptimized] = useState(true);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This will export all your data to a file. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => {
          // TODO: Implement data export functionality
          Alert.alert('Success', 'Data exported successfully!');
        }},
      ]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      'Import Data',
      'This will import data from a file. This action will overwrite existing data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Import', onPress: () => {
          // TODO: Implement data import functionality
          Alert.alert('Success', 'Data imported successfully!');
        }},
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This action cannot be undone. All your data will be permanently deleted. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {
          // TODO: Implement data clearing functionality
          Alert.alert('Success', 'All data cleared successfully!');
        }},
      ]
    );
  };

  const renderSettingItem = (
    title: string,
    subtitle: string,
    icon: string,
    rightComponent?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {rightComponent && (
        <View style={styles.settingRight}>
          {rightComponent}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderSwitchSetting = (
    title: string,
    subtitle: string,
    icon: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.settingRight}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.cosmic.border, true: colors.gold.primary }}
          thumbColor={value ? colors.gold.light : colors.text.muted}
          ios_backgroundColor={colors.cosmic.border}
        />
      </View>
    </View>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <GoldCard style={styles.sectionCard} glowIntensity="low">
        {children}
      </GoldCard>
    </View>
  );

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        {renderSection('Preferences', (
          <>
            
           
            {renderSwitchSetting(
              'Auto Backup',
              'Automatically backup your data',
              '💾',
              autoBackupEnabled,
              setAutoBackupEnabled
            )}
            {renderSwitchSetting(
              'Data Optimization',
              'Optimize data usage and performance',
              '⚡',
              dataUsageOptimized,
              setDataUsageOptimized
            )}
          </>
        ))}

        {renderSection('Data Management', (
          <>
            
            {renderSettingItem(
              'Clear All Data',
              'Permanently delete all your data',
              '🗑️',
              undefined,
              handleClearData
            )}
          </>
        ))}

        
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cosmic.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
    paddingLeft: spacing.sm,
  },
  sectionCard: {
    borderRadius: borderRadius.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cosmic.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: spacing.md,
    width: 30,
    textAlign: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize: 20,
    color: colors.text.muted,
    fontWeight: '300',
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  signOutButton: {
    minWidth: 200,
  },
});

export default SettingsScreen;
