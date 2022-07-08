import {$instance} from "./dataApi";

class AccountService {
    resetPassword(accountData) {
        return $instance.post('api/account/reset-password', accountData)
    }

    checkRecoverCode(checkData) {
        return $instance.post('api/account/check/key', checkData)
    }

    recoverPassword(newPasswordData) {
        return $instance.post('api/account/reset-password/finish', newPasswordData)
    }


}


export default new AccountService()
