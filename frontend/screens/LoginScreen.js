import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/contexts/AuthContext';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
    const { login } = useAuth();
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);

    const handleLogin = () => {
        if (!studentId || !password) {
            Alert.alert('알림', '학번과 비밀번호를 입력해주세요.');
            return;
        }
        login('mock-user-token', autoLogin);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.content}
            >
                <View style={styles.logoArea}>
                    <View style={styles.logoIconBg}>
                        <Ionicons name="school" size={56} color="#4A90E2" />
                    </View>
                    <Text style={styles.logoTitle}>SMAT</Text>
                    <Text style={styles.logoSubText}>백석대학교 스마트 캠퍼스</Text>
                </View>

                <View style={styles.formArea}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="학번 (8자리)"
                            placeholderTextColor="#AAA"
                            value={studentId}
                            onChangeText={setStudentId}
                            keyboardType="numeric"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="비밀번호"
                            placeholderTextColor="#AAA"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setAutoLogin(!autoLogin)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, autoLogin && styles.checkboxActive]}>
                            {autoLogin && <Ionicons name="checkmark" size={12} color="white" />}
                        </View>
                        <Text style={styles.checkboxLabel}>자동 로그인 유지</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
                        <Text style={styles.loginBtnText}>로그인하기</Text>
                    </TouchableOpacity>

                    <View style={styles.footerLinks}>
                        <TouchableOpacity><Text style={styles.link}>학번 찾기</Text></TouchableOpacity>
                        <View style={styles.dot} />
                        <TouchableOpacity><Text style={styles.link}>비밀번호 초기화</Text></TouchableOpacity>
                        <View style={styles.dot} />
                        <TouchableOpacity><Text style={styles.link}>회원가입</Text></TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.copyText}>© 2025 SMAT Team. All rights reserved.</Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
    logoArea: {
        alignItems: 'center',
        marginBottom: height * 0.08,
    },
    logoIconBg: {
        width: 100,
        height: 100,
        borderRadius: 32,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#4A90E2',
        shadowOpacity: 0.15,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },
    logoTitle: {
        fontSize: 36,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 1.5,
    },
    logoSubText: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600',
        marginTop: 6,
    },
    formArea: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '600',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        marginLeft: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#D1D9E6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxActive: {
        backgroundColor: '#4A90E2',
        borderColor: '#4A90E2',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    loginBtn: {
        backgroundColor: '#4A90E2',
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    loginBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    link: {
        fontSize: 13,
        color: '#AAA',
        fontWeight: '600',
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#DDD',
        marginHorizontal: 12,
    },
    copyText: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        fontSize: 11,
        color: '#CCC',
        fontWeight: '500',
    }
});

export default LoginScreen;
