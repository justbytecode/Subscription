import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';
"use server"
function Chatbot() {
  const tawkMessengerRef = useRef();

  const handleLoad = () => {
    console.log('Tawk chat widget loaded');
  };

  const handleStatusChange = (status) => {
    console.log('Chat status changed to:', status);
  };

  const handleChatMaximized = () => {
    console.log('Chat window maximized');
  };

  const handleChatMinimized = () => {
    console.log('Chat window minimized');
  };

  const handleChatHidden = () => {
    console.log('Chat widget hidden');
  };

  const handleChatStarted = () => {
    console.log('Chat conversation started');
  };

  const handleChatEnded = () => {
    console.log('Chat conversation ended');
  };

  const handlePrechatSubmit = (data) => {
    console.log('Prechat form submitted:', data);
  };

  const handleOfflineSubmit = (data) => {
    console.log('Offline form submitted:', data);
  };

  const handleChatMessageVisitor = (message) => {
    console.log('Visitor sent message:', message);
  };

  const handleChatMessageAgent = (message) => {
    console.log('Agent sent message:', message);
  };

  const handleChatMessageSystem = (message) => {
    console.log('System message:', message);
  };

  const handleAgentJoinChat = (data) => {
    console.log('Agent joined chat:', data);
  };

  const handleAgentLeaveChat = (data) => {
    console.log('Agent left chat:', data);
  };

  const handleChatSatisfaction = (satisfaction) => {
    console.log('Chat satisfaction rating:', satisfaction);
  };

  const handleVisitorNameChanged = (visitorName) => {
    console.log('Visitor name changed to:', visitorName);
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
  };

  const handleTagsUpdated = (tags) => {
    console.log('Tags updated:', tags);
  };

  const handleUnreadCountChanged = (count) => {
    console.log('Unread message count changed:', count);
  };

  const handleBeforeLoad = () => {
    console.log('Before Tawk chat widget loads');
  };

  return (
    <div>
      <TawkMessengerReact
        ref={tawkMessengerRef}
        propertyId="67e50a774040b31908c84848"
        widgetId="1injsi3ti"
        customStyle={{
          // Optional custom styling
          zIndex: 1000,
          visibility: {
            desktop: {
              position: 'right',
              xOffset: '15px',
              yOffset: '15px'
            },
            mobile: {
              position: 'right',
              xOffset: '15px',
              yOffset: '15px'
            }
          }
        }}
        embedId="" // Optional for embedded mode
        basePath="tawk.to" // Default value
        onLoad={handleLoad}
        onStatusChange={handleStatusChange}
        onBeforeLoad={handleBeforeLoad}
        onChatMaximized={handleChatMaximized}
        onChatMinimized={handleChatMinimized}
        onChatHidden={handleChatHidden}
        onChatStarted={handleChatStarted}
        onChatEnded={handleChatEnded}
        onPrechatSubmit={handlePrechatSubmit}
        onOfflineSubmit={handleOfflineSubmit}
        onChatMessageVisitor={handleChatMessageVisitor}
        onChatMessageAgent={handleChatMessageAgent}
        onChatMessageSystem={handleChatMessageSystem}
        onAgentJoinChat={handleAgentJoinChat}
        onAgentLeaveChat={handleAgentLeaveChat}
        onChatSatisfaction={handleChatSatisfaction}
        onVisitorNameChanged={handleVisitorNameChanged}
        onFileUpload={handleFileUpload}
        onTagsUpdated={handleTagsUpdated}
        onUnreadCountChanged={handleUnreadCountChanged}
      />

      {/* Optional: Buttons to control the chat widget */}
      <div>
        <button onClick={() => tawkMessengerRef.current.maximize()}>
          {/* Open Chat */}
        </button>
        <button onClick={() => tawkMessengerRef.current.minimize()}>
          {/* Minimize Chat */}
        </button>
        <button onClick={() => tawkMessengerRef.current.toggle()}>
          {/* Toggle Chat */}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;