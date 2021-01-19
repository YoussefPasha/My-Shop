import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

const Input = (props: any) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={title}
        onChangeText={titleChangeHandler}
      />
      {!titleIsValid && <Text style={{ color: "red" }}>{props.errorText}</Text>}
    </View>
  );
};

export default Input;
