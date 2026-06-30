import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// Importamos los iconos vectoriales oficiales de Expo
import { Ionicons } from '@expo/vector-icons';

export const SearchBar = ({ value, onChangeText, placeholder = 'Buscar danza...' }) => {
    return (
        <View style={styles.container}>
            {/* Reemplazamos la imagen de la lupa por un icono vectorial limpio */}
            <Ionicons 
                name="search" 
                size={20} 
                color="#64748B" 
                style={styles.searchIcon} 
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
                    {/* Reemplazamos la imagen de cerrar por un icono de X estilizado */}
                    <Ionicons 
                        name="close-circle" 
                        size={20} 
                        color="#94A3B8" 
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
        marginRight: 8,
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
});