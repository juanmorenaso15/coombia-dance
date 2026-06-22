import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const regions = ['Todas', 'Caribe', 'Andina', 'Pacífica', 'Llanos Orientales'];

export const FilterButtons = ({ selectedRegion, onSelectRegion }) => {
    return (
        <View style={styles.container}>
            {regions.map((region) => (
                <TouchableOpacity
                    key={region}
                    style={[
                        styles.button,
                        selectedRegion === region && styles.buttonActive,
                    ]}
                    onPress={() => onSelectRegion(region)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            selectedRegion === region && styles.buttonTextActive,
                        ]}
                    >
                        {region}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
        gap: 8,
    },
    button: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        marginRight: 8,
        marginBottom: 8,
    },
    buttonActive: {
        backgroundColor: '#1D4ED8',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#475569',
    },
    buttonTextActive: {
        color: '#FFFFFF',
    },
});