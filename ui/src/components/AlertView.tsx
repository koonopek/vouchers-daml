import React from 'react';
import {Message} from 'semantic-ui-react';
import { AlertComponentProps } from 'react-alert';

export function AlertTemplate({  options, message, close } : AlertComponentProps) {

    switch (options.type) {
        case 'error':
            return <Message style={{marginBottom: '10px'}} color="red">{message}</Message>        
        case 'success':
            return <Message style={{marginBottom: '10px'}} color="green">{message}</Message>        
        case 'info':
            return <Message style={{marginBottom: '10px'}} color="blue">{message}</Message> 
        default:
            return null;
    }
};

