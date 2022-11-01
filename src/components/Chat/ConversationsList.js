
import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constant/index';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import '../styles/Home.css'

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    messages: [],
    activeConversation: null
  };

  componentDidMount = () => {

    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
      
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });console.log(conversations)
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (

      <>
    
      <div className="conversationsList">
        <div className='cable'>
          <ActionCable
            channel={{ channel: 'ConversationsChannel' }}
            onReceived={this.handleReceivedConversation} />
        </div>
          {this.state.conversations.length ? (
            <Cable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
              className="cablestyle"
               />
          ) : null}
          <h2>Conversations</h2>
          <ul>{mapConversations(conversations, this.handleClick)}</ul>
          <NewConversationForm />
          {activeConversation ? (
            <MessagesArea
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )} />
          ) : null}
        </div></>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)} style={{color: "#1c4966",textTransform:"uppercase"}}>
        {conversation.title}
      </li>
    );
  });
};