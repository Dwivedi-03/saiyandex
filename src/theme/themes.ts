import { LIGHT_COLORS, DARK_COLORS } from "./colors";
import { Theme } from "../types";

export const lightTheme: Theme = {
    colors: LIGHT_COLORS,
    isDark: false,
    fonts: {
        regular: 'Roboto-Regular',
        bold: 'Roboto-Bold',
        italic: 'Roboto-Italic',
    }
}

export const darkTheme: Theme = {
    colors: DARK_COLORS,
    isDark: true,
    fonts: {
        regular: 'Roboto-Regular',
        bold: 'Roboto-Bold',
        italic: 'Roboto-Italic',
    }

}