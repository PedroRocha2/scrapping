const listaLead = () =>  {
    
    return fetch(`http://localhost:3000/scrape`)
    .then(resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível listar os leads')
    })
}

export const funcoes = {listaLead}