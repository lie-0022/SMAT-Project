import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ChatRoomScreen = ({ route, navigation }) => {
    const { title } = route.params;
    const [messages, setMessages] = useState([
        { id: '1', text: '안녕하세요! 혹시 천안역 도착하셨나요?', sender: 'me', time: '오전 10:30' },
        { id: '2', text: '네, 지금 정문 쪽 버스 정류장 앞입니다.', sender: 'other', time: '오전 10:31' },
        { id: '3', text: '금방 갈게요! 2분 정도 걸립니다.', sender: 'me', time: '오전 10:32' },
        { id: '4', text: '천천히 오세요~ 흰색 소나타입니다.', sender: 'other', time: '오전 10:33' },
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMsg = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([newMsg, ...messages]);
        setInputText('');
    };

    const renderMessage = ({ item }) => {
        const isMe = item.sender === 'me';
        return (
            <View style={[styles.messageWrapper, isMe ? styles.myMessageWrapper : styles.otherMessageWrapper]}>
                {!isMe && (
                    <View style={styles.otherAvatar}>
                        <Ionicons name="person" size={14} color="#D1D9E6" />
                    </View>
                )}
                <View style={styles.bubbleRow}>
                    {isMe && <Text style={styles.messageTime}>{item.time}</Text>}
                    <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                        <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                            {item.text}
                        </Text>
                    </View>
                    {!isMe && <Text style={styles.messageTime}>{item.time}</Text>}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={22} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            {/* Message List */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messageList}
                inverted
                showsVerticalScrollIndicator={false}
            />

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
            >
                <View style={styles.inputArea}>
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="add-circle-outline" size={28} color="#999" />
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="메시지를 입력하세요..."
                            placeholderTextColor="#AAA"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                        <TouchableOpacity
                            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
                            onPress={handleSend}
                            disabled={!inputText.trim()}
                        >
                            <Ionicons name="send" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF', // Unified bg
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F3F8',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1A1A1A',
        flex: 1,
        textAlign: 'center',
    },
    menuButton: {
        padding: 4,
    },
    messageList: {
        padding: 20,
    },
    messageWrapper: {
        marginBottom: 16,
        flexDirection: 'row',
    },
    myMessageWrapper: {
        justifyContent: 'flex-end',
    },
    otherMessageWrapper: {
        justifyContent: 'flex-start',
    },
    otherAvatar: {
        width: 32,
        height: 32,
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#F0F3F8',
    },
    bubbleRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    bubble: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        maxWidth: width * 0.7,
    },
    myBubble: {
        backgroundColor: '#4A90E2',
        borderBottomRightRadius: 4,
        shadowColor: '#4A90E2',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    otherBubble: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '500',
    },
    myMessageText: {
        color: 'white',
    },
    otherMessageText: {
        color: '#333',
    },
    messageTime: {
        fontSize: 10,
        color: '#BBB',
        marginHorizontal: 8,
        fontWeight: '600',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F0F3F8',
    },
    attachBtn: {
        padding: 6,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F9FC',
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginLeft: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        color: '#1A1A1A',
        paddingVertical: 8,
        maxHeight: 100,
        fontWeight: '500',
    },
    sendBtn: {
        backgroundColor: '#4A90E2',
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendBtnDisabled: {
        backgroundColor: '#D1D9E6',
    },
});

export default ChatRoomScreen;
