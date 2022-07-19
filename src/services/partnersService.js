import {$instance} from "./dataApi";

class PartnersService {
    loadPartnersList(page) {
        return $instance.get('/api/admin/get-all-users')
    }

    requestPasswordRecover(userLogin) {
        return $instance.post('/api/account/reset-password/by/admin', {
            login: userLogin
        })
    }

    changePartnerData(modifiedData) {
        return $instance.post('/api/edit-user', modifiedData )
    }
}

export default new PartnersService()
