import {$instance} from "./dataApi";

class UserService {
    uploadUserLogo(file) {
        return $instance.post('/api/users/upload', file)
    }

    registerNewPartner(partnerData) {
        return $instance.post('/api/register', partnerData)
    }

    uploadPartnerLogo(file) {
        return $instance.post('/api/users/upload', file)
    }
}

export default new UserService()
