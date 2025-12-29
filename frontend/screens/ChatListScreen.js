import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_CHAT_ROOMS = [
    { id: '1', title: '천안역 택시 합승 (2/4)', lastMessage: '지금 출발합니다! 다들 어디세요?', time: '방금 전', unread: 2, type: 'TAXI' },
    { id: '2', title: '컴퓨터구조론 책 삽니다', lastMessage: '네, 도서관 앞에서 뵈어요. 감사합니다.', time: '10분 전', unread: 0, type: 'BOOK' },
    { id: '3', title: '캡스톤 디자인 팀원 모집', lastMessage: '회의 시간 언제로 할까요? 편한 시간 남겨주세요.', time: '1시간 전', unread: 5, type: 'TEAM' },
];

const ChatListScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatCard}
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id, title: item.title })}
            activeOpacity={0.7}
        >
            <View style={[styles.avatarBox, getTypeColor(item.type)]}>
                <Ionicons name={getTypeIcon(item.type)} size={24} color="white" />
            </View>
            <View style={styles.chatContent}>
                <View style={styles.chatTopRow}>
                    <Text style={styles.chatTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                <View style={styles.chatBottomRow}>
                    <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>{item.unread}</Text>
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
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>채팅</Text>
                <View style={{ width: 28 }} />
            </View>
            <FlatList
                data={MOCK_CHAT_ROOMS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyChat}>
                        <Ionicons name="chatbubbles-outline" size={64} color="#EEE" />
                        <Text style={styles.emptyText}>참여 중인 채팅이 없습니다.</Text>
                    </View>
                }
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
        case 'TAXI': return { backgroundColor: '#FF9800' };
        case 'BOOK': return { backgroundColor: '#4CAF50' };
        case 'TEAM': return { backgroundColor: '#4A90E2' };
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
    listContainer: {
        padding: 20,
    },
    chatCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 16,
        marginBottom: 14,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        alignItems: 'center',
    },
    avatarBox: {
        width: 54,
        height: 54,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    chatContent: {
        flex: 1,
    },
    chatTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 8,
    },
    chatTime: {
        fontSize: 11,
        color: '#BBB',
        fontWeight: '600',
    },
    chatBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        flex: 1,
        marginRight: 10,
    },
    unreadBadge: {
        backgroundColor: '#FF5252',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 3,
        minWidth: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF5252',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
    },
    unreadBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
    },
    emptyChat: {
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

export default ChatListScreen;
