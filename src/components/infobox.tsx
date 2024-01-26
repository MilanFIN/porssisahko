"use client";

import { zeroPad } from "@/common/common";
import React, { useEffect, useState } from "react";

interface InfoBoxProps {
    tax: number;
    price: number;
    description: String;
    loading: boolean;
}

export function InfoBox(props: InfoBoxProps) {
    const formatPrice = (price: number) => {
        if (props.loading) {
            return "-";
        }
        price += price * props.tax;
        return price.toFixed(2) + " c/kWh";
    };

    return (
        <div className="w-32 h-20 m-2 p-2 bg-gray-300 dark:bg-gray-400 grid justify-items-center rounded-lg">
            <div className="w-full text-center">{props.description}</div>
            <div className="w-full text-center font-bold">
                <span>{formatPrice(props.price)} </span>
            </div>
        </div>
    );
}
