import { Text } from "@skynexui/components"
import appConfig from "../config.json"

const GithubField = (props) => {
    return(
      <Text as="span" variant="body4" styleSheet={{
        backgroundColor:appConfig.theme.colors.neutrals[900],
        padding: ' 0.5rem 0.8rem',
        display:'flex',
        alignItems:'center',
        gap:'0.8rem',
        borderRadius: '1000px'
      }}>
        {props.children}
      </Text>
    )
}

export default GithubField