import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_MENUS = [
    {
        id: '1',
        date: '2023-11-29',
        timeType: '중식',
        menuName: '왕돈까스 & 우동',
        restaurantName: '학생식당',
        price: '5,500원',
        rating: 4.5,
    },
    {
        id: '2',
        date: '2023-11-29',
        timeType: '중식',
        menuName: '돼지김치찌개',
        restaurantName: '교직원식당',
        price: '6,000원',
        rating: 4.2,
    },
    {
        id: '3',
        date: '2023-11-29',
        timeType: '석식',
        menuName: '치킨마요덮밥',
        restaurantName: '기숙사식당',
        price: '5,000원',
        rating: 4.0,
    },
];

const MOCK_TIMETABLE_DATA = [
    {
        title: '월요일',
        data: [
            { id: '1', time: '10:00 - 12:00', name: '자료구조', room: '진리관 304호' },
        ]
    },
    {
        title: '화요일',
        data: [
            { id: '2', time: '11:00 - 12:00', name: '채플', room: '대강당' },
        ]
    },
    {
        title: '수요일',
        data: [
            { id: '3', time: '14:00 - 16:00', name: '운영체제', room: '공학관 102호' },
        ]
    },
    {
        title: '목요일',
        data: [
            { id: '4', time: '09:00 - 10:30', name: '데이터베이스', room: '공학관 201호' },
        ]
    },
    {
        title: '금요일',
        data: [
            { id: '5', time: '13:00 - 16:00', name: '캡스톤디자인', room: '실습실' },
        ]
    },
];

const SchoolLifeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('MENU'); // 'MENU' or 'TIMETABLE'

    const renderMenuItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{item.timeType}</Text>
                </View>
                <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            </View>

            <Text style={styles.menuName}>{item.menuName}</Text>

            <View style={styles.cardFooter}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.reviewButton}>
                    <Ionicons name="star-outline" size={20} color="#FFD700" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderTimetableItem = ({ item }) => (
        <View style={styles.timetableItem}>
            <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.classInfo}>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.classRoom}>{item.room}</Text>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>학교생활</Text>
            </View>

            {/* Segmented Control */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'MENU' && styles.activeTab]}
                    onPress={() => setSelectedTab('MENU')}
                >
                    <Text style={[styles.tabText, selectedTab === 'MENU' && styles.activeTabText]}>학식 메뉴</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'TIMETABLE' && styles.activeTab]}
                    onPress={() => setSelectedTab('TIMETABLE')}
                >
                    <Text style={[styles.tabText, selectedTab === 'TIMETABLE' && styles.activeTabText]}>시간표</Text>
                </TouchableOpacity>
            </View>

            {selectedTab === 'MENU' ? (
                <FlatList
                    data={MOCK_MENUS}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <SectionList
                    sections={MOCK_TIMETABLE_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTimetableItem}
                    renderSectionHeader={renderSectionHeader}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                />
            )}
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
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 16,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#757575',
    },
    activeTabText: {
        color: '#333',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    badgeContainer: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#2196F3',
        fontSize: 12,
        fontWeight: 'bold',
    },
    restaurantName: {
        color: '#757575',
        fontSize: 14,
    },
    menuName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        paddingTop: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    reviewButton: {
        padding: 4,
    },
    // Timetable List Styles
    sectionHeader: {
        paddingVertical: 12,
        paddingHorizontal: 4,
        marginBottom: 8,
        marginTop: 16,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    timetableItem: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timeText: {
        marginLeft: 6,
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    classInfo: {
        borderLeftWidth: 3,
        borderLeftColor: '#4A90E2',
        paddingLeft: 12,
    },
    className: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    classRoom: {
        fontSize: 14,
        color: '#888',
    },
});

export default SchoolLifeScreen;
