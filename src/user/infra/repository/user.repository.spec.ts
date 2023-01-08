import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { UserRepository } from 'src/user/infra/repository/user.repository'
import { DatabaseService } from '@common/database/database.service'
describe('UserRepository', () => {
  let userRepository: UserRepository
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger, UserRepository, DatabaseService],
    }).compile()
    userRepository = module.get(UserRepository)
    databaseService = module.get(DatabaseService)
  })

  afterAll(async () => {
    databaseService.$disconnect()
  })

  afterEach(async () => {
    await databaseService.users.deleteMany()
  })

  it('should be defined', () => {
    expect(userRepository).toBeDefined()
  })

  describe('create', () => {
    describe('positive', () => {
      it('', async () => {
        await expect(
          userRepository.create({
            email: 'mock@mock.mock',
            id: 0,
            password: 'asdf',
            nickname: '32adf',
          }),
        ).resolves.not.toThrow()
      })
    })
  })

  describe('find', () => {
    beforeEach(async () => {
      await databaseService.users.create({
        data: {
          email: 'mock@mock.mock',
          id: 0,
          password: 'asdf',
          nickname: '32adf',
        },
      })
    })

    describe('positive', () => {
      it('', async () => {
        const received = await userRepository.find(0)

        expect(received).toEqual({
          email: 'mock@mock.mock',
          id: 0,
          password: 'asdf',
          nickname: '32adf',
        })
      })
    })
  })
})
