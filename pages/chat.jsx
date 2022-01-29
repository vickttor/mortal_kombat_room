import { Box, Text, TextField, Image, Button, Icon} from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
// SUPABASE
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export default function ChatPage() {
    // Message
    const [message, setMessage] = React.useState('');

    // Message List
    const [messageList, setMessageList] = React.useState([]);

    // function to add message to messageList and clean message state
    function handleNewMessage(newMessage){
        
        if(newMessage !== "") {
            const objectMessages = {
                from: "VictorSilva15",
                text: newMessage
            };
            
            supabase
                .from('messages')
                .insert([
                    objectMessages
                ])
                .then(({data})=>{
                    
                    setMessageList([
                        data[0],
                        ...messageList,
                    ])
                })


    
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

    React.useEffect(()=>{
        supabase
        .from("messages")
        .select("*")
        .order('id', {ascending:false})
        .then(({data})=>{
            setMessageList(data)
        })
    }, [])



    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[400],   
                backgroundImage: `url(${appConfig.theme.backgroundImage})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                width: '100vw', height: '100vh',
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '1rem',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* Message list */}
                    <MessageList messages={messageList} onRemove={deleteMessage} />
                     
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "center",
                            flexDirection: "row",
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
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button 
                        type="submit" 
                        label="send"
                        size="xl" 
                        variant="secondary"
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[500],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[800],
                        }}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ 
                width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', flexDirection:{xs:"column", md: "row"},
                gap:"0.5rem"
            }}>
                <Text variant='heading5'>
                    CHAT
                </Text>
                <Image src="https://cdn2.steamgriddb.com/file/sgdb-cdn/logo/4d7a968bb636e25818ff2a3941db08c1.png" 
                styleSheet={{
                    width:'150px',
                }}
                alt="MK11"/>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    return (
        <Box
            className='chatSpace'
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.messages.map((objectMessage)=> {
               return (
                <Text
                    key={objectMessage.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                            display:'flex',
                            alignItems:'center',
                            justifyContent: "space-between",
                            padding: "0.5rem 1rem 0.5rem 0.5rem",
                            
                        }}
                    >
                        <Box styleSheet={{
                            display:"flex",
                            alignItems:"center",
                            gap:"0.8rem",
                            flexWrap:"wrap"
                        }}>
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${objectMessage.from}.png`}
                            />
                            <Text tag="strong">
                                {objectMessage.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {new Date(objectMessage.created_at).toLocaleDateString()}
                            </Text>
                        </Box>


                        {/* remove button */}
                        <Icon 
                            styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    hover:{
                                        color:appConfig.theme.colors.primary[600]
                                    },
                                    cursor:"pointer"
                                }}
                                name="FaTrash" 
                                size="1.5ch"
                                rounded='md'
                            onClick={()=>props.onRemove(objectMessage)}
                        />
                        
                    </Box>
                    {objectMessage.text}
                </Text>
               )
            })}  
        </Box>
    );
}

