import { Request, Response } from "express";
import { show } from ".";

describe("show", () => {
  const jsonMock = jest.fn();

  const responseMock = {
    status: jest.fn(() => ({
      json: jsonMock
    }))
  } as unknown as Response

  afterEach(() => jest.clearAllMocks());

  describe("when not sending params", () => {
    const requestMock = {
      query: {},
    } as Request

    it("returns http status 400", async () => {
      await show(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(400);
    });

    it("returns an error message", async () => {
      await show(requestMock, responseMock);

      expect(jsonMock).toHaveBeenCalledWith({ error: "Invalid Params. Please provide valid sourceNode and targetNode." })
    });
  });

  describe("when successfully finding a path", () => {
    const requestMock = {
      query: {
        sourceNode: "BRC",
        targetNode: "CDG"
      },
    } as unknown as Request

    it("returns http status 200", async () => {
      await show(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(200);
    });

    it("returns the path", async () => {
      await show(requestMock, responseMock);

      expect(jsonMock).toHaveBeenCalledWith({
        path: ["BRC", "SCL", "ORL", "CDG"],
        cost: 30
      });
    });
  });

  describe("when there is no possible route", () => {
    const requestMock = {
      query: {
        sourceNode: "INVALID_ONE",
        targetNode: "CDG"
      },
    } as unknown as Request

    it("returns http status 422", async () => {
      await show(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(422);
    });

    it("returns an error message", async () => {
      await show(requestMock, responseMock);

      expect(jsonMock).toHaveBeenCalledWith({
        error: "Unable to find a route between INVALID_ONE and CDG"
      });
    });
  })
});
