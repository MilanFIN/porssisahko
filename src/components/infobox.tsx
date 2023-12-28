"use client";

import { zeroPad } from "@/common/utils";
import React, { useEffect, useState } from "react";

interface InfoBoxProps {
    price: number;
    description: String;
}

export function InfoBox(props: InfoBoxProps) {

	const formatPrice = (price:number) => {
		return price.toFixed(2) + " c/kWh";
	}

    return (
		<div className="w-32 h-20 m-2 p-2 bg-white grid justify-items-center rounded-lg">
			<div className="w-full text-center">
				{props.description}
			</div>
			<div className="w-full text-center font-bold">
				<span>{formatPrice(props.price)} </span>
			</div>

		</div>
	);
}