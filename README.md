# Star Trace 🌟

A beautifully designed React Native app for readers and film lovers who want to reflect, organize, and rate the stories that shape their inner universe.

## ✨ Features

### 📚 Library Management
- **Books & Movies**: Organize your reading and watching lists
- **Smart Folders**: Create custom collections (To Read, Currently Reading, Finished, Favorites, Wish List)
- **Progress Tracking**: Monitor your reading and watching progress
- **Status Management**: Track items as "to-read/watch", "currently reading/watching", or "finished"

### ⭐ Reviews & Ratings
- **Star Ratings**: Rate books and movies from 1-5 stars
- **Emotional Impact**: Rate the emotional impact of stories
- **Thoughtful Reviews**: Write detailed reviews with titles and content
- **Review Management**: Edit, update, and organize your thoughts

### 👥 Character Collection
- **Character Catalog**: Remember the heroes who stay with you
- **Custom Categories**: Organize characters (Heroes, Villains, Side Characters, Love Interests, Mentors)
- **Source Tracking**: Link characters to their books or movies
- **Personal Descriptions**: Add your own character insights

### 📊 Visual Insights
- **Progress Charts**: Visualize your reading and watching progress
- **Statistics Dashboard**: Track totals, averages, and favorites
- **Interactive Charts**: Explore patterns in your preferences
- **Collection Overview**: See your entire universe at a glance

### 🎨 Beautiful Design
- **Cosmic Theme**: Dark mode with gold accents
- **Modern UI**: Clean, intuitive interface
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Engaging user experience

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18)
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PagesTrace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start the Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## 🏗️ Project Structure

```
src/
├── assets/           # Images and static assets
├── navigation/       # Navigation configuration
├── screens/          # App screens
│   ├── LoaderScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LibraryScreen.tsx
│   ├── ReviewsScreen.tsx
│   ├── CharactersScreen.tsx
│   └── SettingsScreen.tsx
└── store/            # Redux store and slices
    ├── store.ts
    └── slices/
        ├── appSlice.ts
        ├── librarySlice.ts
        ├── charactersSlice.ts
        └── reviewsSlice.ts
```

## 🎯 Core Screens

### 1. **Loader Screen**
- Cosmic-themed loading animation
- App branding and introduction
- Smooth transitions to onboarding or main app

### 2. **Onboarding**
- 5-step introduction to app features
- Interactive slides with animations
- Skip option for returning users

### 3. **Home Dashboard**
- Statistics overview (Books, Movies, Characters, Reviews)
- Progress charts and visualizations
- Quick action buttons
- Recent activity summary

### 4. **Library**
- Books and Movies tabs
- Pre-configured folders with counts
- Add new custom folders
- Floating action button for quick additions

### 5. **Reviews**
- List of all reviews with ratings
- Emotional impact ratings
- Edit and delete functionality
- Add new reviews with detailed forms

### 6. **Characters**
- Character collection management
- Custom category system with colors
- Character details and descriptions
- Source linking (books/movies)

### 7. **Settings**
- Theme preferences
- Notification settings
- Data management options
- Collection statistics
- App information

## 🛠️ Technology Stack

- **React Native 0.80.0** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Redux Persist** - Data persistence
- **React Navigation** - Navigation system
- **AsyncStorage** - Local data storage

## 📱 State Management

The app uses Redux Toolkit with the following slices:

- **appSlice**: App-wide state (onboarding, theme, loading)
- **librarySlice**: Books, movies, and folders
- **charactersSlice**: Character collections and categories
- **reviewsSlice**: User reviews and ratings

## 🎨 Design System

### Colors
- **Primary**: `#FFD700` (Gold)
- **Background**: `#0A0A0A` (Dark)
- **Surface**: `#1A1A1A` (Dark Gray)
- **Border**: `#333` (Medium Gray)
- **Text**: `#FFFFFF` (White)
- **Secondary Text**: `#CCCCCC` (Light Gray)

### Typography
- **Headers**: Bold, 24-28px
- **Body**: Regular, 14-16px
- **Captions**: Regular, 12-14px

### Spacing
- **Container**: 20px horizontal padding
- **Cards**: 16px padding
- **Elements**: 8px, 12px, 16px, 20px spacing

## 🔧 Development

### Adding New Features
1. Create new Redux slice if needed
2. Add new screen component
3. Update navigation configuration
4. Add to appropriate tab or stack

### Styling Guidelines
- Use the design system colors and spacing
- Maintain consistent border radius (8px, 12px, 16px)
- Follow the cosmic theme with gold accents
- Ensure dark mode compatibility

### State Management
- Use Redux Toolkit for all state
- Implement proper TypeScript interfaces
- Add persistence where appropriate
- Follow Redux best practices

## 📦 Build & Deploy

### iOS Build
```bash
cd ios
xcodebuild -workspace PagesTrace.xcworkspace -scheme PagesTrace -configuration Release
```

### Android Build
```bash
cd android
./gradlew assembleRelease
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Native community
- Redux Toolkit team
- React Navigation contributors
- All the book and movie lovers who inspired this app

---

**Star Trace** - Trace Your Cosmic Journey Through Stories ✨📚🎬
