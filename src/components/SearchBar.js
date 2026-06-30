import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export const SearchBar = ({ value, onChangeText, placeholder = 'Buscar danza...' }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/icons/search.jpg')} 
                style={styles.searchIcon}
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChangeText}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
                    <Image 
                        source={require('../../assets/images/icons/close.jpg')} 
                        style={styles.clearIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: '#64748B',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: '#0F172A',
    },
    clearButton: {
        padding: 4,
    },
    clearIcon: {
        width: 20,
        height: 20,
        tintColor: '#000000',
    },
});