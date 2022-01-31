import { Box, Text, Image, Icon } from "@skynexui/components";
import fixDateTime from "../utils/fixDatetime"
import appConfig from "../../config.json";

export default function MessageList(props) {

    return (
        <Box
            className='scrollBar'
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
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
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection:"column",
                        alignItems: objectMessage.from === props.username ? 'flex-end' : "flex-start",
                    }}
                >
                    <Box  
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '0.6rem 1.1rem',
                        marginBottom: '12px',                  
                        backgroundColor: objectMessage.from !== props.username ? 
                        appConfig.theme.colors.neutrals[700] : appConfig.theme.colors.primary['700s'],
                        maxWidth:'100%',
                        overflowWrap: 'break-word'
                    }}>

                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display:'flex',
                                alignItems:'center',
                                gap:"0.5rem",
                                flexWrap:"wrap",
                                padding: "0.5rem 1rem 0.5rem 0.5rem",
                            }}
                        >

                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                }}
                                src={`https://github.com/${objectMessage.from}.png`}
                            />
                            <Text tag="strong">
                                {objectMessage.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                tag="span"
                            >
                                {fixDateTime(new Date(objectMessage.created_at).toLocaleString())}
                            </Text>
                            
                            {/* remove button */}
                            {objectMessage.from === props.username && (
                                <Icon 
                                styleSheet={{
                                        color: appConfig.theme.colors.neutrals[200],
                                        hover:{
                                            color:appConfig.theme.colors.neutrals[400]
                                        },
                                        cursor:"pointer",
                                        display: 'flex',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                    name="FaTrash" 
                                    size="1.5ch"
                                    rounded='md'
                                onClick={()=>props.onRemove(objectMessage)}
                                />
                            )}    
                        </Box>
                        
                        {/* Texto  ou Sticker */}

                         
                        {objectMessage.text.startsWith(":sticker:") ? 
                        
                            <Image 
                            src={objectMessage.text.replace(":sticker:", "")}
                            alt="sticker"
                            styleSheet={{
                                width: '100%',
                                maxWidth:"400px"
                            }}
                             />

                        :
                        
                            objectMessage.text
                        }
                    </Box>   
                </Text>
               )
            })}  
        </Box>
    );
}

