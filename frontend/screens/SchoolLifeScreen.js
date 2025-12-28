import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// --- Mock Data ---
const MOCK_TIMETABLE = [
    // Simple representation: dayIndex (0=Mon), period (0=1st class), duration, name, room, color
    { day: 0, period: 2, duration: 2, name: '자료구조', room: '진리관 304호', color: '#FFCDD2' },
    { day: 1, period: 4, duration: 2, name: '알고리즘', room: '공학관 201호', color: '#BBDEFB' },
    { day: 2, period: 1, duration: 3, name: '운영체제', room: '공학관 102호', color: '#C8E6C9' },
    { day: 3, period: 3, duration: 1.5, name: '데이터베이스', room: '창조관 404호', color: '#FFF9C4' },
    { day: 4, period: 5, duration: 3, name: '캡스톤디자인', room: '실습실', color: '#E1BEE7' },
];

const MOCK_MENUS = {
    date: '2025.10.08 (수)',
    list: [
        { type: '학생식당', time: '아침', menu: '소고기미역국', price: '4,000원' },
        { type: '학생식당', time: '점심', menu: '제육볶음 & 계란찜', price: '5,500원' },
        { type: '교직원식당', time: '점심', menu: '황태해장국', price: '6,500원' },
        { type: '기숙사식당', time: '저녁', menu: '치킨마요덮밥', price: '5,000원' },
    ]
};

const MOCK_BUS_STOPS = [
    { id: 1, name: '터미널 (야우리)', time: '08:30' },
    { id: 2, name: '천안역 (서부광장)', time: '08:40' },
    { id: 3, name: '두정역', time: '08:50' },
    { id: 4, name: '안서동 (대학가)', time: '09:00' },
    { id: 5, name: '학교 정문', time: '09:10' },
];

const MOCK_EVENTS = [
    { id: 1, date: '10.03', title: '개천절 (휴무)' },
    { id: 2, date: '10.09', title: '한글날 (휴무)' },
    { id: 3, date: '10.20', title: '중간고사 시작' },
    { id: 4, date: '10.24', title: '중간고사 종료' },
    { id: 5, date: '10.31', title: '할로윈 행사' },
];

const { width } = Dimensions.get('window');

// --- Sub Components ---

const TimeTableView = () => {
    const days = ['월', '화', '수', '목', '금'];
    const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <ScrollView style={styles.contentContainer}>
            <View style={styles.timetableContainer}>
                {/* Header Row */}
                <View style={styles.tableRow}>
                    <View style={styles.tableHeaderCell} />
                    {days.map(day => (
                        <View key={day} style={styles.tableHeaderCell}>
                            <Text style={styles.dayText}>{day}</Text>
                        </View>
                    ))}
                </View>

                {/* Grid Body */}
                <View style={{ flexDirection: 'row' }}>
                    {/* Side Column (Periods) */}
                    <View style={{ width: 30 }}>
                        {periods.map(p => (
                            <View key={p} style={styles.periodCell}>
                                <Text style={styles.periodText}>{p}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Main Grid */}
                    <View style={{ flex: 1, position: 'relative', height: periods.length * 60 }}>
                        {/* Background Grid Lines */}
                        {periods.map((p, i) => (
                            <View key={i} style={[styles.gridLine, { top: i * 60 }]} />
                        ))}
                        {days.map((d, i) => (
                            <View key={i} style={[styles.gridVLine, { left: (i * (width - 70)) / 5 }]} />
                        ))}

                        {/* Class Blocks */}
                        {MOCK_TIMETABLE.map((item, index) => {
                            const colWidth = (width - 70) / 5; // approx width per day
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.classBlock,
                                        {
                                            left: item.day * colWidth + 1,
                                            top: (item.period - 1) * 60 + 1,
                                            height: item.duration * 60 - 2,
                                            width: colWidth - 2,
                                            backgroundColor: item.color
                                        }
                                    ]}
                                >
                                    <Text style={styles.classTitle}>{item.name}</Text>
                                    <Text style={styles.classRoom}>{item.room}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const MenuView = () => {
    return (
        <ScrollView style={styles.contentContainer}>
            <View style={styles.dateNav}>
                <Ionicons name="chevron-back" size={24} color="#333" />
                <Text style={styles.dateNavText}>{MOCK_MENUS.date}</Text>
                <Ionicons name="chevron-forward" size={24} color="#333" />
            </View>

            {MOCK_MENUS.list.map((item, idx) => (
                <View key={idx} style={styles.menuCard}>
                    <View style={styles.menuHeader}>
                        <View style={styles.menuBadge}>
                            <Text style={styles.menuBadgeText}>{item.type}</Text>
                        </View>
                        <Text style={styles.menuTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.menuTitle}>{item.menu}</Text>
                    <Text style={styles.menuPrice}>{item.price}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const BusView = () => {
    const [direction, setDirection] = useState('등교'); // 등교 or 하교

    return (
        <View style={styles.contentContainer}>
            <View style={styles.busToggle}>
                <TouchableOpacity
                    style={[styles.toggleBtn, direction === '등교' && styles.toggleBtnActive]}
                    onPress={() => setDirection('등교')}
                >
                    <Text style={[styles.toggleText, direction === '등교' && styles.toggleTextActive]}>등교</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleBtn, direction === '하교' && styles.toggleBtnActive]}
                    onPress={() => setDirection('하교')}
                >
                    <Text style={[styles.toggleText, direction === '하교' && styles.toggleTextActive]}>하교</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.busInfoCard}>
                <Ionicons name="time" size={20} color="#4A90E2" />
                <Text style={styles.busInfoText}>다음 버스까지 <Text style={{ fontWeight: 'bold', color: '#E53935' }}>15분</Text> 남았습니다.</Text>
            </View>

            <ScrollView>
                {MOCK_BUS_STOPS.map((stop) => (
                    <View key={stop.id} style={styles.busItem}>
                        <View style={styles.busLine}>
                            <View style={styles.busDot} />
                            <View style={styles.busLineStick} />
                        </View>
                        <View style={styles.busContent}>
                            <Text style={styles.busStopName}>{stop.name}</Text>
                            <Text style={styles.busTime}>{stop.time} 출발</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const CalendarView = () => {
    return (
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.calendarTitle}>📌 10월 주요 일정</Text>
            {MOCK_EVENTS.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateBoxText}>{event.date}</Text>
                    </View>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

// --- Main Screen ---

const SchoolLifeScreen = () => {
    const [activeTab, setActiveTab] = useState('TimeTable'); // TimeTable, Menu, Bus, Calendar

    const renderContent = () => {
        switch (activeTab) {
            case 'TimeTable': return <TimeTableView />;
            case 'Menu': return <MenuView />;
            case 'Bus': return <BusView />;
            case 'Calendar': return <CalendarView />;
            default: return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>학교생활</Text>
            </View>

            {/* 2. Custom Tabs */}
            <View style={styles.tabBar}>
                {['TimeTable', 'Menu', 'Bus', 'Calendar'].map((tab) => {
                    const map = { TimeTable: '시간표', Menu: '식단', Bus: '셔틀', Calendar: '학사일정' };
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabItem, isActive && styles.tabItemActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{map[tab]}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* 3. Content */}
            <View style={styles.contentArea}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabItemActive: {
        borderBottomColor: '#4A90E2',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#4A90E2',
        fontWeight: 'bold',
    },
    contentArea: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        flex: 1,
    },

    // TimeTable Styles
    timetableContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        minHeight: 600,
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 4,
        marginLeft: 30, // offset for period column
    },
    tableHeaderCell: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 4,
    },
    dayText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    periodCell: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#EEE',
    },
    periodText: {
        fontSize: 12,
        color: '#999',
    },
    gridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    gridVLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#F0F0F0',
    },
    classBlock: {
        position: 'absolute',
        borderRadius: 8,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    classTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    classRoom: {
        fontSize: 10,
        color: '#555',
        marginTop: 2,
    },

    // Menu Styles
    dateNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
    },
    dateNavText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 20,
    },
    menuCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    menuBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    menuBadgeText: {
        color: '#1E88E5',
        fontSize: 12,
        fontWeight: 'bold',
    },
    menuTime: {
        color: '#AAA',
        fontSize: 14,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    menuPrice: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
        textAlign: 'right',
    },

    // Bus Styles
    busToggle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleBtnActive: {
        backgroundColor: '#4A90E2',
    },
    toggleText: {
        fontSize: 16,
        color: '#666',
    },
    toggleTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    busInfoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    busInfoText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    busItem: {
        flexDirection: 'row',
        marginBottom: 0,
        height: 70,
    },
    busLine: {
        width: 30,
        alignItems: 'center',
    },
    busDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4A90E2',
        zIndex: 1,
    },
    busLineStick: {
        flex: 1,
        width: 2,
        backgroundColor: '#E0E0E0',
        marginTop: -2,
    },
    busContent: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 20,
    },
    busStopName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    busTime: {
        fontSize: 14,
        color: '#666',
    },

    // Calendar Styles
    calendarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
    },
    dateBox: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 8,
        marginRight: 16,
    },
    dateBoxText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    eventTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default SchoolLifeScreen;
