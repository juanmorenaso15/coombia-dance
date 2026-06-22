import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const DanceCard = ({ dance, onPress, onToggleFavorite }) => {
    return (
        <TouchableOpacity
            style={[styles.card, { borderLeftColor: dance.colors[0] }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{dance.image}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{dance.name}</Text>
                    <View style={styles.tagContainer}>
                        <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={styles.tagText}>{dance.region}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => onToggleFavorite(dance.id)}
                >
                    <Text style={styles.favoriteIcon}>
                        {dance.favorite ? '❤️' : '🤍'}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.description} numberOfLines={2}>
                {dance.description}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        fontSize: 24,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#1A237E',
    },
    favoriteButton: {
        padding: 8,
    },
    favoriteIcon: {
        fontSize: 20,
    },
    description: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 8,
        lineHeight: 20,
    },
});