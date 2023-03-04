import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/profile/todo"] };
export default withAuth({});
