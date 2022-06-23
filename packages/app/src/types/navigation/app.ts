export enum AppRoutes {
  Dashboard = 'Dashboard',
  Profile = 'Profile',
  UpdateName = 'UpdateName',
  ChangePassword = 'ChangePassword',
}

export type AppStackParamList = {
  [AppRoutes.Dashboard]: { showHasSetPassword: boolean; showOnboardingSuccess?: boolean };
  [AppRoutes.Profile]: undefined;
  [AppRoutes.UpdateName]: undefined;
  [AppRoutes.ChangePassword]: undefined;
}