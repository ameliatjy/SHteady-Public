import React, { memo } from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const ErrorMsg = ({ type = "error", message, onDismiss }) => (
  <View style={styles.container}>
    <Snackbar
      visible={!!message}
      duration={2000}
      onDismiss={onDismiss}
      style={{
        backgroundColor:
          type === "error" ? '#f13a59' : '#00B386'
      }}
    >
      <Text style={styles.content}>{message}</Text>
    </Snackbar>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80 + getStatusBarHeight(),
    width: "100%"
  },
  content: {
    fontWeight: "500"
  }
});