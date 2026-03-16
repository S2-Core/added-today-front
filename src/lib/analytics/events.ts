export const ANALYTICS_EVENTS = {
  PAGE_VIEWED: "page_viewed",

  REGISTER_PAGE_VIEWED: "register_page_viewed",
  REGISTER_STARTED: "register_started",
  REGISTER_FORM_SUBMITTED: "register_form_submitted",
  REGISTER_VALIDATION_FAILED: "register_validation_failed",

  LOGIN_PAGE_VIEWED: "login_page_viewed",
  LOGIN_STARTED: "login_started",
  LOGIN_FORM_SUBMITTED: "login_form_submitted",
  LOGIN_VALIDATION_FAILED: "login_validation_failed",

  PASSWORD_RESET_PAGE_VIEWED: "password_reset_page_viewed",
  PASSWORD_RESET_REQUESTED: "password_reset_requested",
  PASSWORD_RESET_SUBMITTED: "password_reset_submitted",
  PASSWORD_RESET_VALIDATION_FAILED: "password_reset_validation_failed",

  TERMS_MODAL_VIEWED: "terms_modal_viewed",
  TERMS_ACCEPTED_CLICKED: "terms_accepted_clicked",

  PROFILE_UPDATED_UI: "profile_updated_ui",
  PASSWORD_CHANGED_UI: "password_changed_ui",

  PLANS_VIEWED: "plans_viewed",
  UPGRADE_CTA_CLICKED: "upgrade_cta_clicked",
  CHECKOUT_STARTED: "checkout_started",
  BILLING_VIEWED: "billing_viewed",
  PAYWALL_VIEWED: "paywall_viewed",
  FEATURE_BLOCKED_BY_PLAN: "feature_blocked_by_plan",
  FREE_LIMIT_REACHED: "free_limit_reached",
  CANCEL_FLOW_STARTED: "cancel_flow_started",
  CANCEL_FLOW_ABANDONED: "cancel_flow_abandoned",

  CAMPAIGN_PAGE_VIEWED: "campaign_page_viewed",

  QUOTATION_PAGE_VIEWED: "quotation_page_viewed",
  QUOTATION_STARTED: "quotation_started",
  QUOTATION_SUBMITTED: "quotation_submitted",
  QUOTATION_VALIDATION_FAILED: "quotation_validation_failed",

  INSIGHTS_PAGE_VIEWED: "insights_page_viewed",
  INSIGHTS_CONFIG_STARTED: "insights_config_started",
  INSIGHTS_CONFIG_SUBMITTED: "insights_config_submitted",
  INSIGHTS_VALIDATION_FAILED: "insights_validation_failed",

  CHAT_PAGE_VIEWED: "chat_page_viewed",
  CHAT_STARTED: "chat_started",
  SENDING_CHAT_USER_MESSAGE: "sending_chat_user_message",

  LOGOUT_CLICKED: "logout_clicked",
} as const;
