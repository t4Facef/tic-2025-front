import { useRoutePersistence } from '../../hooks/useRoutePersistence';
import RouteRestorer from './RouteRestorer';

export const NavigationManager = () => {
  useRoutePersistence();
  
  return <RouteRestorer />;
};

export default NavigationManager;