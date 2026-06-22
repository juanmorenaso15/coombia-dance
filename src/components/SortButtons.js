import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const sortOptions = [
    { key: 'default', label: '📋 Default' },
    { key: 'name', label: '🔤 Nombre' },
    { key: 'favorites', label: '❤️ Favoritos' },
];

export const SortButtons = ({ selectedSort, onSelectSort }) => {
    return (
        <View style={styles.container}>
            {sortOptions.map((option) => (
                <TouchableOpacity
                    key={option.key}
                    style={[
                        styles.button,
                        selectedSort === option.key && styles.buttonActive,
                    ]}
                    onPress={() => onSelectSort(option.key)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            selectedSort === option.key && styles.buttonTextActive,
                        ]}
                    >
                        {option.label}
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
        marginBottom: 12,
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