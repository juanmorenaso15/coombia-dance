import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Header = ({ title = 'Colombia Dance 💃' }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.subHeader}>Folclor y Danzas Colombianas</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
    },
    headerText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
    },
    subHeader: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
        fontWeight: '500',
    },
});