import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_NOTIFICATIONS = [
    { id: '1', title: '강의 휴강 안내', content: '오늘 컴퓨터구조론 강의가 휴강되었습니다.', time: '10분 전', type: 'alert' },
    { id: '2', title: '셔틀버스 도착 알림', content: '탑승하실 셔틀버스가 5분 뒤 도착합니다.', time: '1시간 전', type: 'info' },
    { id: '3', title: '댓글 알림', content: '내 게시글에 새로운 댓글이 달렸습니다.', time: '2시간 전', type: 'message' },
    { id: '4', title: '학식 메뉴 안내', content: '오늘 점심 특선 메뉴를 확인해보세요!', time: '어제', type: 'food' },
];

const NotificationsScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <View style={[styles.iconBox, getTypeStyle(item.type)]}>
                <Ionicons name={getIconName(item.type)} size={24} color="#FFF" />
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.text} numberOfLines={2}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>알림</Text>
            </View>
            <FlatList
                data={MOCK_NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const getIconName = (type) => {
    switch (type) {
        case 'alert': return 'alert-circle';
        case 'info': return 'information-circle';
        case 'message': return 'chatbubble-ellipses';
        case 'food': return 'restaurant';
        default: return 'notifications';
    }
};

const getTypeStyle = (type) => {
    switch (type) {
        case 'alert': return { backgroundColor: '#E57373' };
        case 'info': return { backgroundColor: '#64B5F6' };
        case 'message': return { backgroundColor: '#81C784' };
        case 'food': return { backgroundColor: '#FFB74D' };
        default: return { backgroundColor: '#90A4AE' };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        paddingRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    list: {
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    text: {
        fontSize: 14,
        color: '#666',
    },
});

export default NotificationsScreen;
