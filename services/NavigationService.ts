import { 
  createNavigationContainerRef,
  StackActions,
  NavigationAction,
} from '@react-navigation/native';
import { router } from 'expo-router';

// Define route parameters
export type RootStackParamList = {
  '(auth)': undefined;
  '(auth)/login': undefined;
  '(auth)/instance-selection': undefined;
  '(tabs)': undefined;
  '(tabs)/index': undefined;
  '(tabs)/explore': undefined;
  '(tabs)/search': undefined;
  '(tabs)/notifications': undefined;
  '(tabs)/profile': undefined;
};

// Create a navigation ref that can be used outside of components
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigation service for use outside of React components
export const NavigationService = {
  /**
   * Navigate to a specific route
   */
  navigate<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {
      // @ts-ignore - The params should be correctly typed
      navigationRef.navigate(name, params);
    } else {
      // Fallback to Expo Router when navigationRef isn't ready
      router.push({
        pathname: `/${name.toString()}` as any,
        params: params as any,
      });
    }
  },

  /**
   * Go back to the previous screen
   */
  goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    } else {
      router.back();
    }
  },

  /**
   * Replace the current screen with a new one
   */
  replace<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        StackActions.replace(name as string, params as any)
      );
    } else {
      router.replace({
        pathname: `/${name.toString()}` as any,
        params: params as any,
      });
    }
  },

  /**
   * Reset the navigation stack to a new route
   */
  reset<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: name as string, params: params as any }],
      });
    } else {
      // Expo Router doesn't have a direct reset equivalent, so we'll use replace
      router.replace({
        pathname: `/${name.toString()}` as any,
        params: params as any,
      });
    }
  },

  /**
   * Dispatch a navigation action directly
   */
  dispatch(action: NavigationAction) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(action);
    }
  },
};

export default NavigationService; 