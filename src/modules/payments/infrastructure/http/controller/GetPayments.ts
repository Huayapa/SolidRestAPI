import type { Request, Response } from "express";
import { MakeGetPayments } from "../../factories/MakeGetPayments.ts";

export class GetPaymentsController {
  static async run(req:Request, res:Response) {
    try {
      const useCase = MakeGetPayments()
      const result = await useCase.execute()
      res.status(200).json(result)
    } catch (error:any){
      res.status(400).json({error: error.message})
    }
  }
}