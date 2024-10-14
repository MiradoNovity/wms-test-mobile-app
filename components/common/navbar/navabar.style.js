import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    btnContainer: {
      width: 40,
      height: 40,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.small / 1.25,
      justifyContent: "center",
      alignItems: "center",
    },

    btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
      borderRadius: SIZES.small / 1.25,
    }),

    tab: (isActive) => ({
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: isActive ? COLORS.secondary : COLORS.gray2,
        backgroundColor: isActive ? COLORS.info : 'inherit',
      }),
  });
  
  export default styles;
  