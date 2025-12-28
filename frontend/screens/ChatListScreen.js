import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_CHAT_ROOMS = [
    { id: '1', title: '천안역 택시 합승 (2/4)', lastMessage: '지금 출발합니다!', time: '방금 전', unread: 2, type: 'TAXI' },
    { id: '2', title: '컴퓨터구조론 책 삽니다', lastMessage: '네, 도서관 앞에서 뵈어요.', time: '10분 전', unread: 0, type: 'BOOK' },
    { id: '3', title: '캡스톤 디자인 팀원 모집', lastMessage: '회의 시간 언제로 할까요?', time: '1시간 전', unread: 5, type: 'TEAM' },
];

const ChatListScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id, title: item.title })}
        >
            <View style={[styles.avatar, getTypeColor(item.type)]}>
                <Ionicons name={getTypeIcon(item.type)} size={24} color="white" />
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.message} numberOfLines={1}>{item.lastMessage}</Text>
                    {item.unread > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>채팅</Text>
            </View>
            <FlatList
                data={MOCK_CHAT_ROOMS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const getTypeIcon = (type) => {
    switch (type) {
        case 'TAXI': return 'car';
        case 'BOOK': return 'book';
        case 'TEAM': return 'people';
        default: return 'chatbubble';
    }
};

const getTypeColor = (type) => {
    switch (type) {
        case 'TAXI': return { backgroundColor: '#FFB74D' }; // Orange
        case 'BOOK': return { backgroundColor: '#81C784' }; // Green
        case 'TEAM': return { backgroundColor: '#64B5F6' }; // Blue
        default: return { backgroundColor: '#BDBDBD' };
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
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
        flex: 1,
        marginRight: 8,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        marginRight: 8,
    },
    badge: {
        backgroundColor: '#FF5252',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default ChatListScreen;
