import * as z from "zod";

export const generalSettingSchema = z.object({
    bannedAdPrice: z.number().or(z.string()),
    propertyAdPrice:z.number().or(z.string()),
    propertyAdViewRange:z.number().or(z.string()),
    appName:z.string(),
    appLogo:z.string().or(z.undefined()),
    dashboardUrl:z.string(),

});
