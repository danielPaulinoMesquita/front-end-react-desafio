import ApiService from "../apiService";
import ErroValidacao from "./exception/erroValidacao";

export default class  ClienteService extends ApiService{

    constructor() {
        super('/clientes');
    }

    obterListaTipos(){
        return [
            {label: 'Selecione ...', value:''},
            {label: 'Comercial', value:'COMERCIAL'},
            {label: 'Residencial', value:'RESINDECIAL'},
            {label: 'Celular', value:'CELULAR'},
        ]
    }

    obterListaUfs(){
        return [
            {label: 'Selecione ...', value:''},
            {label: 'AC', value:'Acre'},
            {label: 'AL', value:'Alagoas'},
            {label: 'AP', value:'Amapá'},
            {label: 'AM', value:'Amazonas'},
            {label: 'BA', value:'Bahia'},
            {label: 'CE', value:'Ceará'},
            {label: 'DF', value:'Distrito Federal'},
            {label: 'ES', value:'Espirito Santo'},
            {label: 'GO', value:'Goiás'},
            {label: 'MA', value:'Maranhão'},
            {label: 'MT', value:'Mato Grosso'},
            {label: 'MS', value:'Mato Grosso do Sul'},
            {label: 'MG', value:'Minas Gerais'},
            {label: 'PA', value:'Pará'},
            {label: 'PB', value:'Paraíba'},
            {label: 'PR', value:'Paraná'},
            {label: 'PE', value:'Pernambuco'},
            {label: 'PI', value:'Piauí'},
            {label: 'RJ', value:'Rio de Janeiro'},
            {label: 'RN', value:'Rio Grande do Norte'},
            {label: 'RS', value:'Rio Grande do Sul'},
            {label: 'RO', value:'Rondônia'},
            {label: 'RR', value:'Roraima'},
            {label: 'SC', value:'Santa Catarina'},
            {label: 'SP', value:'São Paulo'},
            {label: 'SE', value:'Sergipe'},
            {label: 'TO', value:'Tocantins'},
        ]
    }

    obterClientesPorId(id){
        console.log("dentro do metodo id",id)
        return this.getId(id)
    }

    obterClientes(){
        return this.get()
    }

    validar(cliente){
        const erros = [];

        if(!cliente.nome){
            console.log(cliente.nome)
            erros.push("Informe o Nome");
        }

        if(!cliente.cpf){
            erros.push("Informe o Cpf")
        }

        if(!cliente.cep){
            erros.push("Informe o Cep")
        }

        if(!cliente.logradouro){
            erros.push("Informe o Logradouro")
        }

        if(!cliente.bairro){
            erros.push("Informe o Bairro")
        }

        if(!cliente.cidade){
            erros.push("Informe o Cidade")
        }

        if(!cliente.uf){
            erros.push("Informe o Uf")
        }

        if(!cliente.telefone){
            erros.push("Informe o Telefone")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(clientes){
        return this.post('/', clientes);
    }

    atualizar(clientes){
        return this.put(`/${clientes.id}`, clientes);
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }
}
