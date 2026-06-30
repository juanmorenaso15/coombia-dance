import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity
} from 'react-native';
// Importamos el SafeAreaView para proteger los bordes de la barra de estado
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { DanceCard } from '../components/DanceCard';
import { SearchBar } from '../components/SearchBar';
import { FilterButtons } from '../components/FilterButtons';
import { dancesData } from '../data/dancesData';

export const HomeScreen = () => {
    const [dances, setDances] = useState(dancesData);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('Todas');

    // Toggle favorito
    const toggleFavorite = (id) => {
        setDances(prev =>
            prev.map(dance =>
                dance.id === id ? { ...dance, favorite: !dance.favorite } : dance
            )
        );
    };

    // Filtrar danzas
    const filteredDances = dances.filter(dance => {
        const matchesSearch = dance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dance.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion === 'Todas' || dance.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    // Calcular estadísticas
    const total = filteredDances.length;
    const favorites = filteredDances.filter(d => d.favorite).length;
    const regions = [...new Set(filteredDances.map(d => d.region))];

    // Danza aleatoria
    const getRandomDance = () => {
        if (filteredDances.length === 0) return;
        const random = filteredDances[Math.floor(Math.random() * filteredDances.length)];
        alert(`Danza Aleatoria:\n\n${random.name}\n${random.description}`);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1D4ED8" />
                <Text style={styles.loadingText}>Cargando danzas...</Text>
            </View>
        );
    }

    return (
        // Cambiamos el View externo por SafeAreaView para evitar que choque con la hora y la batería
        <SafeAreaView style={styles.container}>
            <Header title=" Colombia Dance" />

            <View style={styles.content}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* Estadísticas */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{total}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{favorites}</Text>
                        <Text style={styles.statLabel}>❤️ Favoritas</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{regions.length}</Text>
                        <Text style={styles.statLabel}>Regiones</Text>
                    </View>
                </View>

                <FilterButtons
                    selectedRegion={selectedRegion}
                    onSelectRegion={setSelectedRegion}
                />

                {/* Botón de Danza Aleatoria */}
                <TouchableOpacity style={styles.randomButton} onPress={getRandomDance}>
                    <Text style={styles.randomText}> Danza Aleatoria</Text>
                </TouchableOpacity>

                {filteredDances.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>💔</Text>
                        <Text style={styles.emptyText}>No encontramos danzas</Text>
                        <Text style={styles.emptySubtext}>Prueba con otra búsqueda o filtro</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredDances}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <DanceCard
                                dance={item}
                                onPress={() => {
                                    // Mostrar detalle en alert
                                    const instruments = item.instruments.join(', ');
                                    alert(
                                        `📖 ${item.name}\n\n` +
                                        `📍 Región: ${item.region}\n` +
                                        `📊 Dificultad: ${item.difficulty}\n\n` +
                                        `${item.description}\n\n` +
                                        `🎵 Instrumentos: ${instruments}\n\n` +
                                        `💃 Pasos: ${item.steps.join(', ')}`
                                    );
                                }}
                                onToggleFavorite={toggleFavorite}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                )}
            </View>

            {/* Contador de favoritos */}
            <View style={styles.favCounter}>
                <Text style={styles.favText}>❤️ {dances.filter(d => d.favorite).length}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Ponemos el contenedor base blanco para que combine limpio con tu Header
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#64748B',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        backgroundColor: '#F8FAFC', // Mantenemos el fondo gris claro para el cuerpo de la app
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E2E8F0',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#94A3B8',
        marginTop: 4,
    },
    listContent: {
        paddingBottom: 80,
    },
    randomButton: {
        backgroundColor: '#7287e6', // Conservamos exactamente tu color de botón original
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    randomText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    favCounter: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#E63946',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    favText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});