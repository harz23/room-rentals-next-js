import { it, expect } from "@jest/globals";
import paginate from "./paginate";


it("returns a part of a collection", () => {
  expect(
    paginate({
      nodes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      size: 2,
      number: 1
    })
  ).toEqual({
    nodes: [{ id: 1 }, { id: 2 }],
    page: {
      number: 1,
      size: 2,
      totalElements: 5,
      totalPages: 3
    }
  });
});
