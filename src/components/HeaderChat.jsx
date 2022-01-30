import {Box, Text, Image, Button} from "@skynexui/components"

export default function Header({username}) {
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
                <Image src="images/mk11_title_chat.png" 
                styleSheet={{
                    width:'150px',
                }}
                alt="MK11"/>
                <Box styleSheet={{
                    display: 'flex',
                    alignItems:'center',
                    gap:'0.9rem'
                }}>
                    <Image src={`https://github.com/${username}.png`} alt="username"
                        styleSheet={{
                            width:'30px',
                            height:'30px',
                            borderRadius:'50%'
                        }}
                    />
                    <Button
                        variant='tertiary'
                        colorVariant='neutral'
                        label='Logout'
                        href="/"
                    />
                </Box>
            </Box>
        </>
    )
}