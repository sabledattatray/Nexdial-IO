import { BlogPost } from "./types";
import { whatsappCrmAlternative } from "./blog-1-whatsapp";
import { salesFollowUpStrategy } from "./blog-2-sales";
import { leadTrackingIndia } from "./blog-3-india";
import { agenciesCrm } from "./blog-4-agencies";
import { aiContactCenter } from "./blog-5-ai";
import { b2bSaasConversion } from "./blog-6-saas";
import { deathOfColdCalling } from "./blog-7-inbound";
import { facebookLeadAds } from "./blog-8-facebook";
import { realEstateCrm } from "./blog-9-real-estate";
import { poorPipeline } from "./blog-10-pipeline";
import { salesTrainingPlaybooks } from "./blog-11-training";
import { shortenSalesCycle } from "./blog-12-cycle";
import { omnichannelCrm } from "./blog-13-omnichannel";
import { sevenTouchSequence } from "./blog-14-sequence";
import { badSalesProcess } from "./blog-15-retention";

export const ARTICLES: Record<string, BlogPost> = {
  "whatsapp-crm-alternative": whatsappCrmAlternative,
  "sales-follow-up-strategy": salesFollowUpStrategy,
  "lead-tracking-software-india": leadTrackingIndia,
  "crm-for-agencies": agenciesCrm,
  "ai-contact-center-automation": aiContactCenter,
  "b2b-saas-sales-cadence-conversion": b2bSaasConversion,
  "inbound-lead-management-vs-cold-calling": deathOfColdCalling,
  "native-facebook-lead-ads-integration": facebookLeadAds,
  "real-estate-crm-visual-pipelines": realEstateCrm,
  "hidden-costs-poor-pipeline-management": poorPipeline,
  "sales-training-playbooks-onboarding": salesTrainingPlaybooks,
  "shorten-b2b-sales-cycle-friction": shortenSalesCycle,
  "omnichannel-vs-multichannel-crm": omnichannelCrm,
  "psychology-seven-touch-sales-sequence": sevenTouchSequence,
  "five-signs-broken-sales-process": badSalesProcess,
};
