import React from "react";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";

const MainButton = (props: any) => {
  return (
    <Button
      title={props.title}
      type="clear"
      titleStyle={{
        color: props.color ? props.color : Colors.primary,
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "regular",
      }}
      onPress={props.onPress}
    />
  );
};

export default MainButton;
