import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, Linking, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import client from '../src/api/client';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [healthStatus, setHealthStatus] = useState({ isError: false, isLoading: true });
  const [lunchMenu, setLunchMenu] = useState(null);
  const [nextClass, setNextClass] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);

  // Synchronized Mock Data
  const MOCK_LUNCH_ITEM = {
    menuName: '눈꽃치즈돈까스',
    price: '6,500원',
    isSoldOut: true,
    place: '학생식당'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, menuRes, nextClassRes, recentPostsRes] = await Promise.allSettled([
          client.get('/api/health'),
          client.get('/api/campus/menus'),
          client.get('/api/schedule/next'),
          client.get('/api/community/recent')
        ]);

        if (healthRes.status === 'fulfilled') {
          setHealthStatus({ isError: false, isLoading: false });
        } else {
          setHealthStatus({ isError: true, isLoading: false });
        }

        if (menuRes.status === 'fulfilled') {
          const lunch = menuRes.value.data.find(item => item.timeType === '중식');
          setLunchMenu(lunch || MOCK_LUNCH_ITEM);
        } else {
          setLunchMenu(MOCK_LUNCH_ITEM);
        }

        if (nextClassRes.status === 'fulfilled' && nextClassRes.value.data) {
          const data = nextClassRes.value.data;
          const [start, end] = data.time ? data.time.split('-') : ["", ""];
          setNextClass({
            className: data.name,
            place: data.room,
            startTime: start,
            endTime: end
          });
        } else {
          setNextClass({ className: '자료구조', place: '공학관 301호', startTime: '10:00', endTime: '12:00' });
        }

        if (recentPostsRes.status === 'fulfilled') {
          setRecentPosts(recentPostsRes.value.data || []);
        } else {
          setRecentPosts([
            { id: '1', title: '2025학년도 1학기 국가장학금 신청 안내' },
            { id: '2', title: '동계 계절수업 수강신청 일정 공지' }
          ]);
        }

      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  const currentDate = "11월 29일 금요일";
  const userName = "백석";

  const weatherData = {
    location: "천안시 안서동",
    condition: "맑음",
    temp: "12°C",
    message: "오늘 쌀쌀해요, 겉옷 챙기세요!",
  };

  const quickActions = [
    { id: 1, title: '셔틀버스', icon: 'bus', color: '#4A90E2', action: 'shuttle' },
    { id: 2, title: '도서관', icon: 'library', color: '#66BB6A', action: 'library' },
    { id: 3, title: '학부공지', icon: 'megaphone', color: '#FFA726', action: 'deptNotice' },
    { id: 4, title: '교내전화', icon: 'call', color: '#EF5350', action: 'phone' },
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case 'shuttle': navigation.navigate('SchoolLife'); break;
      case 'library': Linking.openURL('https://lib.bu.ac.kr/m'); break;
      case 'deptNotice': Linking.openURL('https://www.bu.ac.kr/cse/index.do'); break;
      case 'phone': setPhoneModalVisible(true); break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>안녕하세요, {userName}님! 👋</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
          <View style={styles.headerIcons}>
            <View style={[styles.healthDot, { backgroundColor: healthStatus.isError ? '#FF5252' : '#4CAF50' }]} />
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherInfo}>
            <View>
              <Text style={styles.weatherLocationText}>{weatherData.location}</Text>
              <View style={styles.tempRow}>
                <Text style={styles.tempText}>{weatherData.temp}</Text>
                <Text style={styles.conditionText}>{weatherData.condition}</Text>
              </View>
            </View>
            <Ionicons name="sunny" size={48} color="#FFB300" />
          </View>
          <View style={styles.weatherDivider} />
          <Text style={styles.weatherMessageText}>{weatherData.message}</Text>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.gridContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.gridItem} onPress={() => handleQuickAction(action.action)}>
              <View style={[styles.iconCircle, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon} size={26} color={action.color} />
              </View>
              <Text style={styles.gridLabel}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Coming Up Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘의 일정</Text>
        </View>
        <TouchableOpacity
          style={[styles.mainCard, styles.nextClassCard]}
          onPress={() => navigation.navigate('SchoolLife')}
        >
          <View style={styles.cardTag}>
            <Text style={styles.tagText}>다음 수업</Text>
          </View>
          {nextClass ? (
            <View>
              <Text style={styles.classNameText}>{nextClass.className}</Text>
              <View style={styles.classInfoRow}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.classDetailText}>{nextClass.startTime} - {nextClass.endTime}</Text>
                <Ionicons name="location-outline" size={16} color="#666" style={{ marginLeft: 12 }} />
                <Text style={styles.classDetailText}>{nextClass.place}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyClassText}>오늘 남은 수업이 없습니다. 🎉</Text>
          )}
        </TouchableOpacity>

        {/* Today's Pick (Cafeteria) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>학식 추천</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SchoolLife')}>
            <Text style={styles.seeMore}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainCard}>
          <View style={styles.menuTop}>
            <Text style={styles.menuTitleText}>{lunchMenu?.menuName || '메뉴 정보 없음'}</Text>
            {lunchMenu?.isSoldOut && (
              <View style={styles.soldOutBadge}>
                <Text style={styles.soldOutText}>품절</Text>
              </View>
            )}
          </View>
          <View style={styles.menuFooter}>
            <Text style={styles.menuPlaceText}>📍 {lunchMenu?.place || '학생식당'}</Text>
            <Text style={styles.menuPriceText}>{lunchMenu?.price || '가격미정'}</Text>
          </View>
        </View>

        {/* Recent Announcements */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>공지사항</Text>
        </View>
        <View style={styles.mainCard}>
          {recentPosts.map((post, idx) => (
            <TouchableOpacity key={post.id} style={[styles.postItem, idx === recentPosts.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.postTitleText} numberOfLines={1}>{post.title}</Text>
              <Ionicons name="chevron-forward" size={14} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Phone Modal */}
      <Modal animationType="fade" transparent visible={phoneModalVisible} onRequestClose={() => setPhoneModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setPhoneModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>교내 주요 연락처</Text>
                {[
                  { name: '컴공학부 사무실', num: '041-550-9114' },
                  { name: '학생처', num: '041-550-1234' },
                  { name: '기숙사 관리실', num: '041-550-5678' }
                ].map((item, i) => (
                  <TouchableOpacity key={i} style={styles.modalItem} onPress={() => Linking.openURL(`tel:${item.num}`)}>
                    <Text style={styles.modalItemName}>{item.name}</Text>
                    <Text style={styles.modalItemNum}>{item.num}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.closeBtn} onPress={() => setPhoneModalVisible(false)}>
                  <Text style={styles.closeBtnText}>닫기</Text>
                </TouchableOpacity>
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
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: 4 },
  dateText: { fontSize: 14, color: '#666', fontWeight: '500' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  healthDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  weatherCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#4A90E2', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4
  },
  weatherInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weatherLocationText: { fontSize: 14, color: '#666', fontWeight: '600', marginBottom: 4 },
  tempRow: { flexDirection: 'row', alignItems: 'baseline' },
  tempText: { fontSize: 32, fontWeight: '800', color: '#1A1A1A', marginRight: 8 },
  conditionText: { fontSize: 16, color: '#333', fontWeight: '600' },
  weatherDivider: { height: 1, backgroundColor: '#F0F3F8', marginVertical: 16 },
  weatherMessageText: { fontSize: 14, color: '#4A90E2', fontWeight: '600' },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  gridItem: { alignItems: 'center', width: (width - 40) / 4 - 10 },
  iconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridLabel: { fontSize: 12, fontWeight: '700', color: '#444' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  seeMore: { fontSize: 13, color: '#4A90E2', fontWeight: '700' },
  mainCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  nextClassCard: { backgroundColor: '#EBF4FF', borderWidth: 1, borderColor: '#D1E5FF' },
  cardTag: { backgroundColor: '#4A90E2', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  tagText: { color: '#FFF', fontSize: 11, fontWeight: '800' },
  classNameText: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 8 },
  classInfoRow: { flexDirection: 'row', alignItems: 'center' },
  classDetailText: { fontSize: 13, color: '#555', fontWeight: '600', marginLeft: 4 },
  emptyClassText: { fontSize: 16, fontWeight: '700', color: '#4A90E2', textAlign: 'center' },
  menuTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  menuTitleText: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  soldOutBadge: { backgroundColor: '#FF5252', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  soldOutText: { color: '#FFF', fontSize: 11, fontWeight: '800' },
  menuFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuPlaceText: { fontSize: 13, color: '#666', fontWeight: '600' },
  menuPriceText: { fontSize: 16, fontWeight: '800', color: '#4A90E2' },
  postItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F3F8' },
  postTitleText: { fontSize: 14, color: '#333', fontWeight: '600', flex: 1, marginRight: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFF', borderRadius: 24, padding: 24, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 24 },
  modalItem: { width: '100%', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F3F8', alignItems: 'center' },
  modalItemName: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  modalItemNum: { fontSize: 14, color: '#4A90E2', fontWeight: '600' },
  closeBtn: { marginTop: 24, backgroundColor: '#F0F3F8', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 16 },
  closeBtnText: { fontSize: 15, fontWeight: '700', color: '#666' }
});

export default HomeScreen;
