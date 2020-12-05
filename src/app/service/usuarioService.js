import ApiService from "../apiService";

class UsuarioService extends ApiService{

    constructor() {
        super('/login');
    }

    autenticar(credenciais){
        return this.postLogin(credenciais)
    }

}

export default UsuarioService;
