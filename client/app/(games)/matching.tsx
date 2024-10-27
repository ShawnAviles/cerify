import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function MatchingGame() {

  return (
    <ThemedView style={styles.page} lightColor={Colors.primary} darkColor={Colors.primary}>
      <SafeAreaView>
        <ThemedText>Matching Game</ThemedText>
      </SafeAreaView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
  }
});