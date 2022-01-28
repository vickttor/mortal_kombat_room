//Defining global Styles to use in the components
//To use it, just add it as a tag on the top of the argument
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


// These function is a next pattern to create a fucntion that will
// encapsulate all the other files into _app.js. So.. everything we put here
// will be runned in all routes/pages of our application.
// In this case we set the GlobalStyles (that's a component) to render here
// Then, chat.js and index.js get the GlobalStyles component!
export default function MyApp({Component, PageProps}){
    
    return(
        <>
            <GlobalStyle/>
            <Component {...PageProps}/>
        </>
        
    )
}