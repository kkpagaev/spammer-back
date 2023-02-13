import { InvalidBodyException } from "./exceptions/invalid-body.exception"
import { Response } from "express"
import NotFoundException from "./exceptions/not-found.exception"

export async function exceptionFilter(
  callback: () => Promise<any>,
  res: Response
) {
  try {
    return await callback()
  } catch (err) {
    switch (err.constructor) {
      case InvalidBodyException:
        res.status(400).send(err)
        return
      case NotFoundException:
        res.status(404).send(err)
        return
    }

    res.status(500).send({ error: err.message })
  }
}
