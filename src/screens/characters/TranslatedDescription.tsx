import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { translateText } from "../../utils/translate"; // the function I shared earlier

const TranslatedDescription = ({ text }: { text: string }) => {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    const translate = async () => {
      const result = await translateText(text);
      setTranslated(result);
    };

    translate();
  }, [text]);

  return <Text style={{ color: "#888" /* optional, can use theme */ }}>{translated}</Text>;
};

export default TranslatedDescription;