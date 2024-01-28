import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NewsWrapper } from "@/components/newswrapper";
import { InfoBox } from "@/components/infobox";
import { NewsItem } from "@/components/newslist";

describe("Page component sanity checks", () => {
    beforeEach(() => {
        //returning garbage via the mock api, as the real data is way too complex
        //to even mock here 
        global.fetch = jest.fn().mockResolvedValue({
            text: jest.fn().mockResolvedValue("test"),
            json: jest.fn().mockResolvedValue({ test: "content" }),
        });
    });
    it("News sidebar rendering", async () => {
        const news = await NewsWrapper();
        render(news);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(4);
        expect(buttons[0]).toHaveTextContent("Yle");
        expect(buttons[1]).toHaveTextContent("HS");
        expect(buttons[2]).toHaveTextContent("IL");
        expect(buttons[3]).toHaveTextContent("IS");
    });

    it("Price average info box rendering", async () => {
        const props = {
            loading: false,
            tax: 0.24,
            description: "test average",
            price: 0.123,
        };
        render(<InfoBox {...props} />);
        const priceLabel = screen.getByText("0.15 c/kWh"); // 1.24 * 0.123
        expect(priceLabel).toBeInTheDocument();
        const descriptionLabel = screen.getByText("test average");
        expect(descriptionLabel).toBeInTheDocument();
    });

    it("News article rendering", async () => {
        const props = {
            item: {
                header: "Article title",
                href: "test-link-here",
                image: "",
                date: "2020-01-02T13:00:00+02:00",
            },
        };
        render(<NewsItem {...props} />);
        const title = screen.getByText("Article title");
        expect(title).toBeInTheDocument();
        expect(title.closest("a")).toHaveAttribute("href", "test-link-here");
        const date = screen.getByText("2.1");
        expect(date).toBeInTheDocument();
    });
});
