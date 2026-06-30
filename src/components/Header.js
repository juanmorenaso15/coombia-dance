import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const Header = ({ title = 'Colombia Dance' }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <Image 
                    source={require('../../assets/images/colombia-map.jpg')} 
                    style={styles.mapImage}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{title}</Text>
                    <Text style={styles.subHeader}>🇨🇴 Folclor y Danzas Colombianas</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',  
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapImage: {
        width: 45,
        height: 45,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
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