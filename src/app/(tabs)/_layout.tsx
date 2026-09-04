import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Pressable } from "react-native"
import { colors } from "@/theme"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabActive,
        tabBarButton: ({ style, onPress, onLongPress, accessibilityLabel, testID, children }) => (
          <Pressable
            style={style}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            android_ripple={{ color: "rgba(0, 0, 0, 0.08)", borderless: false }}
          >
            {children}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "restaurant" : "restaurant-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="filter"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "star" : "star-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
