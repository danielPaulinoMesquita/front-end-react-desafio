import ApiService from "../apiService";
import ErroValidacao from "./exception/erroValidacao";

class UsuarioService extends ApiService{
    constructor() {
        super('/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    validar(usuario){
        const erros = [];

        if (!usuario.usuario){
            erros.push('O campo Usuário é obrigatório. ')
        }else if (!usuario.usuario.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um Email válido. ')
        }

        if (!usuario.senha){
            erros.push('O campo Senha é obrigatório. ')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;
