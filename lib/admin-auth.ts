import { env } from "cloudflare:workers";
import type { ChatGPTUser } from "../app/chatgpt-auth";

export function isPortfolioSuperadmin(user: ChatGPTUser | null) {
  return Boolean(user && env.ADMIN_USER_ID && user.userId === env.ADMIN_USER_ID);
}
