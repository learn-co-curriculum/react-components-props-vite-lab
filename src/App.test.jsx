import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./components/App";
import Header from "./components/Header";
import About from "./components/About";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import blogData from "./data/blog";

// App renders the whole blog using the real data file
describe("App", () => {
  test("shows the blog name, about text and every post title", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: blogData.name })
    ).toBeInTheDocument();
    expect(screen.getByText(blogData.about)).toBeInTheDocument();

    blogData.posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});

describe("Header", () => {
  test("shows the name prop in an h1", () => {
    render(<Header name="My Test Blog" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "My Test Blog" })
    ).toBeInTheDocument();
  });

  // rerender passes new props to the same component
  test("updates when the name prop changes", () => {
    const { rerender } = render(<Header name="Old Name" />);
    rerender(<Header name="New Name" />);

    expect(screen.getByText("New Name")).toBeInTheDocument();
    expect(screen.queryByText("Old Name")).not.toBeInTheDocument();
  });
});

describe("About", () => {
  test("shows the image with alt text and the about text", () => {
    render(<About image="logo.png" about="All about my blog" />);

    const img = screen.getByAltText("blog logo");
    expect(img).toHaveAttribute("src", "logo.png");
    expect(screen.getByText("All about my blog")).toBeInTheDocument();
  });

  test("uses the placeholder image when no image is passed", () => {
    render(<About about="No image here" />);

    expect(screen.getByAltText("blog logo")).toHaveAttribute(
      "src",
      "https://via.placeholder.com/215"
    );
  });
});

describe("Article", () => {
  test("shows the title, date and preview props", () => {
    render(
      <Article title="First Post" date="May 1, 2026" preview="A short preview" />
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "First Post" })
    ).toBeInTheDocument();
    expect(screen.getByText("May 1, 2026")).toBeInTheDocument();
    expect(screen.getByText("A short preview")).toBeInTheDocument();
  });

  test("uses the default date when no date is passed", () => {
    render(<Article title="No Date" preview="Preview" />);

    expect(screen.getByText("January 1, 1970")).toBeInTheDocument();
  });
});

describe("ArticleList", () => {
  test("renders one article for each post", () => {
    const posts = [
      { id: 1, title: "Post One", date: "Jan 1", preview: "One" },
      { id: 2, title: "Post Two", date: "Jan 2", preview: "Two" },
    ];
    const { container } = render(<ArticleList posts={posts} />);

    expect(container.querySelectorAll("article")).toHaveLength(2);
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });
});