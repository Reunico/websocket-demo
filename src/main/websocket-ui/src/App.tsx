import React, {FormEvent, RefObject, useEffect, useState} from 'react';
import './App.css';
import {config} from './config';
//@ts-ignore
import SockJsClient from "react-stomp";

interface IState {
    clientConnected: any,
    messages: Message[],
    serverMessage: string,
    serviceMessage: string,
}
interface Message {
    name: string;
    message: string;
}
function App() {
    const messageInput:RefObject<HTMLInputElement> = React.createRef();
    let clientRef: any;
    useEffect(() => {
        connect()
    }, []);
    const initialState: IState = {
        clientConnected: false,
        messages: [],
        serverMessage: '',
        serviceMessage: ''
    }
    const [state, setState] = useState(initialState);
    const connect = () => {
        fetch(  `${config.endpoint}/history`)
            .then(res => res.json())
            .then(res => setState({
                ...state,
                messages: res}))
    }
    const sendMessage = (topic: string, msg: string) => {
        clientRef.sendMessage(topic, JSON.stringify({message: msg}))
    }

    const submitHandler = (event: FormEvent | MouseEvent) => {
        event.preventDefault();
        if (messageInput.current && messageInput.current.value) {
            sendMessage('/app/demo-messenger', messageInput.current.value.trim())
            messageInput.current.value = '';
        }
    }

    const onMessage = (msg: Message, topic: string) => {
        switch (msg.name) {
            case 'robot':
                return  setState({
                    ...state,
                    serverMessage: msg.message})
            case 'service':
                return setState({
                    ...state,
                    serviceMessage: msg.message
                })
            default:
                return  setState({
                    ...state,
                    messages: [...state.messages, msg]})
        }
    }
    return (
        <div>
            <h2>WebSocket-UI Application</h2>
            <form onSubmit={event => submitHandler(event)}>
                <input ref={messageInput} type='text'/>
                <button onClick={event =>  submitHandler(event)}>
                    Send
                </button>
            </form>
                <div>
                    <h2>Messages:</h2>
                    <div>{state.messages && state.messages.map((message:Message, key: number) => {
                        return <div key={key}>{message.message}</div>
                    })}
                    </div>
                </div>

                {state.serverMessage.trim() &&
                <div>
                    <h3>Server Message:</h3>
                    <span>{state.serverMessage}</span>
                </div>
                }
            {state.serviceMessage.trim() &&
            <div>
                <h3>Service Message:</h3>
                <span>{state.serviceMessage}</span>
            </div>
            }
            <SockJsClient url={`${config.endpoint}/demo-messenger`} topics={["/topic/message"]}
                          onMessage={ onMessage }
                          ref={ (client: any) => { clientRef = client }}
                          onConnect={ () => { setState({ ...state, clientConnected: true }) } }
                          onDisconnect={ () => { setState({ ...state, clientConnected: false }) } }
                          debug={ false }/>
        </div>
    );
}

export default App;
