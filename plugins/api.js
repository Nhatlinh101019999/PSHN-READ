import Auth from '@/api/auth';
import Nutritions from '@/api/nutritions';
import Uploads from '@/api/uploads';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        nutritions: Nutritions(context.$axios),
        uploads: Uploads(context.$axios),

    };

    // Inject $api
    inject('api', factories);
};
