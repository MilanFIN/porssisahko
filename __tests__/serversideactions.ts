/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
    Result,
    getDayAheadData,
    getHsContent,
    getIlContent,
    getIsContent,
    parseDayAheadData,
    parseHsContent,
    parseIlContent,
    parseIsContent,
    parseYleContent,
} from "../src/app/actions";
import { Article, PriceValue } from "@/common/common";
import cacheData from "memory-cache";
import { readFileSync } from "fs";
import path from "path";

describe("Yle", () => {
    test("Test Yle news parser", async () => {
        const file = path.join(__dirname, "./", "test_data/ylesample.txt");
        const data = readFileSync(file, "utf8");

        let yleContent = parseYleContent(data);
        expect(Array.isArray(yleContent)).toBe(true);
        expect(yleContent.length).toBeGreaterThan(0);

        yleContent.forEach((item: Result) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
            expect(item).toHaveProperty("imagealt");
        });
    });
});

describe("Hs", () => {
    test("Test HS news parser", async () => {
        const file = path.join(__dirname, "./", "test_data/hssample.txt");
        const data = readFileSync(file, "utf8");

        let hsContent = parseHsContent(data);
        expect(Array.isArray(hsContent)).toBe(true);
        expect(hsContent.length).toBeGreaterThan(0);

        hsContent.forEach((item: Result) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
        });
    });
});

describe("Is", () => {
    test("Test IS news parser", async () => {
        const file = path.join(__dirname, "./", "test_data/issample.txt");
        const data = readFileSync(file, "utf8");

        let isContent = parseIsContent(data);
        expect(Array.isArray(isContent)).toBe(true);
        expect(isContent.length).toBeGreaterThan(0);

        isContent.forEach((item: Result) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
            expect(item).toHaveProperty("date");
        });
    });
});

describe("Il", () => {
    test("Test IL news parser", async () => {
        const file = path.join(__dirname, "./", "test_data/ilsample.json");
        const data = JSON.parse(readFileSync(file, "utf8"));

        let ilContent = parseIlContent(data.response);
        expect(Array.isArray(ilContent)).toBe(true);
        expect(ilContent.length).toBeGreaterThan(0);

        ilContent.forEach((item: Result) => {
            expect(item).toHaveProperty("header");
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("image");
            expect(item).toHaveProperty("date");
        });
    });
});

describe("entso-e", () => {
    test("Test electricity day ahead parser", async () => {
        const file = path.join(__dirname, "./", "test_data/entsoesample.xml");
        const data = readFileSync(file, "utf8");

        let priceData = parseDayAheadData(data);

        expect(Array.isArray(priceData.data)).toBe(true);
        expect(priceData.data.length).toBeGreaterThan(0);
        expect(typeof priceData.date).toBe("string");
        expect(priceData).not.toHaveProperty("error");

        priceData.data.forEach((item: PriceValue) => {
            expect(item).toHaveProperty("Timestamp");
            expect(item).toHaveProperty("Value");
        });
    });
});
