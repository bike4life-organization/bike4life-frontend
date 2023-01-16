// Generated by https://quicktype.io

export interface DirectionsResponse {
    routes:    Route[];
    waypoints: Waypoint[];
    code:      string;
    uuid:      string;
}

export interface Route {
    geometry:    Geometry;
    legs:        Leg[];
    weight_name: string;
    weight:      number;
    duration:    number;
    distance:    number;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type:        string;
}

export interface Leg {
    steps:    any[];
    summary:  string;
    weight:   number;
    duration: number;
    distance: number;
}

export interface Waypoint {
    distance: number;
    name:     string;
    location: number[];
}
