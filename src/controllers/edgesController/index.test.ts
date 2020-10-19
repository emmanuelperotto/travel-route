import { create } from "."
import { Request, Response } from "express";

const mockWriteRecords = jest.fn();

jest.mock("csv-writer", () => {
  return {
    createObjectCsvWriter: () => ({
      writeRecords: mockWriteRecords
    })
  }
})

describe("create", () => {
  const jsonMock = jest.fn();

  const responseMock = {
    status: jest.fn(() => ({
      json: jsonMock
    }))
  } as unknown as Response

  afterEach(() => jest.clearAllMocks());

  describe("when not sending params", () => {
    const requestMock = {
      body: {},
    } as Request

    it("returns a status 422", () => {
      create(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(422);
    });

    it("returns an error message", () => {
      create(requestMock, responseMock);

      expect(jsonMock).toHaveBeenCalledWith({ error: "Params are required: sourceNode, targetNode, weight" })
    });
  });

  describe("when weight param is invalid", () => {
    const requestMock = {
      body: {
        sourceNode: "A",
        targetNode: "B",
        weight: "invalidParam"
      },
    } as Request

    it("returns a status 422", () => {
      create(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(422);
    });

    it("returns an error message", () => {
      create(requestMock, responseMock);

      expect(jsonMock).toHaveBeenCalledWith({ error: "Params are required: sourceNode, targetNode, weight" })
    });
  });

  describe("when successfully adding an edge", () => {
    const requestMock = {
      body: {
        sourceNode: "A",
        targetNode: "B",
        weight: "20"
      },
    } as Request

    it("returns http status 201", () => {
      create(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenLastCalledWith(201);
    });

    it("returns a request body with the edge's info", () => {
      create(requestMock, responseMock);

      expect(jsonMock).toHaveBeenCalledWith({ sourceNode: "A", targetNode: "B", weight: "20" })
    });
  });
});
