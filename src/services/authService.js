import {$instance} from "./dataApi";
import eventBus from "../helpers/eventBus";

class AuthService {

    login(body) {
        return $instance.post('/api/authenticate', body)
    }

    logOut() {
        eventBus.dispatch('logout', {});
    }

}


export default new AuthService()
