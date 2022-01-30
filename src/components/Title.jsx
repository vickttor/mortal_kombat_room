// Title function (component), that receive a `props` as an argument.
// This props is an object that allow us to access the children
// and params values. The params is all parameters that we pass into
// the tag. The children is the internal value passed into it
import appConfig from "../../config.json";

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


export default Title