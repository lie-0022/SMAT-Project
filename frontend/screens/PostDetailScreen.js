import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_COMMENTS = [
    { id: '1', author: '익명1', content: '저도 참여하고 싶어요!', time: '5분 전' },
    { id: '2', author: '익명2', content: '아직 모집 중인가요?', time: '2분 전' },
];

const PostDetailScreen = ({ route, navigation }) => {
    const { post, category } = route.params;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(MOCK_COMMENTS);

    const handleAddComment = () => {
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            author: '나(익명)',
            content: comment,
            time: '방금 전',
        };

        setComments([...comments, newComment]);
        setComment('');
    };

    const renderComment = ({ item }) => (
        <View style={styles.commentItem}>
            <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{item.author}</Text>
                <Text style={styles.commentTime}>{item.time}</Text>
            </View>
            <Text style={styles.commentContent}>{item.content}</Text>
        </View>
    );

    const isDone = post.status === '완료' || post.status === '판매완료';

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>게시글 상세</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={22} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Post Content */}
                <View style={styles.postCard}>
                    <View style={styles.postMeta}>
                        <View style={styles.authorRow}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={16} color="#4A90E2" />
                            </View>
                            <View>
                                <Text style={styles.authorName}>{post.author || post.seller}</Text>
                                <Text style={styles.postDate}>{post.time}</Text>
                            </View>
                        </View>
                        <View style={[styles.statusBadge, isDone ? styles.statusBadgeDone : styles.statusBadgeActive]}>
                            <Text style={[styles.statusText, isDone ? styles.statusTextDone : styles.statusTextActive]}>{post.status}</Text>
                        </View>
                    </View>

                    <Text style={styles.postTitle}>{post.title}</Text>

                    {category === 'TAXI' && (
                        <View style={styles.taxiDetailCard}>
                            <View style={styles.taxiMainRow}>
                                <View style={styles.taxiPoint}>
                                    <Text style={styles.taxiLabel}>출발</Text>
                                    <Text style={styles.taxiValue}>{post.start}</Text>
                                </View>
                                <Ionicons name="arrow-forward" size={24} color="#4A90E2" style={{ marginHorizontal: 20 }} />
                                <View style={styles.taxiPoint}>
                                    <Text style={styles.taxiLabel}>도착</Text>
                                    <Text style={styles.taxiValue}>{post.end}</Text>
                                </View>
                            </View>
                            <View style={styles.taxiSubInfo}>
                                <Ionicons name="people-outline" size={16} color="#666" />
                                <Text style={styles.taxiSubText}>현재 {post.current}명 / 총 {post.max}명</Text>
                            </View>
                        </View>
                    )}

                    {category === 'BOOK' && (
                        <View style={styles.bookPriceBox}>
                            <Text style={styles.bookPriceLabel}>판매 가격</Text>
                            <Text style={styles.bookPriceValue}>{post.price}</Text>
                        </View>
                    )}

                    {category === 'TEAM' && (
                        <View style={styles.teamRoleBox}>
                            <Text style={styles.teamRoleLabel}>모집 역할</Text>
                            <Text style={styles.teamRoleValue}>{post.role}</Text>
                        </View>
                    )}

                    <Text style={styles.postDescription}>
                        {post.content || "상세 내용이 없습니다."}
                    </Text>

                    <View style={styles.postStats}>
                        <View style={styles.statItem}>
                            <Ionicons name="heart-outline" size={18} color="#999" />
                            <Text style={styles.statText}>0</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="chatbubble-outline" size={18} color="#999" />
                            <Text style={styles.statText}>{MOCK_COMMENTS.length}</Text>
                        </View>
                    </View>
                </View>

                {/* Comments Section */}
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsTitle}>댓글 {comments.length}</Text>
                    {comments.map(c => (
                        <View key={c.id} style={styles.commentWrapper}>
                            {renderComment({ item: c })}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Comment Input */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="익명으로 댓글 남기기..."
                        placeholderTextColor="#AAA"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, !comment.trim() && styles.sendBtnDisabled]}
                        onPress={handleAddComment}
                        disabled={!comment.trim()}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
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
    scrollContent: {
        paddingBottom: 40,
    },
    postCard: {
        backgroundColor: 'white',
        padding: 24,
        marginBottom: 12,
    },
    postMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    authorName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#333',
    },
    postDate: {
        fontSize: 12,
        color: '#BBB',
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadgeActive: {
        backgroundColor: '#E3F2FD',
    },
    statusBadgeDone: {
        backgroundColor: '#F5F5F5',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
    },
    statusTextActive: {
        color: '#4A90E2',
    },
    statusTextDone: {
        color: '#BBB',
    },
    postTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 20,
        lineHeight: 30,
    },
    taxiDetailCard: {
        backgroundColor: '#F8FAFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    taxiMainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    taxiPoint: {
        alignItems: 'center',
        flex: 1,
    },
    taxiLabel: {
        fontSize: 11,
        color: '#999',
        fontWeight: '600',
        marginBottom: 4,
    },
    taxiValue: {
        fontSize: 17,
        fontWeight: '800',
        color: '#333',
    },
    taxiSubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#EEF2F8',
    },
    taxiSubText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
        marginLeft: 6,
    },
    bookPriceBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    bookPriceLabel: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: '700',
    },
    bookPriceValue: {
        fontSize: 18,
        color: '#4A90E2',
        fontWeight: '900',
    },
    teamRoleBox: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    teamRoleLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '700',
        marginBottom: 4,
    },
    teamRoleValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '800',
    },
    postDescription: {
        fontSize: 16,
        color: '#444',
        lineHeight: 26,
        marginBottom: 24,
        fontWeight: '500',
    },
    postStats: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F8FAFF',
        paddingTop: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    statText: {
        fontSize: 13,
        color: '#999',
        fontWeight: '600',
        marginLeft: 6,
    },
    commentsContainer: {
        backgroundColor: 'white',
        padding: 24,
        marginTop: 12,
    },
    commentsTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 20,
    },
    commentWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFF',
        paddingBottom: 16,
        marginBottom: 16,
    },
    commentItem: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: '700',
        color: '#444',
    },
    commentTime: {
        fontSize: 11,
        color: '#BBB',
    },
    commentContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontWeight: '500',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F0F3F8',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        maxHeight: 100,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    sendBtnDisabled: {
        backgroundColor: '#D1E5FF',
    },
});

export default PostDetailScreen;
