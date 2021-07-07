import React from "react";
import "placeholder-loading/dist/css/placeholder-loading.min.css";

export default function Placeholder () { //NO SIRVE TOCA MIRAR PORQUE
 
    return (
        <div classname="columns is-centered">
            <div classname="column is-10">
                <div classname="ph-item">
                    <div classname="ph-col-12">
                        <div classname="ph-picture"></div>
                        <div classname="ph-row"></div>
                        <div classname="ph-col-12"></div>
                    </div>
                    <div classname="ph-col-12">
                        <div classname="ph-picture"></div>
                        <div classname="ph-row"></div>
                        <div classname="ph-col-12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}