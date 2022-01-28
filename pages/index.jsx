// Dependencies skynexui/components
import { Box, Button, Text, TextField, Image, Icon} from "@skynexui/components"; 

// React Hooks 
import React from 'react'
import { useRouter } from "next/router";

// Tilt effect lib
import Tilt from "react-tilt";

// Debounce
import _ from "lodash";

// Files
import appConfig from "../config.json";
import RequestGithubAPI from "../src/api/github";
// Components
import Title from "../components/Title";
import GithubField from "../components/GithubField";


// Exporting default function
export default function HomePage() {

    // Using state and router hooks from react
    const [username, setUsername] = React.useState("");
    const router = useRouter();


    // Requiring data user from api github
    const [data, setData] = React.useState({});
    // Using Debounce
    // We're using useMemo to persist data in re-render
    // this is essentialy to avoid lose data between the re-render of the debounce
    const onChange = (value) => {
      // Getting event.target.value as value from parameter
      RequestGithubAPI(value).then((data)=>{
        // Setting the data
        setData({...data})
      })
    }
    // `debounce` will execute `onChange` after 0.5 seconds of insertion 
    //while user is typing input, function is not executed
    const debounceResults = _.debounce(onChange,500); 
    const debounceOnChange = React.useCallback(debounceResults,[]);


    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding:"1.5rem",
            backgroundImage: `url(${appConfig.theme.backgroundImage})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            width: '100vw', height: '100vh',
          }}
        >
          {/* Tilt Effect component */}
          <Tilt className="Tilt" options={{max:8, speed:200, scale:1}} style={{width:"100%", maxWidth:"700px"}}>
            
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
              width: '100%',
              borderRadius: '5px', padding: '32px', margin: '1rem 0 1rem 0',
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
                  setUsername(event.target.value)
                  debounceOnChange(event.target.value)
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
                color: appConfig.theme.colors.neutrals[200],
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
                {data.name || "User"}
              </Text>
            </Box>
            {/* Photo Area */}
            </Box>

          </Tilt>

          {/* Github Informations API */}
          <Tilt className="Tilt" options={{max:5, speed:100, scale:1}} style={{width:"100%",maxWidth:"580px"}}>
            <Box className="Tilt-inner" styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                gap:"0.8rem",
                width: '100%', 
                borderRadius: '5px', padding: '0.9rem', margin: '0.9rem 0 0.9rem 0',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.neutrals[700],
                color: appConfig.theme.colors.neutrals[200]
              }}>
              
                <GithubField><Icon name="FaGithub" size="2.0ch"/>{username || "username"}</GithubField>
                <GithubField><Icon name="FaMapMarkedAlt" size="2.0ch"/>{data.location || "location"}</GithubField>
                <GithubField><Icon name="FaProjectDiagram" size="2.0ch"/>{data.repositories || "repositories"}</GithubField>
            </Box>
          </Tilt>
        </Box>
      </>
    );
  }


