import Document, {Head, Html, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Acme&family=Nunito+Sans:wght@200;400;700;800&display=swap" rel="stylesheet"/>
                    <link rel="shortcut icon" href="/assets/tabIcon.png" type="image/x-icon" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}