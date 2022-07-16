import {$instance} from "./dataApi";

class PartnersService {
    loadPartnersList(page) {
        return $instance.get('/api/admin/get-all-users')
    }
}

export default new PartnersService()
