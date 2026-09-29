export function ValidarEmail(email){
    try
    {    const url = new URL(`mailto:${email}`)
        const [usuario,dominio] = email.split("@")
        return Boolean(usuario && dominio && dominio.includes('.'))
    }catch(error){
        return error
    }
}