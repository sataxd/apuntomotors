import React from 'react';

const HtmlContent = ({ className, html, properties, htmlcontent='html-content' }) => {
  return (
    <div className={`${htmlcontent || ''} flex flex-col gap-3 ${className || ''}`} dangerouslySetInnerHTML={{ __html: html }} {...properties} />
  );
};

export default HtmlContent;