import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CreatePostButton } from "@/components/create-post-button";

describe("Button", () => {
  it("renders a link for saving modal state as query in url", () => {
    render(<CreatePostButton />);

    const link = screen.getByRole("link", { name: "post" });

    expect(link).toBeInTheDocument();
  });
});
