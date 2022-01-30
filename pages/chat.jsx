import { Box, Text, TextField, Image, Button, Icon} from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';

// Files/Components/Helpers
import appConfig from '../config.json';
import lowerCaseUsername from "../src/utils/lowerCaseUsername";
import WaitingMessages from '../src/components/animations/WaitingMessages';
import LoadingScreen from '../src/components/animations/loading';
import Header from '../src/components/HeaderChat';
import MessageList from '../src/components/MessageList';
import {ButtonSendSticker} from "../src/components/ButtonSendSticker";

// SUPABASE
import { createClient } from "@supabase/supabase-js";

// Getting environments variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Creating connection with supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


//Update realtime chat
function updateInRealtime(handleNewMessage){
    return supabase
    .from('messages')
    .on("INSERT", (newMessage)=>{
        handleNewMessage(newMessage.new);
    })
    .subscribe()
}




export default function ChatPage() {
    // Router to get username
    const router = useRouter();
    const username = lowerCaseUsername(router.query.username);

    // using state to hide loading page and show the chat
    const [loading, setLoading] = React.useState(true);

    // Message
    const [message, setMessage] = React.useState('');

    // Message List
    const [messageList, setMessageList] = React.useState([]);

    // function to add message to messageList and clean message state
    function handleNewMessage(newMessage){
        
        if(newMessage !== "") {
            const objectMessages = {
                from: username,
                text: newMessage
            };
            
            supabase
                .from('messages')
                .insert([
                    objectMessages
                ]).then()

    
            setMessage("");
        }

    }

    // function to remove a specific message from the messageList
    function deleteMessage(messageToDelete){
        supabase.from('messages')
        .delete()
        .match({id: messageToDelete.id})
        .then(({data})=>{
            setMessageList(messageList.filter((message)=>message.id!==data[0].id))
        })

        
    }


    // All code into useEffect, changes only when the page is refresh
    React.useEffect(()=>{
        supabase
        .from("messages")
        .select("*")
        .order('id', {ascending:false})
        .then(({data})=>{
            setMessageList(data)
        })

        
        // Calling the Realtime function to run
        updateInRealtime((newMessage)=>{
            setMessageList((messageList)=>{
                return [
                    newMessage,
                    ...messageList,
                ]
            })
        })

        // Setting the LoadState to show the chat page and hide the loading page
        setTimeout(() => setLoading(false), 3000);
    }, [])


    // Content
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[700],   
                backgroundImage: `url(${appConfig.theme.backgroundImage})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                width: '100vw', height: '100vh',
            }}
        >   
            {!loading ? (
                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: 'min(1100px, 95%)',
                    maxHeight: '95vh',
                    padding: '1rem',
                }}
            >
                <Header username={username}/>

                <Box
                    styleSheet={{
                        display: 'flex',
                        flex: 1,
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '1rem',
                        overflowY:'hidden'
                    }}
                >

                    {messageList.length == 0 ? (
                        <WaitingMessages/>
                    ): (
                        <MessageList messages={messageList} onRemove={deleteMessage} username={username}/>
                    )}
                    
                     
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'initial',
                            justifyContent: "center",
                            gap: "0.8rem",
                        }}
                        onSubmit={(event)=>{
                            event.preventDefault();
                            handleNewMessage(message)
                        }}
                    >
                        <TextField
                            value={message}

                            onChange={(event)=>{
                                setMessage(event.target.value)
                            }}

                            onKeyPress={(event)=>{

                                if(event.key === "Enter"){
                                    event.preventDefault();

                                    handleNewMessage(message)
                                }
                            }}

                            placeholder="Insert a Message..."
                            type="textarea"
                            styleSheet={{
                                width:'100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: ' 0.3rem 0.5rem',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <ButtonSendSticker onStickerClick={(sticker)=>{
                            handleNewMessage(":sticker:"+sticker)
                        }}/>
                            
                        <Button 
                        type="submit" 
                        label="send"
                        size="xs"
                        variant="secondary"
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[500],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[800],
                        }}
                        styleSheet={{
                            width:{
                                "xs": "90px",
                            },
                            height:{
                                "xs": "50px",
                            }
                        }}
                        />

                    </Box>
                </Box>
            </Box>
                
            ) :  (
                <LoadingScreen/>
            )}
            
        </Box>
    )
}
