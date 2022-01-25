// Dependencies
import { Box, Button, Text, TextField, Image} from "@skynexui/components"; 
import appConfig from "../config.json";
//Defining global Styles to use in the components
//TO use it, just add it as a tag on the top of the argument
function GlobalStyle(){
    return(
        <style global jsx>{`
        
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                list-style:none;
            }

            body{
                font-family: 'Open Sans', sans-serif;    
            }
            /* App fit height */
            html, body, #_next {
                min-height: 100vh;
                display:flex;
                flex:1;
            }
            #_next{
                flex:1;
            }
            #_next > * {
                flex: 1;
            }
            /* ./App fit Height */
        `}</style>
    );
}


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


// // Default component
// function HomePage(){

//     return (
//         // Returning a div with the components above
//         <div>
//             <GlobalStyle/>
//             <Title tag="h1">Hello World!</Title>
//             <p>This is a paragraph</p>

//         </div>
//     )
// }

// Exporting default function
export default function HomePage() {
    const username = 'VictorSilva15';
  
    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            //other backgrounds =>
            //backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/2020-mortal-kombat-11-4k-ag.jpg)',
            //backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/mortal-kombat-11-art-4k-2c.jpg)',
            backgroundImage: 'url(https://cdn.wallpapersafari.com/93/6/xDCnmq.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            width: '100vw', height: '100vh'
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '580px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
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
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
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
                src={`https://github.com/${username}.png`}
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
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }


