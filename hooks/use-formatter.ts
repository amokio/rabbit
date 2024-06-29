import xml from "@prettier/plugin-xml";
import { format as prettier } from "prettier/standalone";
import html from "prettier/plugins/html";
import React from "react";

const TAB_WIDTH = 2;

export const useFormatter = () => {
  const format = React.useCallback(
    async (str: string, format: "json" | "xml" | "html") => {
      if (format === "json") {
        const obj = JSON.parse(str);
        return JSON.stringify(obj, null, TAB_WIDTH);
      }

      if (format === "xml" || format === "html") {
        const formatted = await prettier(str, {
          plugins: [xml, html],
          parser: format,
          tabWidth: TAB_WIDTH,
          bracketSameLine: true,
          xmlWhitespaceSensitivity: "ignore",
        });

        return formatted;
      }

      return str;
    },
    []
  );

  return { format };
};
