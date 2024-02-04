import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';

const OrangeCheckbox = () => {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxToggle = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checked]}
        >
            {isChecked && <Icon.Check stroke={themeColors.bgColor(1)} strokeWidth="1" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'orange',
        backgroundColor: 'transparent',
    },
    checked: {
        backgroundColor: 'orange',
    },
});

export default OrangeCheckbox;
