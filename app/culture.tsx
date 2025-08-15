import React, { useRef, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Sidebar from "./components/sidebar"; // match your file name/casing
import { useSidebar } from "./lib/sidebar";        // from files in app/

import { Video, ResizeMode } from "expo-av";
import type { AVPlaybackStatus } from "expo-av";

const UI = {
  ribbonBg: "rgba(216,230,222,0.85)",
  titleBg: "#162d26",
  tabIdle: "#6AD987",
  tabActiveBg: "#E8F5EF",
  tabText: "#0a1f17",
  panelBg: "rgba(234,244,238,0.92)",
  placeholder: "#7167FF",
};

export default function Culture() {
  const { width } = useWindowDimensions();
  const isSmall = width < 820;
  const [menuOpen, setMenuOpen] = useState(false);

  // video state
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1, backgroundColor: "#0c1214" }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, flexDirection: isSmall ? "column" : "row" }}>
        {!isSmall && <Sidebar active="home" />}

        <View style={styles.right}>
          {/* Ribbon */}
          <View style={styles.ribbon}>
            {isSmall && (
              <TouchableOpacity onPress={() => setMenuOpen(true)} style={{ paddingRight: 8 }}>
                <Ionicons name="menu" size={22} color={UI.tabText} />
              </TouchableOpacity>
            )}
            <Text style={styles.ribbonText}>Welcome &lt;name&gt; to DIVU!</Text>
            <Ionicons name="apps-outline" size={18} color={UI.tabText} />
          </View>

          {/* HOME PAGE bar */}
          <View style={styles.titleBar}>
            <Text style={styles.title}>HOME PAGE</Text>
          </View>

          {/* Tabs */}
          <View style={[styles.tabs, isSmall && { flexWrap: "wrap" }]}>
            <Tab label="Welcome" kind="idle" onPress={() => router.replace("/home")} />
            <Tab label="Culture" kind="active" onPress={() => {}} />
            <Tab label="About" kind="idle" onPress={() => router.replace("/about")} />
          </View>

          {/* Body */}
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
            {/* Row 1: Text left + Image right */}
            <View style={[styles.row, isSmall && { flexDirection: "column" }]}>
              <View style={[styles.textCard, isSmall && { marginBottom: 12 }]}>
                <Text style={styles.p}>
                  Lorem ipsum dolor sit amet consectetur. Donec nulla at vel lobortis sed fames elit. In pellentesque
                  lacinia enim quisque. Duis velit gravida mauris senectus. Scelerisque dignissim facilisis sem nunc
                  lacus augue sem sit eros. Faucibus molestie sed sed nam magna enim ac purus.
                </Text>
                <Text style={[styles.p, { marginTop: 10 }]}>
                  Etiam quis ante laoreet congue mi turpis. Elit risus sapien mauris arcu libero volutpat. Molestie
                  maecenas congue sit etiam sed enim cum mattis pretium. Phasellus aliquam nulla id eget nec convallis.
                  Id nisl pellentesque quis dictum aenean eget sagittis purus maecenas. Egestas ac arcu fringilla
                  adipiscing nibh.
                </Text>
                <Text style={styles.sig}>- DIVU</Text>
              </View>

              <View style={styles.imageCard}>
                <Image
                  source={require("../assets/images/team-meeting.jpg")}
                  style={{ width: "100%", height: "100%", borderRadius: 6 }}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Row 2: Real video */}
            <View style={styles.videoWrap}>
              <Video
                ref={videoRef}
                source={require("../assets/videos/culture.mp4")} // <-- your local video
                // Or use a remote URL instead:
                // source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={false}
                onPlaybackStatusUpdate={(s) => setStatus(s)}
                style={styles.video}
              />
              {/* Optional overlay play/pause chip */}
              <TouchableOpacity
                style={styles.playBtn}
                onPress={async () => {
                  const s = status;
                  if (!s || !("isLoaded" in s) || !s.isLoaded) return;
                  if (s.isPlaying) await videoRef.current?.pauseAsync();
                  else await videoRef.current?.playAsync();
                }}
              >
                <Ionicons
                  name={status && "isLoaded" in status && status.isLoaded && status.isPlaying ? "pause" : "play"}
                  size={14}
                  color="#fff"
                />
                <Text style={styles.playText}>
                  {status && "isLoaded" in status && status.isLoaded && status.isPlaying ? "Pause" : "Play"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Row 3: More text blocks */}
            <View style={styles.moreText}>
              <Text style={styles.p}>
                Lorem ipsum dolor sit amet consectetur. Accumsan ipsum vitae amet cursus ornare aliquet. Sit faucibus
                viverra sagittis mattis. Scelerisque morbi posuere ac dictum maecenas eu. Cursus vestibulum faucibus
                nec velit quis laoreet fermentum aliquet. Morbi sit quisque turpis mi congue in aliquam. Faucibus
                vitae maecenas imperdiet elementum adipiscing gravida.
              </Text>
            </View>

            <View style={styles.moreText}>
              <Text style={styles.p}>
                Volutpat donec orci tortor vitae blandit diam porta urna at. Imperdiet cursus urna donec nec in
                venenatis. Vitae hendrerit enim at laoreet velit. Pellentesque ac mattis ac posuere adipiscing gravida.
                Pellentesque vel sit ullamcorper facilisis cursus aliquet id lorem. Ut in facilisi dignissim ullamcorper
                in nec eget. Amet porttitor non pulvinar neque a risus dictum. Arcu integer dui elit in dictum id diam dui.
              </Text>
            </View>

            <View style={styles.moreText}>
              <Text style={styles.p}>
                Lectus facilisis rutrum felis pellentesque lectus iaculis molestie. Fermentum diam feugiat in viverra at
                sodales lectus. Quam quam aliquet dui. Aenean etiam faucibus lacinia porttitor quam rutrum risus.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Drawer sidebar (mobile) */}
      {isSmall && menuOpen && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
          <Sidebar
            active="home"
            variant="overlay"
            width={Math.min(280, width * 0.85)}
            onClose={() => setMenuOpen(false)}
          />
        </>
      )}
    </ImageBackground>
  );
}

function Tab({
  label,
  kind,
  onPress,
}: {
  label: string;
  kind: "active" | "idle";
  onPress: () => void;
}) {
  const active = kind === "active";
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, active ? styles.tabActive : styles.tabIdle]}>
      <Text style={[styles.tabText, active && { fontWeight: "800" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  right: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },

  ribbon: {
    height: 38,
    backgroundColor: UI.ribbonBg,
    borderRadius: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ribbonText: { color: UI.tabText, fontWeight: "700" },

  titleBar: {
    marginTop: 8,
    backgroundColor: UI.titleBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  title: { color: "#ffffff", fontWeight: "700", letterSpacing: 0.5 },

  tabs: { flexDirection: "row", marginTop: 8 },
  tab: {
    height: 30,
    minWidth: 100,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  tabActive: { backgroundColor: UI.tabActiveBg, borderWidth: 1, borderColor: "#2d7f59" },
  tabIdle: { backgroundColor: UI.tabIdle },
  tabText: { color: UI.tabText, fontSize: 13 },

  row: { flexDirection: "row", marginTop: 10 },
  textCard: {
    flex: 1,
    backgroundColor: UI.panelBg,
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  sig: { marginTop: 8, color: "#1a2b23", fontWeight: "700" },

  imageCard: {
    width: 260,
    height: 180,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: UI.panelBg,
    padding: 8,
  },

  // --- VIDEO styles (new) ---
  videoWrap: {
    marginTop: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
    width: "100%",
    aspectRatio: 16 / 9, // responsive 16:9
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  playText: { color: "#fff", marginLeft: 6, fontWeight: "700" },

  moreText: {
    marginTop: 12,
    backgroundColor: UI.panelBg,
    borderRadius: 8,
    padding: 12,
  },

  p: { color: "#1a2b23", lineHeight: 20, fontSize: 12.5 },

  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
});
