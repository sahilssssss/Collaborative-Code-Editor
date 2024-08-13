import React, { useEffect, useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/sql/sql";
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/php/php';
import 'codemirror/mode/go/go';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/shell/shell';
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const [language, setLanguage] = useState(""); // Default language
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("CollaborativeCodeEditor"),
        {
          mode: { name: language },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current = editor;

      editor.setSize(null, "100%");

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []); 

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage === "select" ? "" : selectedLanguage);
   
  };

  return (
    <div style={{ height: "920px"  }}>
      <select
        value={language}
        onChange={handleLanguageChange}
        style={{  fontSize: '16px',padding: '5px',borderRadius: '4px', fontWeight: 'bold', width: '165px', backgroundColor: '#026670', borderColor: '#d1d7e0' }}
      >
        
        <option value="select">Choose language</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="sql">SQL</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
        <option value="go">Go</option>
        <option value="vue">Vue</option>
        <option value="shell">Shell</option>
        {/* We can add more languages here as per needed*/}
      </select>
      
      <textarea id="CollaborativeCodeEditor" ></textarea>
    </div>
  );
}

export default Editor;
