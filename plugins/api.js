import Auth from '@/api/auth';
import Nutritions from '@/api/nutritions';
import Uploads from '@/api/uploads';
import QuestionCategories from '@/api/questionCategories';
import Questions from '@/api/questions';
import Patient from '@/api/patient';
import Selections from '@/api/selections';
import Addresses from '@/api/addresses';
import Checklist from '../api/checklist';
import hotline from '../api/hotline';
import newsCategories from '../api/newsCategories';
import news from '../api/news';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        nutritions: Nutritions(context.$axios),
        uploads: Uploads(context.$axios),
        questionCategories: QuestionCategories(context.$axios),
        questions: Questions(context.$axios),
        patient: Patient(context.$axios),
        selections: Selections(context.$axios),
        addresses: Addresses(context.$axios),
        checklist: Checklist(context.$axios),
        hotline: hotline(context.$axios),
        newsCategories: newsCategories(context.$axios),
        news: news(context.$axios),
    };

    // Inject $api
    inject('api', factories);
};
