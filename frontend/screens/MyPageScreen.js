import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Switch, TouchableWithoutFeedback, TextInput, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/contexts/AuthContext';

const MyPageScreen = () => {
    const [pushEnabled, setPushEnabled] = useState(true);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const [userProfile, setUserProfile] = useState({
        name: '김백석',
        major: '소프트웨어학과',
        studentId: '20231234',
    });

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        major: '',
        studentId: '',
    });

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        setLogoutModalVisible(false);
    };

    const handleEditOpen = () => {
        setEditForm(userProfile);
        setEditModalVisible(true);
    };

    const handleEditSave = () => {
        setUserProfile(editForm);
        setEditModalVisible(false);
    };

    const renderMenuItem = (item, index, total) => (
        <TouchableOpacity
            key={item.id}
            style={[
                styles.menuItem,
                index === total - 1 && { borderBottomWidth: 0 }
            ]}
            onPress={
                item.type === 'action' ? item.action :
                    item.type === 'link' ? () => Alert.alert('알림', '준비 중인 기능입니다.') : null
            }
            disabled={item.type === 'toggle'}
            activeOpacity={0.6}
        >
            <View style={styles.menuLeft}>
                <View style={[styles.iconBox, { backgroundColor: item.color ? '#FFEBEE' : '#F4F7FF' }]}>
                    <Ionicons name={item.icon} size={20} color={item.color || '#4A90E2'} />
                </View>
                <Text style={[styles.menuText, item.color && { color: item.color, fontWeight: '700' }]}>
                    {item.title}
                </Text>
            </View>

            {item.type === 'link' && (
                <Ionicons name="chevron-forward" size={18} color="#CCC" />
            )}
            {item.type === 'toggle' && (
                <Switch
                    trackColor={{ false: "#E0E0E0", true: "#4A90E2" }}
                    thumbColor="white"
                    onValueChange={item.onValueChange}
                    value={item.value}
                />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>마이페이지</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={42} color="#D1D9E6" />
                            </View>
                            <TouchableOpacity style={styles.editBadge} onPress={handleEditOpen}>
                                <Ionicons name="pencil" size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileMain}>
                            <Text style={styles.userNameText}>{userProfile.name}</Text>
                            <View style={styles.majorRow}>
                                <Text style={styles.majorText}>{userProfile.major}</Text>
                                <View style={styles.vDivider} />
                                <Text style={styles.idText}>{userProfile.studentId}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.profileStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>내 글</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>4</Text>
                            <Text style={styles.statLabel}>스크랩</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>28</Text>
                            <Text style={styles.statLabel}>내 댓글</Text>
                        </View>
                    </View>
                </View>

                {/* Account Section */}
                <Text style={styles.sectionLabel}>계정 설정</Text>
                <View style={styles.menuGroup}>
                    {[
                        { id: '1', title: '내 정보 수정', icon: 'person-outline', type: 'link' },
                        { id: '2', title: '비밀번호 변경', icon: 'lock-closed-outline', type: 'link' },
                    ].map((item, i, arr) => renderMenuItem(item, i, arr.length))}
                </View>

                {/* Activity Section */}
                <Text style={styles.sectionLabel}>나의 활동</Text>
                <View style={styles.menuGroup}>
                    {[
                        { id: '3', title: '내가 쓴 글', icon: 'document-text-outline', type: 'link' },
                        { id: '4', title: '스크랩한 게시물', icon: 'bookmark-outline', type: 'link' },
                        { id: '5', title: '알림 내역', icon: 'notifications-outline', type: 'link' },
                    ].map((item, i, arr) => renderMenuItem(item, i, arr.length))}
                </View>

                {/* App Settings Section */}
                <Text style={styles.sectionLabel}>앱 관리</Text>
                <View style={styles.menuGroup}>
                    {[
                        { id: '6', title: '푸시 알림 설정', icon: 'notifications-circle-outline', type: 'toggle', value: pushEnabled, onValueChange: setPushEnabled },
                        { id: '7', title: '다크 모드', icon: 'moon-outline', type: 'toggle', value: false, onValueChange: () => { } },
                        { id: '8', title: '앱 버전', icon: 'information-circle-outline', type: 'link' },
                    ].map((item, i, arr) => renderMenuItem(item, i, arr.length))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutBtn} onPress={() => setLogoutModalVisible(true)}>
                    <Ionicons name="log-out-outline" size={20} color="#FF5252" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutBtnText}>로그아웃</Text>
                </TouchableOpacity>

                <Text style={styles.footerInfo}>v1.0.4 | SMAT 개발팀</Text>
            </ScrollView>

            {/* Modals consistent with CommunityScreen */}
            <Modal animationType="slide" transparent={true} visible={editModalVisible} onRequestClose={() => setEditModalVisible(false)}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContentWide}>
                            <View style={styles.modalBar} />
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>정보 수정</Text>
                                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                    <Ionicons name="close-circle" size={28} color="#EEE" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>성함</Text>
                                <TextInput style={styles.input} value={editForm.name} onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))} placeholder="이름 입력" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>학과</Text>
                                <TextInput style={styles.input} value={editForm.major} onChangeText={(text) => setEditForm(prev => ({ ...prev, major: text }))} placeholder="학과 입력" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>학번</Text>
                                <TextInput style={styles.input} value={editForm.studentId} onChangeText={(text) => setEditForm(prev => ({ ...prev, studentId: text }))} keyboardType="numeric" placeholder="학번 8자리" />
                            </View>

                            <TouchableOpacity style={styles.saveBtn} onPress={handleEditSave}>
                                <Text style={styles.saveBtnText}>저장하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal animationType="fade" transparent={true} visible={logoutModalVisible} onRequestClose={() => setLogoutModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setLogoutModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.smallModalContent}>
                                <View style={styles.warningIcon}>
                                    <Ionicons name="alert-circle" size={40} color="#FF5252" />
                                </View>
                                <Text style={styles.smallModalTitle}>로그아웃 하시겠습니까?</Text>
                                <Text style={styles.smallModalDesc}>안전하게 로그인 정보가 해제됩니다.</Text>
                                <View style={styles.modalBtnRow}>
                                    <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setLogoutModalVisible(false)}>
                                        <Text style={styles.cancelBtnText}>취소</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalBtn, styles.logoutConfirmBtn]} onPress={handleLogout}>
                                        <Text style={styles.logoutConfirmBtnText}>로그아웃</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFF' },
    header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },
    scrollContent: { padding: 24, paddingTop: 8 },
    profileCard: {
        backgroundColor: '#FFF',
        borderRadius: 32,
        padding: 24,
        marginBottom: 32,
        shadowColor: '#4A90E2', shadowOpacity: 0.1, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 4
    },
    profileTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    avatarWrapper: { position: 'relative' },
    avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#F8F9FB', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F0F3F8' },
    editBadge: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: '#4A90E2', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
    profileMain: { marginLeft: 20 },
    userNameText: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: 6 },
    majorRow: { flexDirection: 'row', alignItems: 'center' },
    majorText: { fontSize: 13, color: '#666', fontWeight: '600' },
    vDivider: { width: 1, height: 10, backgroundColor: '#DDD', marginHorizontal: 8 },
    idText: { fontSize: 13, color: '#999', fontWeight: '500' },
    profileStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#F8F9FB' },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 2 },
    statLabel: { fontSize: 12, color: '#999', fontWeight: '600' },
    statDivider: { width: 1, height: 24, backgroundColor: '#F0F3F8' },
    sectionLabel: { fontSize: 14, fontWeight: '800', color: '#4A90E2', marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
    menuGroup: { backgroundColor: '#FFF', borderRadius: 24, padding: 8, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
    menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFF' },
    menuLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    menuText: { fontSize: 16, fontWeight: '600', color: '#333' },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, backgroundColor: '#FFF', borderRadius: 24, marginTop: 8, borderWidth: 1, borderColor: '#FFEBEE' },
    logoutBtnText: { fontSize: 16, fontWeight: '800', color: '#FF5252' },
    footerInfo: { textAlign: 'center', marginTop: 32, color: '#CCC', fontSize: 12, fontWeight: '500', marginBottom: 40 },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    modalContentWide: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, paddingTop: 8, minHeight: '60%', width: '100%', position: 'absolute', bottom: 0 },
    modalBar: { width: 40, height: 4, backgroundColor: '#EEE', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
    modalTitle: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
    inputGroup: { marginBottom: 24 },
    inputLabel: { fontSize: 14, fontWeight: '800', color: '#666', marginBottom: 12, marginLeft: 4 },
    input: { backgroundColor: '#F7F9FC', borderRadius: 16, padding: 16, fontSize: 16, color: '#1A1A1A', fontWeight: '600' },
    saveBtn: { backgroundColor: '#4A90E2', borderRadius: 20, paddingVertical: 18, alignItems: 'center', marginTop: 20, shadowColor: '#4A90E2', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    saveBtnText: { color: 'white', fontSize: 17, fontWeight: '800' },

    smallModalContent: { width: '85%', backgroundColor: '#FFF', borderRadius: 32, padding: 32, alignItems: 'center' },
    warningIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    smallModalTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 8, textAlign: 'center' },
    smallModalDesc: { fontSize: 14, color: '#888', fontWeight: '500', marginBottom: 32, textAlign: 'center' },
    modalBtnRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
    modalBtn: { flex: 1, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
    cancelBtn: { backgroundColor: '#F5F7FA', marginRight: 10 },
    logoutConfirmBtn: { backgroundColor: '#FF5252', marginLeft: 10 },
    cancelBtnText: { color: '#666', fontWeight: '700', fontSize: 16 },
    logoutConfirmBtnText: { color: 'white', fontWeight: '800', fontSize: 16 }
});

export default MyPageScreen;
