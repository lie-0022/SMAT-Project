import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getTimetable, getMenus } from '../src/api/client';

// --- Mock Data (Bus & Calendar still mock) ---
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

  // 1. Parse Day
  const dayIndex = WEEK_DAYS.indexOf(item.day);

  // 2. Parse Time (e.g., "09:00-10:15")
  const [startStr, endStr] = item.time.split('-');

  const parseTime = (str) => {
    const [h, m] = str.split(':').map(Number);
    return { h, m };
  };

  const start = parseTime(startStr);
  const end = parseTime(endStr);

  // Calculation Logic:
  // Top: (StartHour - 9) * 60 + StartMinutes
  // Height: (DurationMinutes / 60) * 60 = DurationMinutes

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
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ['월', '화', '수', '목', '금'];
  // Change to hours 09:00 ~ 18:00
  const periods = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const ROW_HEIGHT = 60; // 1 hour = 60px

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      const data = await getTimetable();
      if (data && data.length > 0) {
        setTimetable(data);
      } else {
        setTimetable([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  // Correct calculation: Total width - Container Padding(40) - Inner Padding(20) - Time Column(30) = 90
  const colWidth = (width - 90) / 5;

  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.timetableContainer}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableHeaderCell} />
          {days.map(day => (
            <View key={day} style={styles.tableHeaderCell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Grid Body */}
        <View style={{ flexDirection: 'row' }}>
          {/* Side Column (Time) */}
          <View style={{ width: 30 }}>
            {periods.map(p => (
              <View key={p} style={styles.periodCell}>
                <Text style={styles.periodText}>{p}</Text>
              </View>
            ))}
          </View>

          {/* Main Grid */}
          <View style={{ flex: 1, position: 'relative', height: (periods.length) * ROW_HEIGHT }}>
            {/* Horizontal Grid Lines */}
            {periods.map((p, i) => (
              <View key={i} style={[styles.gridLine, { top: i * ROW_HEIGHT }]} />
            ))}

            {/* Vertical Grid Lines */}
            {days.map((d, i) => (
              <View key={i} style={[styles.gridVLine, { left: i * colWidth }]} />
            ))}

            {/* Class Blocks */}
            {timetable.map((item, index) => {
              const parsed = parseScheduleData(item);
              if (parsed.dayIndex === -1) return null;

              const left = parsed.dayIndex * colWidth;

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
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
  const [currentDate, setCurrentDate] = useState(new Date("2025-10-08"));
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMenus();
  }, [currentDate]);

  const loadMenus = async () => {
    setLoading(true);
    const dateStr = toISODate(currentDate);
    const data = await getMenus(dateStr);
    setMenus(data || []);
    setLoading(false);
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    return `${month}월 ${day} 일(${dayName})`;
  };

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.dateNav}>
        <TouchableOpacity onPress={handlePrevDate}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.dateNavText}>{formatDate(currentDate)}</Text>
        <TouchableOpacity onPress={handleNextDate}>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#4A90E2" style={{ marginTop: 20 }} />
      ) : menus.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>등록된 식단이 없습니다.</Text>
        </View>
      ) : (
        menus.map((item, idx) => (
          <View key={idx} style={styles.menuCard}>
            <View style={styles.menuHeader}>
              <View style={styles.menuBadge}>
                <Text style={styles.menuBadgeText}>{item.type}</Text>
              </View>
              <Text style={styles.menuTime}>{item.time}</Text>
            </View>
            <Text style={styles.menuTitle}>{item.menuName || item.menu}</Text>
            <Text style={styles.menuPrice}>{item.price}</Text>
          </View>
        ))
      )}
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
    return `${m}분 ${s < 10 ? '0' : ''}${s} 초`;
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.busToggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, direction === '등교' && styles.toggleBtnActive]}
          onPress={() => setDirection('등교')}
        >
          <Text style={[styles.toggleText, direction === '등교' && styles.toggleTextActive]}>등교</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, direction === '하교' && styles.toggleBtnActive]}
          onPress={() => setDirection('하교')}
        >
          <Text style={[styles.toggleText, direction === '하교' && styles.toggleTextActive]}>하교</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.busInfoCard}>
        <Ionicons name="time" size={20} color="#4A90E2" />
        <Text style={styles.busInfoText}>다음 버스까지 <Text style={{ fontWeight: 'bold', color: '#E53935' }}>{formatTime(timeLeft)}</Text> 남았습니다.</Text>
      </View>

      <ScrollView>
        {MOCK_BUS_STOPS.map((stop) => (
          <View key={stop.id} style={styles.busItem}>
            <View style={styles.busLine}>
              <View style={styles.busDot} />
              <View style={styles.busLineStick} />
            </View>
            <View style={styles.busContent}>
              <Text style={styles.busStopName}>{stop.name}</Text>
              <Text style={styles.busTime}>{stop.time} 출발</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const CalendarView = () => {
  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.calendarTitle}>📌 10월 주요 일정</Text>
      {MOCK_EVENTS.map((event) => (
        <View key={event.id} style={styles.eventItem}>
          <View style={styles.dateBox}>
            <Text style={styles.dateBoxText}>{event.date}</Text>
          </View>
          <Text style={styles.eventTitle}>{event.title}</Text>
        </View>
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
    backgroundColor: '#F5F8FF',
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
    flex: 1,
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
    minHeight: 600,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 4,
    marginLeft: 30, // offset for period column
  },
  tableHeaderCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  periodCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEE',
    position: 'relative',
    top: -30 // Adjust to align number with the line if needed, but here we want it centered in the cell?
    // User said "그리드 가로선도 정시에 맞춰 그릴 것" -> Grid lines should match hours.
    // If periodCell is 60px height, the text is in the middle.
    // If we want 9, 10, 11 to be on the lines, we might need a different approach.
    // But usually for timetables, the number is the block index or the start time.
    // Let's keep it simple: Number in center of block representing that hour.
  },
  periodText: {
    fontSize: 12,
    color: '#999',
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
    borderRadius: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // shadow for depth
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  classTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  classRoom: {
    fontSize: 9,
    color: '#666',
  },

  // Menu Styles
  dateNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
  },
  dateNavText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  menuBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  menuBadgeText: {
    color: '#1E88E5',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuTime: {
    color: '#AAA',
    fontSize: 14,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textAlign: 'right',
  },

  // Bus Styles
  busToggle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleBtnActive: {
    backgroundColor: '#4A90E2',
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
  },
  toggleTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  busInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  busInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  busItem: {
    flexDirection: 'row',
    marginBottom: 0,
    height: 70,
  },
  busLine: {
    width: 30,
    alignItems: 'center',
  },
  busDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4A90E2',
    zIndex: 1,
  },
  busLineStick: {
    flex: 1,
    width: 2,
    backgroundColor: '#E0E0E0',
    marginTop: -2,
  },
  busContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 20,
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
