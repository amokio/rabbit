import { useFormatter } from "@/hooks/use-formatter";
import { defaultKeymap } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import CodeMirror, {
  KeyBinding,
  Prec,
  ReactCodeMirrorRef,
  keymap,
} from "@uiw/react-codemirror";
import React from "react";

type Props = {
  fileType: string;
  content: string;
  isPretty?: boolean;
};

const Component: React.FC<Props> = ({ content, fileType, isPretty }) => {
  const { format } = useFormatter();

  const ref = React.useRef<ReactCodeMirrorRef>(null);

  const [pretty, setPretty] = React.useState(content);

  React.useEffect(() => {
    if (content === "") return;

    if (isPretty) {
      onHandleFormat();
    } else {
      setPretty(content);
    }
  }, [content]);

  const onHandleFormat = () => {
    format(content, fileType as unknown as any).then(setPretty);
    return true;
  };

  const formatter: KeyBinding = {
    key: "Ctrl-Shift-f",
    mac: "Mod-Shift-f",
    run: onHandleFormat,
    preventDefault: true,
  };

  const extensions = React.useMemo(() => {
    const ary = [keymap.of([...defaultKeymap, formatter]), Prec.highest([])];

    if (fileType === "json") {
      ary.push(json());
    } else if (fileType === "xml") {
      ary.push(xml());
    } else if (fileType === "html") {
      ary.push(html());
    }

    return ary;
  }, [fileType]);

  return (
    <CodeMirror
      ref={ref}
      extensions={extensions}
      className="overflow-auto font-mono h-full"
      value={pretty}
    />
  );
};

export default Component;
