import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { DanceCard } from '../components/DanceCard';
import { DanceDetailModal } from '../components/DanceDetailModal';
import { SearchBar } from '../components/SearchBar';
import { FilterButtons } from '../components/FilterButtons';
import { SortButtons } from '../components/SortButtons';
import { dancesData } from '../data/dancesData';

export const HomeScreen = () => {
    const [dances, setDances] = useState(dancesData);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('Todas');
    const [selectedSort, setSelectedSort] = useState('default');
    const [selectedDance, setSelectedDance] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [favoritesModalVisible, setFavoritesModalVisible] = useState(false);

    const toggleFavorite = (id) => {
        setDances(prev =>
            prev.map(dance =>
                dance.id === id ? { ...dance, favorite: !dance.favorite } : dance
            )
        );
    };

    const filteredDances = dances.filter(dance => {
        const matchesSearch = dance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dance.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion === 'Todas' || dance.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    const getFilteredBySort = (dancesList) => {
        if (selectedSort === 'favorites') {
            return dancesList.filter(dance => dance.favorite === true);
        }
        return dancesList;
    };

    const filteredBySearchAndRegion = filteredDances;
    const filteredByFavorites = getFilteredBySort(filteredBySearchAndRegion);
    const sortedDances = filteredByFavorites;

    const total = filteredDances.length;
    const favorites = filteredDances.filter(d => d.favorite).length;
    const regions = [...new Set(filteredDances.map(d => d.region))];

    const favoriteDances = dances.filter(dance => dance.favorite === true);

    const getRandomDance = () => {
        if (sortedDances.length === 0) return;
        const random = sortedDances[Math.floor(Math.random() * sortedDances.length)];
        setSelectedDance(random);
        setModalVisible(true);
    };

    const openDanceDetail = (dance) => {
        setSelectedDance(dance);
        setModalVisible(true);
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
        <SafeAreaView style={styles.container}>
            <Header title=" Colombia Dance" />

            <View style={styles.content}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

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

                <View style={styles.divider} />

                <SortButtons
                    selectedSort={selectedSort}
                    onSelectSort={setSelectedSort}
                />

                {selectedSort !== 'favorites' && (
                    <TouchableOpacity style={styles.randomButton} onPress={getRandomDance}>
                        <Text style={styles.randomText}>Danza Aleatoria</Text>
                    </TouchableOpacity>
                )}

                {sortedDances.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No encontramos danzas</Text>
                        <Text style={styles.emptySubtext}>
                            {selectedSort === 'favorites'
                                ? 'No tienes danzas favoritas aún. ❤️'
                                : 'Prueba con otra búsqueda o filtro'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={sortedDances}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <DanceCard
                                dance={item}
                                onPress={() => openDanceDetail(item)}
                                onToggleFavorite={toggleFavorite}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                )}
            </View>

            <TouchableOpacity 
                style={styles.favCounter} 
                onPress={() => setFavoritesModalVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={styles.favText}>❤️ {dances.filter(d => d.favorite).length}</Text>
            </TouchableOpacity>

            {/* Modal de Favoritos */}
            <Modal
                visible={favoritesModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setFavoritesModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Header del Modal */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>❤️ Danzas Favoritas</Text>
                            <TouchableOpacity 
                                onPress={() => setFavoritesModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Contenido del Modal */}
                        {favoriteDances.length === 0 ? (
                            <View style={styles.emptyFavoritesContainer}>
                                <Text style={styles.emptyFavoritesText}>No tienes danzas favoritas</Text>
                                <Text style={styles.emptyFavoritesSubtext}>
                                    ¡Explora y encuentra tu danza favorita!
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={favoriteDances}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.favoriteItem}
                                        onPress={() => {
                                            setFavoritesModalVisible(false);
                                            setSelectedDance(item);
                                            setModalVisible(true);
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Image 
                                            source={item.image} 
                                            style={styles.favoriteImage}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.favoriteInfo}>
                                            <Text style={styles.favoriteName}>{item.name}</Text>
                                            <Text style={styles.favoriteRegion}>{item.region}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.favoritesList}
                            />
                        )}
                    </View>
                </View>
            </Modal>

            <DanceDetailModal
                visible={modalVisible}
                dance={selectedDance}
                onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#F8FAFC',
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
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 80,
    },
    randomButton: {
        backgroundColor: '#5aa0da',
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
    divider: {
        height: 3,
        backgroundColor: '#E2E8F0',
        marginVertical: 15,
        marginHorizontal: 7,
    },
    // Modal de Favoritos
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        minHeight: '40%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#64748B',
        fontWeight: '600',
    },
    favoritesList: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    favoriteImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
    },
    favoriteInfo: {
        flex: 1,
    },
    favoriteName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 2,
    },
    favoriteRegion: {
        fontSize: 14,
        color: '#64748B',
    },
    emptyFavoritesContainer: {
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyFavoritesEmoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyFavoritesText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
    },
    emptyFavoritesSubtext: {
        fontSize: 14,
        color: '#94A3B8',
        marginTop: 4,
    },
});