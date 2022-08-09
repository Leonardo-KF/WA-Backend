import { Controller } from "@/presentation/controllers/controller";

import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.route({
      params: req.params.id,
      body: req.body,
    });
    res.status(response.statusCode).json(response.body);
  };
};
