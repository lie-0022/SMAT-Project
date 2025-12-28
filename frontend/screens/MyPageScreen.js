import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Switch, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MyPageScreen = () => {
    // State
    const [pushEnabled, setPushEnabled] = useState(true);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    // Mock Data
    const userProfile = {
        name: '김백석',
        major: '소프트웨어학과',
        studentId: '20231234',
    };

    const menuItems = [
        { id: '1', title: '내 정보 수정', icon: 'person-outline', type: 'link' },
        { id: '2', title: '내가 쓴 글', icon: 'document-text-outline', type: 'link' },
        { id: '3', title: '스크랩', icon: 'bookmark-outline', type: 'link' },
        { id: '4', title: '알림 설정', icon: 'notifications-outline', type: 'toggle', value: pushEnabled, onValueChange: setPushEnabled },
        { id: '5', title: '앱 설정', icon: 'settings-outline', type: 'link' },
        { id: '6', title: '로그아웃', icon: 'log-out-outline', color: '#FF5252', type: 'action', action: () => setLogoutModalVisible(true) },
    ];

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logged out");
        setLogoutModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>마이페이지</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Section */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color="#BDBDBD" />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{userProfile.name}</Text>
                        <Text style={styles.userMajor}>{userProfile.major}</Text>
                        <Text style={styles.userId}>{userProfile.studentId}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="pencil" size={16} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Menu List */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={item.type === 'action' ? item.action : null}
                            disabled={item.type === 'toggle'}
                        >
                            <View style={styles.menuLeft}>
                                <View style={[styles.iconBox, { backgroundColor: item.color ? '#FFEBEE' : '#E3F2FD' }]}>
                                    <Ionicons name={item.icon} size={20} color={item.color || '#4A90E2'} />
                                </View>
                                <Text style={[styles.menuText, item.color && { color: item.color, fontWeight: 'bold' }]}>
                                    {item.title}
                                </Text>
                            </View>

                            {item.type === 'link' && (
                                <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
                            )}
                            {item.type === 'toggle' && (
                                <Switch
                                    trackColor={{ false: "#767577", true: "#4A90E2" }}
                                    thumbColor={item.value ? "white" : "#f4f3f4"}
                                    onValueChange={item.onValueChange}
                                    value={item.value}
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={logoutModalVisible}
                onRequestClose={() => setLogoutModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setLogoutModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>로그아웃</Text>
                                <Text style={styles.modalMessage}>정말 로그아웃 하시겠습니까?</Text>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.cancelButton]}
                                        onPress={() => setLogoutModalVisible(false)}
                                    >
                                        <Text style={styles.cancelButtonText}>취소</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.logoutButton]}
                                        onPress={handleLogout}
                                    >
                                        <Text style={styles.logoutButtonText}>확인</Text>
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
    scrollContent: {
        padding: 20,
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    userMajor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    userId: {
        fontSize: 12,
        color: '#999',
    },
    editButton: {
        padding: 8,
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F5F5F5',
        marginRight: 8,
    },
    logoutButton: {
        backgroundColor: '#FF5252',
        marginLeft: 8,
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: '600',
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MyPageScreen;
