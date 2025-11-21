import './App.css';
import { ChatUIComponent, MessageDirective, MessagesDirective, MessageSendEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import {GeminiAI} from './ai.model';
import {useRef} from 'react';

function App() {
  const chatRef = useRef<ChatUIComponent>(null);
  const customerUserModel = {
    id: "User1",
    user: "You",
  };

  const aiUserModel = {
    id: "User2",
    user: "Syncfusion Bot",
    avatarUrl: './images/cody.png'
  };

  const onMessageSend = async (args: MessageSendEventArgs): Promise<void> => {
    const customerMessage = args.message?.text?.trim();
    if (customerMessage && chatRef.current) {
      try {
        chatRef.current.typingUsers = [aiUserModel];
        const responseText = await GeminiAI(customerMessage);
        chatRef.current.typingUsers = [];

        if (responseText?.text) {
          chatRef.current.addMessage({
            text: responseText.text,
            author: aiUserModel
          });
        }
        else {
          chatRef.current.addMessage({
            text: "Sorry, I couldn't process that. Try again!",
            author: aiUserModel
          });
        }
      }
      catch (error) {
        console.error('AI Error:', error);
        chatRef.current.typingUsers = [];
        chatRef.current.addMessage({
          text: "Sorry, I encountered an error. Please try again!",
          author: aiUserModel
        });
      }
      args.cancel = true;
    }
  };

  return (
    <div className='container'>
      <ChatUIComponent
        ref={chatRef}
        id="chat-ui"
        user={customerUserModel}
        headerText='Syncfusion HelpDesk'
        headerIconCss='e-icons e-people'
        messageSend={onMessageSend}
        placeholder="Ask me anything about Syncfusion components..." >
        <MessagesDirective>
          <MessageDirective
            text="Hello! I'm your Syncfusion AI Assistant. Ask me about components, coding help, or development tips!"
            author={aiUserModel}
          />
        </MessagesDirective>
      </ChatUIComponent>
    </div>
  );
}

export default App;
