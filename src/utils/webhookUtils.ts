export const processWebhookResponse = (data: any): string => {
  // Handle array responses - concatenate all output messages
  if (Array.isArray(data) && data.length > 0) {
    const messages: string[] = [];
    
    data.forEach(item => {
      if (item.output) {
        messages.push(item.output);
      } else if (item.message) {
        messages.push(item.message);
      } else if (item.text) {
        messages.push(item.text);
      } else if (item.content) {
        messages.push(item.content);
      }
    });
    
    if (messages.length > 0) {
      return messages.join('\n\n');
    }
  }
  
  // Handle different possible response formats from n8n
  if (typeof data === 'string') {
    return data;
  }
  
  if (data.response) {
    return data.response;
  }
  
  if (data.message) {
    return data.message;
  }
  
  if (data.text) {
    return data.text;
  }
  
  if (data.content) {
    return data.content;
  }
  
  if (data.output) {
    return data.output;
  }
  
  // If data is an object with nested properties, try to extract text
  if (typeof data === 'object') {
    const possibleKeys = ['result', 'data', 'body'];
    for (const key of possibleKeys) {
      if (data[key] && typeof data[key] === 'string') {
        return data[key];
      }
    }
  }
  
  return 'I received your message but could not generate a response.';
};
