import axios from 'axios';
import { BaseService } from './BaseService';

export class UsuarioService extends BaseService {
    constructor() {
        super('/usuario');
    }
}

export class UsuarioLoginService extends BaseService {
    constructor() {
        super('/usuario/login');
    }
}
export class UsuarioLogoutService extends BaseService {
    constructor() {
        super('/usuario/logout');
    }
}
export class UsuarioRecuperarSenhaService extends BaseService {
    constructor() {
        super('/usuario/recuperar-senha');
    }
}

export class UsuarioAlterarSenhaService extends BaseService {
    constructor() {
        super('/usuario/alterar-senha');
    }
}
