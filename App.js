import React from 'react';
import { StatusBar, View } from 'react-native'
import WatchView from './src/components/WatchView';

export default function App() {
  return (
  	<View style={{flex:1}}>
	    <StatusBar barStyle="light-content" />
	    <WatchView />
    </View>
  );
}
