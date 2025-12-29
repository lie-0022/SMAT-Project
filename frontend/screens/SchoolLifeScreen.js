import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getTimetable, getMenus } from '../src/api/client';

// --- Mock Data ---
const MOCK_TIMETABLE = [
  { day: '월', time: '10:00-12:00', name: '자료구조', room: '공학관 301호', color: '#FFCDD2' },
  { day: '화', time: '13:00-14:30', name: '알고리즘', room: '공학관 201호', color: '#BBDEFB' },
  { day: '수', time: '09:00-11:00', name: '운영체제', room: '공학관 102호', color: '#C8E6C9' },
  { day: '목', time: '11:00-12:30', name: '데이터베이스', room: '창조관 404호', color: '#FFF9C4' },
  { day: '금', time: '14:00-17:00', name: '캡스톤디자인', room: '실습실', color: '#E1BEE7' },
];

const MOCK_MENUS = {
  date: '11월 29일 (금)',
  breakfast: [
    { id: 1, place: '학생식당', corner: '한식', menu: '소고기미역국 & 쌀밥', price: '4,000원', time: '08:00~09:30', isSoldOut: false },
    { id: 2, place: '기숙사식당', corner: '조식', menu: '토스트 & 시리얼', price: '3,500원', time: '07:30~09:00', isSoldOut: false },
  ],
  lunch: [
    { id: 3, place: '학생식당', corner: '일품', menu: '눈꽃치즈돈까스', price: '6,500원', time: '11:30~13:30', isSoldOut: true },
    { id: 4, place: '학생식당', corner: '양식', menu: '베이컨크림파스타', price: '5,500원', time: '11:30~13:30', isSoldOut: false },
    { id: 5, place: '교직원식당', corner: '특선', menu: '낙지돌솥비빔밥', price: '7,000원', time: '11:30~13:30', isSoldOut: false },
  ],
  dinner: [
    { id: 6, place: '기숙사식당', corner: '석식', menu: '치킨마요덮밥', price: '5,500원', time: '17:30~19:00', isSoldOut: false },
  ]
};

const MOCK_BUS_STOPS = [
  { id: 1, name: '터미널 (야우리)', time: '08:30' },
  { id: 2, name: '천안역 (서부광장)', time: '08:40' },
  { id: 3, name: '두정역', time: '08:50' },
  { id: 4, name: '안서동 (대학가)', time: '09:00' },
  { id: 5, name: '학교 정문', time: '09:10' },
];

const MOCK_EVENTS = [
  { id: 1, date: '10.03', title: '개천절 (휴무)' },
  { id: 2, date: '10.09', title: '한글날 (휴무)' },
  { id: 3, date: '10.20', title: '중간고사 시작' },
  { id: 4, date: '10.24', title: '중간고사 종료' },
  { id: 5, date: '10.31', title: '할로윈 행사' },
];

const { width } = Dimensions.get('window');

// --- Helper Functions ---
const WEEK_DAYS = ['월', '화', '수', '목', '금'];

const parseScheduleData = (item) => {
  if (!item.day || !item.time) return { dayIndex: -1, top: 0, height: 0 };

  const dayIndex = WEEK_DAYS.indexOf(item.day);
  const [startStr, endStr] = item.time.split('-');

  const parseTime = (str) => {
    const [h, m] = str.split(':').map(Number);
    return { h, m };
  };

  const start = parseTime(startStr);
  const end = parseTime(endStr);

  const top = (start.h - 9) * 60 + start.m;
  const durationMinutes = (end.h * 60 + end.m) - (start.h * 60 + start.m);
  const height = durationMinutes;

  return {
    dayIndex,
    top,
    height
  };
};

const toISODate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// --- Sub Components ---

const TimeTableView = () => {
  const [timetable, setTimetable] = useState(MOCK_TIMETABLE);

  const days = ['월', '화', '수', '목', '금'];
  const periods = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const ROW_HEIGHT = 60; // 1 hour = 60px

  const colWidth = (width - 90) / 5;

  return (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.timetableContainer}>
        <View style={styles.tableRow}>
          <View style={{ width: 30 }} />
          {days.map(day => (
            <View key={day} style={{ width: colWidth, alignItems: 'center' }}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 30 }}>
            {periods.map(p => (
              <View key={p} style={styles.periodCell}>
                <Text style={styles.periodText}>{p}</Text>
              </View>
            ))}
          </View>

          <View style={{ width: colWidth * 5, position: 'relative' }}>
            {periods.map((p, i) => (
              <View key={i} style={[styles.gridLine, { top: i * ROW_HEIGHT }]} />
            ))}

            {days.map((d, i) => (
              <View key={i} style={[styles.gridVLine, { left: i * colWidth }]} />
            ))}
            <View style={[styles.gridVLine, { left: 5 * colWidth }]} />

            {timetable.map((item, index) => {
              const parsed = parseScheduleData(item);
              if (parsed.dayIndex === -1) return null;

              const left = parsed.dayIndex * colWidth;

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={[
                    styles.classBlock,
                    {
                      left: left + 1,
                      top: parsed.top + 1,
                      height: parsed.height - 2,
                      width: colWidth - 2,
                      backgroundColor: item.color || '#E3F2FD'
                    }
                  ]}
                >
                  <Text style={styles.classTitle} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.classRoom} numberOfLines={1}>
                    {item.room}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const MenuView = () => {
  const menuData = MOCK_MENUS;

  const renderMenuSection = (title, items, icon) => (
    <View style={styles.menuSection}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color="#4A90E2" style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {items.map((item) => (
        <View key={item.id} style={[styles.menuCard, item.isSoldOut && styles.soldOutCard]}>
          <View style={styles.menuHeader}>
            <View style={styles.badgeRow}>
              <View style={[styles.placeBadge, { backgroundColor: item.place === '기숙사식당' ? '#FFF3E0' : '#E3F2FD' }]}>
                <Text style={[styles.badgeText, { color: item.place === '기숙사식당' ? '#EF6C00' : '#1E88E5' }]}>{item.place}</Text>
              </View>
              <View style={styles.cornerBadge}>
                <Text style={styles.cornerText}>{item.corner}</Text>
              </View>
            </View>
            <Text style={styles.menuTimeText}>{item.time}</Text>
          </View>

          <View style={styles.menuBody}>
            <Text style={[styles.menuName, item.isSoldOut && styles.soldOutText]}>{item.menu}</Text>
            {item.isSoldOut && (
              <View style={styles.soldOutBadge}>
                <Text style={styles.soldOutBadgeText}>품절</Text>
              </View>
            )}
          </View>

          <View style={styles.menuFooter}>
            <Text style={styles.menuPriceText}>{item.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.dateBanner}>
        <Text style={styles.dateBannerText}>{menuData.date}</Text>
      </View>

      {renderMenuSection('아침', menuData.breakfast, 'sunny-outline')}
      {renderMenuSection('점심', menuData.lunch, 'partly-sunny-outline')}
      {renderMenuSection('저녁', menuData.dinner, 'moon-outline')}
    </ScrollView>
  );
};

const BusView = () => {
  const [direction, setDirection] = useState('등교');
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 15 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}분 ${s < 10 ? '0' : ''}${s}초`;
  };

  return (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Direction Toggle */}
      <View style={styles.busToggleOuter}>
        <TouchableOpacity
          style={[styles.premiumToggleBtn, direction === '등교' && styles.premiumToggleActive]}
          onPress={() => setDirection('등교')}
        >
          <Text style={[styles.premiumToggleText, direction === '등교' && styles.premiumToggleTextActive]}>등교 셔틀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.premiumToggleBtn, direction === '하교' && styles.premiumToggleActive]}
          onPress={() => setDirection('하교')}
        >
          <Text style={[styles.premiumToggleText, direction === '하교' && styles.premiumToggleTextActive]}>하교 셔틀</Text>
        </TouchableOpacity>
      </View>

      {/* Countdown Card */}
      <View style={styles.timerCard}>
        <View style={styles.timerIconWrapper}>
          <Ionicons name="time" size={24} color="white" />
        </View>
        <View style={styles.timerContent}>
          <Text style={styles.timerLabel}>다음 버스 도착 예정</Text>
          <Text style={styles.timerValue}>{formatTime(timeLeft)}</Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn}>
          <Ionicons name="refresh" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Bus Route List */}
      <View style={styles.routeContainer}>
        {MOCK_BUS_STOPS.map((stop, index) => (
          <View key={stop.id} style={styles.busRouteItem}>
            <View style={styles.routeLeft}>
              <View style={[styles.routeDot, index === 0 && styles.routeDotStart]} />
              {index !== MOCK_BUS_STOPS.length - 1 && <View style={styles.routeLine} />}
            </View>
            <View style={styles.routeCard}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{stop.name}</Text>
                <Text style={styles.routeTime}>{stop.time} 출발</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#EEE" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const CalendarView = () => {
  return (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.calendarHeaderRow}>
        <Ionicons name="calendar" size={22} color="#4A90E2" />
        <Text style={styles.calendarMainTitle}>2025학년도 10월 주요 일정</Text>
      </View>

      {MOCK_EVENTS.map((event) => (
        <TouchableOpacity key={event.id} style={styles.premiumEventCard} activeOpacity={0.7}>
          <View style={styles.eventDateBadge}>
            <Text style={styles.eventDateText}>{event.date.split('.')[1]}</Text>
            <Text style={styles.eventMonthText}>{event.date.split('.')[0]}월</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.premiumEventTitle}>{event.title}</Text>
            <View style={styles.eventTypeRow}>
              <View style={styles.typeDot} />
              <Text style={styles.eventTypeText}>학사일정</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#EEE" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// --- Main Screen ---

const SchoolLifeScreen = () => {
  const [activeTab, setActiveTab] = useState('TimeTable');

  const renderContent = () => {
    switch (activeTab) {
      case 'TimeTable': return <TimeTableView />;
      case 'Menu': return <MenuView />;
      case 'Bus': return <BusView />;
      case 'Calendar': return <CalendarView />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>학교생활</Text>
      </View>

      <View style={styles.tabBar}>
        {['TimeTable', 'Menu', 'Bus', 'Calendar'].map((tab) => {
          const map = { TimeTable: '시간표', Menu: '식단', Bus: '셔틀', Calendar: '학사일정' };
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{map[tab]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.contentArea}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },

  // TimeTable Styles
  timetableContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    minHeight: 650,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  periodCell: {
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  periodText: {
    fontSize: 11,
    color: '#AAA',
    marginTop: -8,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  gridVLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  classBlock: {
    position: 'absolute',
    borderRadius: 6,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  classTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  classRoom: {
    fontSize: 8,
    color: '#666',
  },

  // Menu Styles
  dateBanner: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  dateBannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  soldOutCard: {
    backgroundColor: '#FAFAFA',
    opacity: 0.8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  placeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  cornerBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cornerText: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
  },
  menuTimeText: {
    color: '#AAA',
    fontSize: 12,
    fontWeight: '500',
  },
  menuBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  soldOutText: {
    color: '#AAA',
    textDecorationLine: 'line-through',
  },
  soldOutBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  soldOutBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  menuPriceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A90E2',
  },

  // Bus Styles
  busToggleOuter: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F8',
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
  },
  premiumToggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  premiumToggleActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  premiumToggleText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '700',
  },
  premiumToggleTextActive: {
    color: '#4A90E2',
  },
  timerCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  timerIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timerContent: {
    flex: 1,
  },
  timerLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  timerValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  refreshBtn: {
    padding: 8,
  },
  routeContainer: {
    paddingLeft: 10,
  },
  busRouteItem: {
    flexDirection: 'row',
    height: 80,
  },
  routeLeft: {
    width: 20,
    alignItems: 'center',
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: 'white',
    zIndex: 2,
    marginTop: 6,
  },
  routeDotStart: {
    backgroundColor: '#4A90E2',
  },
  routeLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E0E7FF',
    marginTop: -2,
  },
  routeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
    marginBottom: 2,
  },
  routeTime: {
    fontSize: 12,
    color: '#AAA',
    fontWeight: '600',
  },

  // Calendar Styles
  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginLeft: 4,
  },
  calendarMainTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  premiumEventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  eventDateBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#F4F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventDateText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4A90E2',
  },
  eventMonthText: {
    fontSize: 10,
    color: '#4A90E2',
    fontWeight: '700',
    marginTop: -2,
  },
  eventInfo: {
    flex: 1,
  },
  premiumEventTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
    marginRight: 6,
  },
  eventTypeText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  busStopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  busTime: {
    fontSize: 14,
    color: '#666',
  },

  // Calendar Styles
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  dateBox: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginRight: 16,
  },
  dateBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  eventTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default SchoolLifeScreen;
