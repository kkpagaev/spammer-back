import { getTestDataSource } from "../test.utils"
import { Target } from "./entities/target.entity"
import { TargetService } from "./target.service"

describe("Target Service", () => {
  let targetService: TargetService
  beforeEach(async () => {
    const dataSource = await getTestDataSource()
    const targetRepository = dataSource.getRepository(Target)
    targetService = new TargetService(targetRepository)
  })

  it("should be defined", () => {
    expect(targetService).toBeDefined()
  })
})
