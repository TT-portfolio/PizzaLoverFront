export interface ApiItem {
    contentType: string;
    name: string;
    createDate: string;
    updateDate: string;
    route: {
        path: string;
        startItem: {
            id: string;
            path: string;
        };
    };
    id: string;
    properties: Record<string, unknown>;
}

export interface ApiResponse {
    total: number;
    items: ApiItem[];
}

