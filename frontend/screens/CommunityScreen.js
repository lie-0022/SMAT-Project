import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: 'TAXI', name: '택시합승', icon: 'car-outline' },
    { id: 'BOOK', name: '중고책', icon: 'book-outline' },
    { id: 'TEAM', name: '팀원모집', icon: 'people-outline' },
];

const INITIAL_POSTS = {
    TAXI: [
        { id: '1', title: '천안역 4명 모집 (2/4)', start: '천안역', end: '학교', time: '10분 전', author: '익명', status: '모집중', current: 2, max: 4 },
        { id: '2', title: '터미널 가실 분 구해요', start: '학교', end: '터미널', time: '30분 전', author: '익명', status: '완료', current: 4, max: 4 },
    ],
    BOOK: [
        { id: '1', title: '쉽게 배우는 자바 팝니다', price: '15,000원', seller: '컴공학생', time: '1시간 전', status: '판매중' },
        { id: '2', title: '운영체제 공룡책 팝니다', price: '20,000원', seller: '공학도', time: '어제', status: '판매완료' },
    ],
    TEAM: [
        { id: '1', title: '공모전 백엔드 구합니다', role: '백엔드 개발자', content: '스프링부트 가능하신 분...', author: '팀장', time: '2시간 전', status: '모집중' },
        { id: '2', title: '캡스톤 디자인 프론트엔드', role: '프론트엔드 개발자', content: '리액트 네이티브 하실 분', author: '개발자', time: '3시간 전', status: '모집중' },
    ],
};

const CommunityScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('TAXI');
    const [posts, setPosts] = useState(INITIAL_POSTS);

    const [writeModalVisible, setWriteModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writeCategory, setWriteCategory] = useState('TAXI');

    const handleWriteButton = () => {
        setWriteCategory(selectedCategory);
        setTitle('');
        setContent('');
        setWriteModalVisible(true);
    };

    const handleSubmitPost = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
            return;
        }

        const newPost = {
            id: Date.now().toString(),
            title: title,
            time: '방금 전',
            author: '나',
            status: writeCategory === 'BOOK' ? '판매중' : '모집중',
            ...(writeCategory === 'TAXI' ? { start: '미정', end: '미정', current: 1, max: 4 } : {}),
            ...(writeCategory === 'BOOK' ? { price: '가격협의', seller: '나' } : {}),
            ...(writeCategory === 'TEAM' ? { role: '역할무관', content: content } : {}),
        };

        setPosts(prev => ({
            ...prev,
            [writeCategory]: [newPost, ...prev[writeCategory]]
        }));

        setWriteModalVisible(false);
    };

    const renderPostItem = ({ item }) => {
        const isDone = item.status === '완료' || item.status === '판매완료';

        return (
            <TouchableOpacity style={[styles.card, isDone && styles.cardDone]} activeOpacity={0.8}>
                <View style={styles.cardHeader}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.postTitle, isDone && styles.postTitleDone]} numberOfLines={1}>{item.title}</Text>
                        {isDone && <View style={styles.doneBadge}><Text style={styles.doneBadgeText}>마감</Text></View>}
                    </View>
                    <Text style={styles.postTime}>{item.time}</Text>
                </View>

                <View style={styles.cardContent}>
                    {selectedCategory === 'TAXI' && (
                        <View style={styles.taxiRoute}>
                            <Ionicons name="location-outline" size={14} color="#666" />
                            <Text style={styles.detailText}>{item.start} → {item.end}</Text>
                        </View>
                    )}
                    {selectedCategory === 'BOOK' && (
                        <Text style={styles.priceText}>{item.price}</Text>
                    )}
                    {selectedCategory === 'TEAM' && (
                        <View style={styles.roleBox}>
                            <Text style={styles.roleText}>{item.role}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.authorRow}>
                        <View style={styles.authorAvatar}>
                            <Ionicons name="person" size={10} color="#AAA" />
                        </View>
                        <Text style={styles.author}>{item.author || item.seller}</Text>
                    </View>

                    <View style={[
                        styles.statusBadge,
                        isDone ? styles.statusBadgeDone : styles.statusBadgeActive
                    ]}>
                        <Text style={[
                            styles.statusText,
                            isDone ? styles.statusTextDone : styles.statusTextActive
                        ]}>
                            {item.status}
                            {selectedCategory === 'TAXI' && item.status === '모집중' && ` (${item.current}/${item.max})`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>커뮤니티</Text>
                <TouchableOpacity style={styles.chatIcon} onPress={() => navigation.navigate('ChatList')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={26} color="#333" />
                    <View style={styles.dot} />
                </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <View style={styles.categoryOuter}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <TouchableOpacity
                                key={cat.id}
                                style={[styles.categoryButton, isActive && styles.activeCategory]}
                                onPress={() => setSelectedCategory(cat.id)}
                                activeOpacity={0.7}
                            >
                                <Ionicons name={cat.icon} size={16} color={isActive ? 'white' : '#666'} style={{ marginRight: 6 }} />
                                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <FlatList
                data={posts[selectedCategory]}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={48} color="#EEE" />
                        <Text style={styles.emptyText}>게시글이 비어있습니다.</Text>
                    </View>
                }
            />

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={handleWriteButton} activeOpacity={0.9}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>

            {/* Write Post Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={writeModalVisible}
                onRequestClose={() => setWriteModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalBar} />
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>새 글 작성</Text>
                                <TouchableOpacity onPress={() => setWriteModalVisible(false)}>
                                    <Ionicons name="close-circle" size={28} color="#EEE" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalCategoryRow}>
                                {CATEGORIES.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[styles.modalCategoryBtn, writeCategory === cat.id && styles.modalCategoryBtnActive]}
                                        onPress={() => setWriteCategory(cat.id)}
                                    >
                                        <Text style={[styles.modalCategoryText, writeCategory === cat.id && styles.modalCategoryTextActive]}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TextInput
                                style={styles.inputTitle}
                                placeholder="제목"
                                placeholderTextColor="#AAA"
                                value={title}
                                onChangeText={setTitle}
                            />

                            <TextInput
                                style={styles.inputContent}
                                placeholder="어떤 이야기를 나누고 싶나요? (내용 입력)"
                                placeholderTextColor="#AAA"
                                value={content}
                                onChangeText={setContent}
                                multiline
                                textAlignVertical="top"
                            />

                            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitPost} activeOpacity={0.8}>
                                <Text style={styles.submitBtnText}>등록하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    chatIcon: {
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF5252',
        borderWidth: 1.5,
        borderColor: '#F8FAFF',
    },
    categoryOuter: {
        marginBottom: 8,
    },
    categoryContainer: {
        paddingHorizontal: 24,
        paddingBottom: 12,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 22,
        backgroundColor: 'white',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    activeCategory: {
        backgroundColor: '#4A90E2',
    },
    categoryText: {
        color: '#666',
        fontWeight: '700',
        fontSize: 14,
    },
    activeCategoryText: {
        color: 'white',
    },
    listContainer: {
        padding: 24,
        paddingTop: 8,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 3,
    },
    cardDone: {
        backgroundColor: '#FAFAFA',
        opacity: 0.8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1A1A1A',
        marginRight: 8,
    },
    postTitleDone: {
        color: '#AAA',
        textDecorationLine: 'line-through',
    },
    doneBadge: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    doneBadgeText: {
        fontSize: 10,
        color: '#999',
        fontWeight: '700',
    },
    postTime: {
        fontSize: 12,
        color: '#BBB',
        fontWeight: '500',
    },
    cardContent: {
        marginBottom: 20,
    },
    taxiRoute: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
        marginLeft: 6,
    },
    priceText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#4A90E2',
    },
    roleBox: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0F8FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    roleText: {
        fontSize: 13,
        color: '#4A90E2',
        fontWeight: '700',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F8FAFF',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorAvatar: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    author: {
        fontSize: 14,
        color: '#888',
        fontWeight: '600',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    statusBadgeActive: {
        backgroundColor: '#E3F2FD',
    },
    statusBadgeDone: {
        backgroundColor: '#F5F5F5',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '800',
    },
    statusTextActive: {
        color: '#1E88E5',
    },
    statusTextDone: {
        color: '#BBB',
    },
    fab: {
        position: 'absolute',
        right: 28,
        bottom: 28,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        marginTop: 12,
        color: '#BBB',
        fontSize: 15,
        fontWeight: '500',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 32,
        paddingTop: 8,
        minHeight: '65%',
    },
    modalBar: {
        width: 40,
        height: 4,
        backgroundColor: '#EEE',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    modalCategoryRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    modalCategoryBtn: {
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#F7F9FC',
    },
    modalCategoryBtnActive: {
        backgroundColor: '#E3F2FD',
    },
    modalCategoryText: {
        color: '#888',
        fontWeight: '700',
        fontSize: 14,
    },
    modalCategoryTextActive: {
        color: '#4A90E2',
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1A1A1A',
        borderBottomWidth: 1.5,
        borderBottomColor: '#F0F3F8',
        paddingVertical: 14,
        marginBottom: 20,
    },
    inputContent: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        minHeight: 180,
        marginBottom: 24,
        lineHeight: 24,
    },
    submitBtn: {
        backgroundColor: '#4A90E2',
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '800',
    },
});

export default CommunityScreen;
