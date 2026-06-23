import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

export const DanceDetailModal = ({ visible, dance, onClose }) => {
    if (!dance) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.header}>
                                <View style={styles.headerImageContainer}>
                                    <Image 
                                        source={dance.image} 
                                        style={styles.headerImage}
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text style={styles.title}>{dance.name}</Text>
                                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.content}>
                                <View style={styles.badgeContainer}>
                                    <View style={[styles.badge, { backgroundColor: '#E8F5E9' }]}>
                                        <Text style={styles.badgeText}>📍 {dance.region}</Text>
                                    </View>
                                    <View style={[styles.badge, { backgroundColor: '#FFF3E0' }]}>
                                        <Text style={styles.badgeText}>📊 {dance.difficulty}</Text>
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>📖 Descripción</Text>
                                    <Text style={styles.description}>{dance.description}</Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>📜 Historia</Text>
                                    <Text style={styles.description}>{dance.history}</Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>🎵 Instrumentos</Text>
                                    <View style={styles.instrumentsContainer}>
                                        {dance.instruments.map((instrument, index) => (
                                            <View key={index} style={styles.instrumentItem}>
                                                <Text style={styles.instrumentText}>• {instrument}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>💃 Pasos Básicos</Text>
                                    {dance.steps.map((step, index) => (
                                        <View key={index} style={styles.stepItem}>
                                            <Text style={styles.stepNumber}>{index + 1}.</Text>
                                            <Text style={styles.stepText}>{step}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 12,
    },
    headerImage: {
        width: 50,
        height: 50,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    closeButton: {
        padding: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeText: {
        fontSize: 16,
        color: '#475569',
        fontWeight: '600',
    },
    content: {
        paddingTop: 16,
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1A237E',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
    },
    instrumentsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    instrumentItem: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    instrumentText: {
        fontSize: 13,
        color: '#334155',
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    stepNumber: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1D4ED8',
        marginRight: 8,
        width: 24,
    },
    stepText: {
        fontSize: 13,
        color: '#334155',
        flex: 1,
    },
});