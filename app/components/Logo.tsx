import { Image, StyleSheet, View } from "react-native";

type Props = { size?: number };

export default function Logo({ size = 140 }: Props) {
  return (
    <View style={[styles.wrap, { width: size * 2, height: size * 1.2 }]}>
      <Image
        // NOTE: path is from app/components → ../../assets/images/...
        source={require("../../assets/images/divu-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "85%",
    height: "85%",
  },
});
