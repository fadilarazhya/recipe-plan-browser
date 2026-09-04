import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Recipes" }} />
      <Tabs.Screen name="favourites" options={{ title: "Favorites" }} />
    </Tabs>
  );
}
