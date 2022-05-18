import { prisma } from "./db"

export default function createContext(req: any, res: any) {
  return {
    db: prisma, // prisma object
    req,
    res,
  }
}
