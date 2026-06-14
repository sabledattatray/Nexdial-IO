import { BlogPost } from "./types";
import { whatsappCrmAlternative } from "./blog-1-whatsapp";
import { salesFollowUpStrategy } from "./blog-2-sales";
import { leadTrackingIndia } from "./blog-3-india";
import { modernAgenciesCrm } from "./blog-4-agencies";
import { aiContactCenters } from "./blog-5-ai";

export const ARTICLES: Record<string, BlogPost> = {
  "whatsapp-crm-alternative": whatsappCrmAlternative,
  "sales-follow-up-strategy": salesFollowUpStrategy,
  "lead-tracking-software-india": leadTrackingIndia,
  "modern-agencies-crm": modernAgenciesCrm,
  "ai-in-contact-centers": aiContactCenters,
};
