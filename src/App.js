import React, { useState } from 'react';
import jsonData from './input.json';
import './App.css';

function App() {
  const [data, setData] = useState(jsonData);
  const [clauseIdx, setClauseIdx] = useState(0);

  const renderNode = (node, index, is_bold, is_underlined) => {
    switch (node.type) {
      case 'block':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        return (
          <div key={index} className="clause">
            {node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}
          </div>
        );
      case 'h1':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        return <h1 key={index}>{node.children[0].text}</h1>;
      case 'p':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        return (
          <p key={index}>
            {node.children ? node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined)) : node.text}
          </p>
        );
      case 'clause':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        // setClauseIdx(clauseIdx+1);
        const clidx = clauseIdx;
        // console.log(clidx);
        return (
          <div key={index} className="clause">
            {node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}
          </div>
        );
      case 'ul':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        if (node.children){
          return (
            <ul key={index}>{node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}</ul>
          );
        };
        return <ul key={index}>{renderText(node.text, is_bold, is_underlined)}</ul>
      case 'li':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        if (node.children){
          return (
            <li key={index}>{node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}</li>
          );
        };
        return <li key={index}>{renderText(node.text, is_bold, is_underlined)}</li>
      case 'lic':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        if (node.children){
          return (
            <span key={index}>{node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}</span>
          );
        };
        return <span key={index}>{renderText(node.text, is_bold, is_underlined)}</span>
      case 'mention':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        if (node.children){
          return (
            <div
              key={index}
              className="mention"
              style={{ backgroundColor: node.color }}
            >
              {node.children && node.children[0] && node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}
            </div>
          );
        };
        return <div
        key={index}
        className="mention"
        style={{ backgroundColor: node.color }}>
          {renderText(node.text, is_bold, is_underlined)}</div>
      case 'h4':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        if (node.children){
          return (
            <h4 key={index}>{node.children.map((child, i) => renderNode(child, i, is_bold, is_underlined))}</h4>
          );
        };
        return <h4 key={index}>{renderText(node.text, is_bold, is_underlined)}</h4>
        // return <h4 key={index}>{node.children?.map((child, i) => renderNode(child, i, is_bold, is_underlined))}</h4>;
      case 'bold':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        return <strong key={index}>{node.text}</strong>;
      case 'underline':
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        return <u key={index}>{node.text}</u>;
      default:
        is_bold= is_bold || node.bold?true:false;
        is_underlined= is_underlined || node.underline?true:false;
        return renderText(node.text, is_bold, is_underlined);
    }
  };

  const renderText = (text, is_bold, is_underlined) => {
    if (text.includes('\n')) {
      const lines = text.split('\n');
      return lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index !== lines.length - 1 && <br />} {/* Add a line break if it's not the last line */}
        </React.Fragment>
      ));
    }
  
    if (is_bold && is_underlined) {
      return <strong><u>{text}</u></strong>;
    }
    if (is_bold) {
      return <strong>{text}</strong>;
    }
    if (is_underlined) {
      return <u>{text}</u>;
    }
    return <span>{text}</span>;
  };
  

  return (
    <div className="App">
      {data && data.map((node, index) => renderNode(node, index))}
    </div>
  );
}

export default App;
