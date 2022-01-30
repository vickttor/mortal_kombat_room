export default function lowerCaseUsername(username){
    if(username !== undefined  &&  username.length !== 0){
        return username.toLowerCase()
    }

    return "[ERROR]"
}

