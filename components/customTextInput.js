import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const OrangeShadowTextInput = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.textInput, props.style]} // Merge custom styles with default styles
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderColor: 'orange', // Border color
    borderWidth: 1,
    borderRadius: 8, // Border radius for rounded corners
    paddingHorizontal: 10, // Horizontal padding for text inside TextInput
    shadowColor: 'orange', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    backgroundColor: 'white', // Background color
    marginBottom: 10, // Bottom margin for spacing
  },
});

export default OrangeShadowTextInput;
