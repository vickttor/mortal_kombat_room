import GlobalStyle from "../components/GlobalStyle";
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