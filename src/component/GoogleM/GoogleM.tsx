import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

export const GoogleM = () => {
    // const libraries = useMemo(() => ["places"], []);
    const mapCenter = useMemo(
        () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
        []
    );
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,

    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <GoogleMap
            center={mapCenter}
            zoom={20}
            mapContainerStyle={{width:'600px' , height:'600px'}}
            ></GoogleMap>
        </div>
    );
};
