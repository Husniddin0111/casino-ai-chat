
import React from 'react';

export const parseMarkdown = (text: string): React.ReactNode => {
  // Split text by markdown links and URLs to handle them separately
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s\]]+)/g;
  
  // First, replace markdown links with placeholders to avoid conflicts
  const markdownLinks: { placeholder: string; text: string; url: string }[] = [];
  let linkIndex = 0;
  
  let processedText = text.replace(markdownLinkRegex, (match, linkText, url) => {
    const placeholder = `__MARKDOWN_LINK_${linkIndex}__`;
    markdownLinks.push({ placeholder, text: linkText, url });
    linkIndex++;
    return placeholder;
  });
  
  // Now split by URLs and placeholders
  const combinedRegex = new RegExp(`(${urlRegex.source}|__MARKDOWN_LINK_\\d+__)`, 'g');
  const parts = processedText.split(combinedRegex);
  
return parts.map((part, index) => {
  if (!part) return null;
    // Check if this part is a markdown link placeholder
    const markdownLink = markdownLinks.find(link => link.placeholder === part);
    if (markdownLink) {
      return (
        <a
          key={index}
          href={markdownLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {markdownLink.text}
        </a>
      );
    }
    
    // If this part is a regular URL, render it as a link
    if (urlRegex.test(part)){
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-medium break-all"
        >
          {part}
        </a>
      );
    }
    
    // Process markdown formatting for non-URL parts
    let processedPart = part;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Handle bold text (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(part)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(processedPart.slice(lastIndex, match.index));
      }
      
      // Add the bold text
      elements.push(
        <strong key={`bold-${index}-${match.index}`} className="font-semibold">
          {match[1]}
        </strong>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < part.length) {
      elements.push(part.slice(lastIndex));
    }
    
    // If no formatting was found, return the original part
    // if (elements.length === 0) {
    //   return part;
    // }
    
    // return <React.Fragment key={index}>{elements}</React.Fragment>;
    return <React.Fragment key={index}>{elements.length > 0 ? elements : part}</React.Fragment>;
  });
};

export const formatTextWithMarkdown = (text: string): React.ReactNode => {
  // Split by newlines to preserve line breaks
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => (
    <React.Fragment key={lineIndex}>
      {parseMarkdown(line)}
      {lineIndex < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};
