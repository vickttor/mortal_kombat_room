/**
 * 
 * @TODO fix the resolution to mobile by setting width of the Box form and Box Github Fields
 * @TODO implement debounce using lodash
 * @see https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b
 * @TODO keep going through the course
 */


// Dependencies skynexui/components
import { Box, Button, Text, TextField, Image} from "@skynexui/components"; 

// React Hooks 
import React from 'react'
import { useRouter } from "next/router";

// Tilt effect lib
import Tilt from "react-tilt";

// Files
import appConfig from "../config.json";
import RequestGithubAPI from "../src/api/github";

// Title function (component), that receive a `props` as an argument.
// This props is an object that allow us to access the children
// and params values. The params is all parameters that we pass into
// the tag. The children is the internal value passed into it
const Title = (props) =>{
    // Get the `tag` parameter
    const Tag = props.tag || 'h2';

    return (
        <>  
            {/* Using javaScript variable value into <Tag> tag */}
            <Tag>{props.children}</Tag>

            {/* Defining style jsx to this scope */}
            <style jsx>{`
            ${Tag}{
                color:${appConfig.theme.colors.primary['400']};
                font-size: 1.5rem;
                font-weight: 600;
            }
            `}</style>
        </>

    );
}

const GithubField = (props) => {
  return(
    <Text as="p" variant="body3" styleSheet={{
      backgroundColor:appConfig.theme.colors.neutrals[900],
      padding: '3px 10px',
      borderRadius: '1000px'
    }}>
      {props.children}
    </Text>
  )
}


// Exporting default function
export default function HomePage() {
    const [username, setUsername] = React.useState("");
    const router = useRouter();


    // Requiring data user from api github
    const [data, setData] = React.useState({});

    RequestGithubAPI(username).then((data)=> {
      setData({...data})
    })


    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            //other backgrounds =>
            //backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/2020-mortal-kombat-11-4k-ag.jpg)',
            //backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/mortal-kombat-11-art-4k-2c.jpg)',
            backgroundImage: 'url(https://cdn.wallpapersafari.com/93/6/xDCnmq.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            width: '100vw', height: '100vh',
          }}
        >
          {/* Tilt Effect component */}
          <Tilt className="Tilt" options={{max:8, speed:200, scale:1}}>
            
            <Box className="Tilt-inner"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              gap:"0.8rem",
              width: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Forms */}
            
            <Box
              as="form"
              onSubmit={(event)=>{
                // preventing the default pattern (that is to search for a new href and submit)
                event.preventDefault();

                // Add the /chat path to nextjs manage the routes
                router.push("/chat")
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Welcome Warrior</Title>
              
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                value={username}
                onChange={(event)=>{
                  // Getting the new value of the input
                  const newValue = event.target.value;
                  // Using the newValue on setUsername function to change the state of the
                  // username variable
                  setUsername(newValue)
                }}
              />
              <Button
                type='submit'
                label='Login'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[800],
                }}
              />
            </Box>
            {/* Forms */}
            
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username || "skynexui"}.png`}
                alt="Photo User"
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username || "User"}
              </Text>
            </Box>
            {/* Photo Area */}
            </Box>

          </Tilt>

          {/* Github Informations API */}
          <Tilt options={{max:5, speed:100, scale:1}}>
            <Box styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                gap:"0.8rem",
                width: '580px',
                borderRadius: '5px', padding: '0.9rem', margin: '0.9rem',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.neutrals[700],
                color: appConfig.theme.colors.neutrals[200]
              }}>
              
                <GithubField>{data.name || "name"}</GithubField>
                <GithubField>{data.location || "location"}</GithubField>
                <GithubField>{data.repositorys || "repositorys"}</GithubField>
            </Box>
          </Tilt>
        </Box>
      </>
    );
  }


