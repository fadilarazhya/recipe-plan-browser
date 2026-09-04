import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { StateView } from "@/components/StateView";

describe("StateView", () => {
  it("shows the empty message when there is no data", async () => {
    await render(
      <StateView status="ready" isEmpty emptyMessage="No recipes found.">
        <Text>Should not render</Text>
      </StateView>,
    );

    expect(screen.getByText("No recipes found.")).toBeTruthy();
    expect(screen.queryByText("Should not render")).toBeNull();
  });

  it("renders children when status is ready and not empty", async () => {
    await render(
      <StateView status="ready" isEmpty={false}>
        <Text>Recipe list</Text>
      </StateView>,
    );

    expect(screen.getByText("Recipe list")).toBeTruthy();
  });
});
