




type Config = {
    serverUrl: string
}



export const globalConfig: Config = {
    serverUrl: ""

}

const initConfig = (serverUrl: string = "") => {
    globalConfig.serverUrl = serverUrl

    console.log(`globalConfig:  ${JSON.stringify(globalConfig)}`)

    return globalConfig;
}



export default initConfig