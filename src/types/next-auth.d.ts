import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      onboarded?: boolean;
      workspaceId?: string | null;
      industry?: string | null;
    };
  }

  interface User {
    id: string;
    role?: string;
    onboarded?: boolean;
    workspaceId?: string | null;
    industry?: string | null;
  }
}
