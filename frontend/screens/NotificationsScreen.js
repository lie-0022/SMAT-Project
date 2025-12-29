import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_NOTIFICATIONS = [
    { id: '1', title: '강의 휴강 안내', content: '오늘 컴퓨터구조론 강의가 휴강되었습니다. 보강 일정은 추후 공지될 예정입니다.', time: '10분 전', type: 'alert' },
    { id: '2', title: '셔틀버스 도착 알림', content: '탑승하실 셔틀버스가 5분 뒤 천안역 승강장에 도착합니다.', time: '1시간 전', type: 'info' },
    { id: '3', title: '댓글 알림', content: '내 게시글 "천안역 4명 모집"에 새로운 댓글이 달렸습니다.', time: '2시간 전', type: 'message' },
    { id: '4', title: '학식 메뉴 안내', content: '오늘 점심 웅비관 특선 메뉴 "눈꽃치즈돈까스"를 확인해보세요!', time: '어제', type: 'food' },
];

const NotificationsScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.notificationCard} activeOpacity={0.7}>
            <View style={[styles.iconContainer, getTypeStyle(item.type)]}>
                <Ionicons name={getIconName(item.type)} size={22} color="#FFF" />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.topRow}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
                <Text style={styles.notificationContent} numberOfLines={2}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>알림</Text>
                <TouchableOpacity style={styles.headerRight}>
                    <Text style={styles.readAllText}>모두 읽음</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={64} color="#EEE" />
                        <Text style={styles.emptyText}>받은 알림이 없습니다.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const getIconName = (type) => {
    switch (type) {
        case 'alert': return 'alert-circle';
        case 'info': return 'information-circle';
        case 'message': return 'chatbubbles';
        case 'food': return 'restaurant';
        default: return 'notifications';
    }
};

const getTypeStyle = (type) => {
    switch (type) {
        case 'alert': return { backgroundColor: '#FF5252' };
        case 'info': return { backgroundColor: '#4A90E2' };
        case 'message': return { backgroundColor: '#4CAF50' };
        case 'food': return { backgroundColor: '#FF9800' };
        default: return { backgroundColor: '#9E9E9E' };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F3F8',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    headerRight: {
        padding: 4,
    },
    readAllText: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: '700',
    },
    listContent: {
        padding: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        alignItems: 'center',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 8,
    },
    notificationTime: {
        fontSize: 11,
        color: '#BBB',
        fontWeight: '600',
    },
    notificationContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#BBB',
        fontWeight: '600',
    },
});

export default NotificationsScreen;
