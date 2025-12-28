import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../src/contexts/AuthContext';

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
        // Mock Login Logic
        login('mock-user-token', autoLogin);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.content}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="school" size={60} color="white" />
                    </View>
                    <Text style={styles.logoText}>SMAT</Text>
                    <Text style={styles.subText}>스마트한 학교 생활의 시작</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="학번"
                            value={studentId}
                            onChangeText={setStudentId}
                            keyboardType="numeric"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.autoLoginRow}
                        onPress={() => setAutoLogin(!autoLogin)}
                    >
                        <Ionicons
                            name={autoLogin ? "checkbox" : "square-outline"}
                            size={20}
                            color={autoLogin ? "#4A90E2" : "#999"}
                        />
                        <Text style={styles.autoLoginText}>자동 로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>로그인</Text>
                    </TouchableOpacity>

                    <View style={styles.linkContainer}>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>아이디 찾기</Text>
                        </TouchableOpacity>
                        <Text style={styles.linkDivider}>|</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>비밀번호 찾기</Text>
                        </TouchableOpacity>
                        <Text style={styles.linkDivider}>|</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>회원가입</Text>
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
        backgroundColor: '#4A90E2', // Primary Brand Color Background
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 2,
    },
    subText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 8,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 20,
        paddingBottom: 8,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 4,
    },
    autoLoginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    autoLoginText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: '#999',
        fontSize: 13,
    },
    linkDivider: {
        color: '#DDD',
        marginHorizontal: 10,
    },
});

export default LoginScreen;
