export declare const returnDetailsOpenApi: {
    '/return-details': {
        post: {
            summary: string;
            responses: {
                201: {
                    description: string;
                };
            };
        };
        get: {
            summary: string;
            responses: {
                200: {
                    description: string;
                };
            };
        };
    };
    '/return-details/{id}': {
        get: {
            summary: string;
            responses: {
                200: {
                    description: string;
                };
            };
        };
        patch: {
            summary: string;
            responses: {
                200: {
                    description: string;
                };
            };
        };
        delete: {
            summary: string;
            responses: {
                204: {
                    description: string;
                };
            };
        };
    };
};
