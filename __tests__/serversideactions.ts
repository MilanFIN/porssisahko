/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
    getDayAheadData,
    getHsContent,
    getIlContent,
    getIsContent,
    getYleContent,
} from "../src/app/actions";
import { Article, PriceValue } from "@/common/common";
import cacheData from "memory-cache";

describe("Yle", () => {
    test("Test Yle news parser", async () => {
        let yleContent = await getYleContent(true);
        expect(Array.isArray(yleContent)).toBe(true);
        expect(yleContent.length).toBeGreaterThan(0);

        yleContent.forEach((item: Article) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
            expect(item).toHaveProperty("imagealt");
            expect(item).toHaveProperty("date");
        });
    });
});

describe("Hs", () => {
    test("Test HS news parser", async () => {
        let hsContent = await getHsContent(true);
        expect(Array.isArray(hsContent)).toBe(true);
        expect(hsContent.length).toBeGreaterThan(0);

        hsContent.forEach((item: Article) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
        });
    });
});

describe("Is", () => {
    test("Test IS news parser", async () => {
        let isContent = await getIsContent(true);
        expect(Array.isArray(isContent)).toBe(true);
        expect(isContent.length).toBeGreaterThan(0);

        isContent.forEach((item: Article) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
            expect(item).toHaveProperty("date");
        });
    });
});

describe("Il", () => {
    test("Test IL news parser", async () => {
        let ilContent = await getIlContent(true);
        expect(Array.isArray(ilContent)).toBe(true);
        expect(ilContent.length).toBeGreaterThan(0);

        ilContent.forEach((item: Article) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
            expect(item).toHaveProperty("date");
        });
    });
});

describe("entso-e", () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
        cacheData.clear();
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });
    test("Test electricity day ahead parser", async () => {
        let priceData = await getDayAheadData(true, 0);

        expect(Array.isArray(priceData.data)).toBe(true);
        expect(priceData.data.length).toBeGreaterThan(0);
        expect(typeof priceData.date).toBe("string");
        expect(priceData).not.toHaveProperty("error");

        priceData.data.forEach((item: PriceValue) => {
            expect(item).toHaveProperty("Timestamp");
            expect(item).toHaveProperty("Value");
        });
    });
    test("Test day ahead parser error handling", async () => {
        process.env.ENTSOE_SECURITY_TOKEN = "invalid_value_here";
        let priceData = await getDayAheadData(true, 0);
        expect(priceData).toHaveProperty("error");
    });
});
