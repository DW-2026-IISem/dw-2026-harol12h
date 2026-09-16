export declare const paymentsOpenApi: {
    '/payments': {
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
    '/payments/{id}': {
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
