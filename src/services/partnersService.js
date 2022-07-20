import {$instance} from "./dataApi";

class PartnersService {
    loadPartnersList(page) {
        return $instance.get('/api/admin/get-all-users')
    }

    requestPasswordRecover(userLogin) {
        return $instance.get('/api/account/reset-password/by/admin', {
            params: {
                login: userLogin
            }
        })
    }

    changePartnerData(modifiedData) {
        return $instance.post('/api/edit-user', modifiedData )
    }

    activatorSwitcherPartner(userData) {
        return $instance.post('/api/change/user/status', userData)
    }
}

export default new PartnersService()
