import {$instance} from "./dataApi";

class AnalysisService {
    loadAnalysisList() {
        return $instance.get('/api/user-get-all-history')
    }
}

export default new AnalysisService();