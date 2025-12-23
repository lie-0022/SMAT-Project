import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
    { id: 'TAXI', name: '택시합승' },
    { id: 'BOOK', name: '중고책' },
    { id: 'TEAM', name: '팀원모집' },
];

const MOCK_POSTS = {
    TAXI: [
        { id: '1', title: '천안역 4명 모집 (2/4)', start: '천안역', end: '학교', time: '10분 전', author: '익명', status: '모집중', current: 2, max: 4 },
        { id: '2', title: '터미널 가실 분 구해요', start: '학교', end: '터미널', time: '30분 전', author: '익명', status: '완료', current: 4, max: 4 },
    ],
    BOOK: [
        { id: '1', title: '쉽게 배우는 자바 팝니다', price: '15,000원', seller: '컴공학생', time: '1시간 전', status: '판매중' },
        { id: '2', title: '운영체제 공룡책 팝니다', price: '20,000원', seller: '졸업생', time: '어제', status: '판매완료' },
    ],
    TEAM: [
        { id: '1', title: '공모전 백엔드 구합니다', role: '백엔드 개발자', content: '스프링부트 가능하신 분...', author: '팀장', time: '2시간 전', status: '모집중' },
        { id: '2', title: '캡스톤 디자인 프론트엔드', role: '프론트엔드 개발자', content: '리액트 네이티브 하실 분', author: '개발자', time: '3시간 전', status: '모집중' },
    ],
};

const CommunityScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('TAXI');

    const renderPostItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
            </View>

            <View style={styles.cardContent}>
                {selectedCategory === 'TAXI' && (
                    <Text style={styles.detailText}>{item.start} → {item.end}</Text>
                )}
                {selectedCategory === 'BOOK' && (
                    <Text style={styles.priceText}>{item.price}</Text>
                )}
                {selectedCategory === 'TEAM' && (
                    <Text style={styles.detailText}>{item.role}</Text>
                )}
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.author}>{item.author || item.seller}</Text>
                <View style={[
                    styles.statusBadge,
                    (item.status === '완료' || item.status === '판매완료') && styles.statusDone
                ]}>
                    <Text style={[
                        styles.statusText,
                        (item.status === '완료' || item.status === '판매완료') && styles.statusTextDone
                    ]}>
                        {item.status}
                        {selectedCategory === 'TAXI' && item.status === '모집중' && ` (${item.current}/${item.max})`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>커뮤니티</Text>
            </View>

            {/* Category Tabs */}
            <View style={styles.categoryContainer}>
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[styles.categoryButton, selectedCategory === cat.id && styles.activeCategory]}
                        onPress={() => setSelectedCategory(cat.id)}
                    >
                        <Text style={[styles.categoryText, selectedCategory === cat.id && styles.activeCategoryText]}>
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={MOCK_POSTS[selectedCategory]}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    categoryButton: {
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    activeCategory: {
        backgroundColor: '#333',
        borderColor: '#333',
    },
    categoryText: {
        color: '#666',
        fontWeight: '600',
    },
    activeCategoryText: {
        color: 'white',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 80, // Space for FAB
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    postTime: {
        fontSize: 12,
        color: '#999',
    },
    cardContent: {
        marginBottom: 12,
    },
    detailText: {
        fontSize: 14,
        color: '#555',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    author: {
        fontSize: 14,
        color: '#666',
    },
    statusBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusDone: {
        backgroundColor: '#EEEEEE',
    },
    statusText: {
        fontSize: 12,
        color: '#2196F3',
        fontWeight: 'bold',
    },
    statusTextDone: {
        color: '#999',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default CommunityScreen;
