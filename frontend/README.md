# SMAT (Smart School Life) App ✨ ✨

A **Premium** React Native (Expo) application designed to enhance the university life experience with a state-of-the-art Design Language.

## ✨ Premium UI Overhaul
The app has recently undergone a complete aesthetic transformation, featuring:
- **Unified Design System**: Consistent use of primary blue (`#4A90E2`) and clean backgrounds (`#F8FAFF`).
- **Premium Card Layouts**: High-contrast, card-based interface with professional shadows and typography.
- **Data Synchronization**: Unified mock data across Home and School Life views (Menus, Timetable).
- **Vibrant Components**: Modern status badges, sleek avatars, and professional iconography.

## 📱 Features

### 1. **Authentication**
- **Login Screen**: Secure entry point.
- **Auto Login**: Persistent session management using `AsyncStorage`.
- **Logic**: Managed via `AuthContext`.

### 2. **Home Dashboard**
- **User Greeting**: Personalized welcome.
- **Weather Widget**: Real-time mock weather updates.
- **Next Class**: Countdown to the upcoming lecture.
- **Quick Actions**: Shortcuts to Shuttle, Library, Announcements, Campus Phone.
- **Lunch Preview**: Today's cafeteria menu.

### 3. **School Life**
- **TimeTable**: Visual weekly schedule grid.
- **Menu**: Daily cafeteria menu with date navigation.
- **Bus**: Shuttle schedule with **Real-time Countdown Timer**.
- **Calendar**: Academic schedule viewer.

### 4. **Community**
- **Board**: Categorized posts (Taxi, Books, Team).
- **Write Post**: Modal interface for creating content.
- **Chat**: Real-time messaging UI (Mocked) with Chat List and Room views.

### 5. **My Page**
- **Profile**: View and Edit user details.
- **Settings**: Toggle notifications, Logout.

## 🛠 Tech Stack
- **Framework**: React Native (Expo)
- **Language**: JavaScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Styling**: StyleSheet (Flexbox)
- **State Management**: React Context API + Hooks
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons (Ionicons)

## 🚀 How to Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the App**
    ```bash
    npx expo start
    ```
    - Press `a` for Android Emulator.
    - Press `i` for iOS Simulator.
    - Scan QR code for physical device.
