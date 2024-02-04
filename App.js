import { Text, View } from 'react-native';
import Navigation from './navigation';
import { store } from './store'
import { Provider } from 'react-redux'
import { enableLatestRenderer } from 'react-native-maps';

export default function App() {
  
  enableLatestRenderer();

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
};