export default function RequestGithubAPI(username){
    return fetch(`https://api.github.com/users/${username || 'skynexui'}`)
    .then((response)=>response.json())
    .then((data)=>{
        return {
            name:data.name,
            location:data.location,
            repositories:data.public_repos,
        }
    })
}